import { NextRequest, NextResponse } from 'next/server'
import { getDbPool, initDatabase } from '@/lib/db'
import { getAccurateLocation, getDeviceInfo, getUAETime } from '@/lib/visitor-tracking'
import { sendVisitorNotification } from '@/lib/slack'

// Force dynamic rendering
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

/**
 * Track or update visitor information
 * POST /api/visitors
 */
export async function POST(request: NextRequest) {
  console.log('📊 Visitor API called')
  try {
    const { sessionId, pageUrl, userAgent, referer } = await request.json()
    console.log('📊 Visitor data received:', { sessionId, pageUrl, hasUserAgent: !!userAgent })

    if (!sessionId) {
      console.error('❌ Session ID missing in visitor API call')
      return NextResponse.json({ error: 'Session ID required' }, { status: 400 })
    }

    // Get IP address
    const forwarded = request.headers.get('x-forwarded-for')
    const realIp = request.headers.get('x-real-ip')
    const ipAddress = forwarded?.split(',')[0] || realIp || request.ip || 'unknown'
    console.log('📊 IP Address:', ipAddress)

    // Get location data
    console.log('📊 Fetching location data...')
    const location = await getAccurateLocation(ipAddress)
    console.log('📊 Location data:', location ? `${location.city}, ${location.country}` : 'Not found')

    // Get device info
    const device = getDeviceInfo(userAgent || '')
    console.log('📊 Device info:', device)

    // Get UAE time
    const uaeTime = getUAETime()
    console.log('📊 UAE Time:', uaeTime)

    const db = getDbPool()
    if (!db) {
      console.error('❌ Database pool is null - DATABASE_URL may not be loaded')
      throw new Error('Database pool not initialized - DATABASE_URL may be missing')
    }

    // Check if visitors table exists, if not, initialize
    try {
      const tableCheck = await db.query(`
        SELECT EXISTS (
          SELECT FROM pg_tables
          WHERE schemaname = 'public' AND tablename = 'visitors'
        );
      `)
      if (!tableCheck.rows[0].exists) {
        console.warn('⚠️ Visitors table does not exist. Attempting to initialize database...')
        await initDatabase()
        console.log('✅ Database tables initialized during visitor tracking attempt.')
      }
    } catch (initError) {
      console.error('❌ Error checking/initializing database:', initError)
      // Continue anyway - might work if table exists
    }

    // Get IP label if exists
    let ipLabel: string | null = null
    try {
      const labelResult = await db.query(
        'SELECT label FROM ip_labels WHERE ip_address = $1',
        [ipAddress]
      )
      if (labelResult.rows.length > 0) {
        ipLabel = labelResult.rows[0].label
        console.log('📊 IP Label found:', ipLabel)
      }
    } catch (error) {
      // Silent fail - labels are optional
    }

    // Check if visitor exists by session ID
    const existingVisitor = await db.query(
      'SELECT * FROM visitors WHERE session_id = $1',
      [sessionId]
    )

    // Also check if this IP address has been seen before (to catch new visitors with persistent sessions)
    const existingVisitorByIP = await db.query(
      'SELECT * FROM visitors WHERE ip_address = $1 ORDER BY first_visit DESC LIMIT 1',
      [ipAddress]
    )

    // Determine if this is truly a new visitor
    // New if: no session exists OR IP hasn't been seen before OR last visit was more than 24 hours ago
    const isTrulyNewVisitor = existingVisitor.rows.length === 0 || 
      existingVisitorByIP.rows.length === 0 ||
      (existingVisitorByIP.rows.length > 0 && (() => {
        const lastVisit = new Date(existingVisitorByIP.rows[0].last_visit)
        const hoursSinceLastVisit = (Date.now() - lastVisit.getTime()) / (1000 * 60 * 60)
        return hoursSinceLastVisit > 24 // Treat as new if more than 24 hours since last visit
      })())

    if (existingVisitor.rows.length > 0 && !isTrulyNewVisitor) {
      // Update existing visitor (same session, recent visit)
      const visitor = existingVisitor.rows[0]
      const pagesVisited = visitor.pages_visited || []
      
      // Add new page if not already in list
      if (pageUrl && !pagesVisited.includes(pageUrl)) {
        pagesVisited.push(pageUrl)
      }

      const newVisitCount = visitor.visit_count + 1
      
      await db.query(`
        UPDATE visitors SET
          ip_address = $1,
          country = $2,
          country_code = $3,
          city = $4,
          region = $5,
          latitude = $6,
          longitude = $7,
          timezone = $8,
          device_type = $9,
          browser = $10,
          os = $11,
          screen_resolution = $12,
          pages_visited = $13,
          visit_count = visit_count + 1,
          last_visit = NOW(),
          uae_time = $14,
          user_agent = $15,
          referer = $16,
          updated_at = NOW()
        WHERE session_id = $17
      `, [
        ipAddress,
        location?.country || null,
        location?.countryCode || null,
        location?.city || null,
        location?.region || null,
        location?.latitude || null,
        location?.longitude || null,
        location?.timezone || null,
        device.type,
        device.browser,
        device.os,
        device.screenResolution,
        pagesVisited,
        uaeTime,
        userAgent || null,
        referer || null,
        sessionId,
      ])

      // Don't send notification for returning visitors in same session
      return NextResponse.json({
        success: true,
        visitor: {
          ...visitor,
          pagesVisited,
          visitCount: newVisitCount,
        },
      })
    } else {
      // Create new visitor
      const result = await db.query(`
        INSERT INTO visitors (
          session_id, ip_address,
          country, country_code, city, region, latitude, longitude, timezone,
          device_type, browser, os, screen_resolution,
          pages_visited, visit_count, uae_time,
          user_agent, referer, entry_point,
          first_visit, last_visit
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, NOW(), NOW())
        RETURNING *
      `, [
        sessionId,
        ipAddress,
        location?.country || null,
        location?.countryCode || null,
        location?.city || null,
        location?.region || null,
        location?.latitude || null,
        location?.longitude || null,
        location?.timezone || null,
        device.type,
        device.browser,
        device.os,
        device.screenResolution,
        pageUrl ? [pageUrl] : [],
        1,
        uaeTime,
        userAgent || null,
        referer || null,
        'direct',
      ])

      // Send Slack notification for new visitors
      console.log('📱 ========================================')
      console.log('📱 ATTEMPTING TO SEND SLACK NOTIFICATION FOR NEW VISITOR')
      console.log('📱 ========================================')
      console.log('📱 IP Address:', ipAddress)
      console.log('📱 IP Label:', ipLabel || 'None')
      console.log('📱 Location:', location ? `${location.city}, ${location.country}` : 'Unknown')
      console.log('📱 Device:', `${device.type} - ${device.browser} - ${device.os}`)
      console.log('📱 SLACK_WEBHOOK_URL exists:', !!process.env.SLACK_WEBHOOK_URL)
      console.log('📱 SLACK_WEBHOOK_URL preview:', process.env.SLACK_WEBHOOK_URL ? process.env.SLACK_WEBHOOK_URL.substring(0, 30) + '...' : 'NOT SET')
      
      try {
        const notificationResult = await sendVisitorNotification({
          ipAddress,
          ipLabel: ipLabel || undefined, // Include label if available
          location: {
            country: location?.country,
            city: location?.city,
            region: location?.region,
            latitude: location?.latitude,
            longitude: location?.longitude,
          },
          device: {
            type: device.type,
            browser: device.browser,
            os: device.os,
          },
          userAgent,
          referer,
          timestamp: new Date().toISOString(),
          uaeTime,
          pagesVisited: pageUrl ? 1 : 0,
          visitCount: 1,
          isNewVisitor: true,
        })
        console.log('📱 ========================================')
        console.log('📱 SLACK NOTIFICATION RESULT:', notificationResult ? '✅ SENT SUCCESSFULLY' : '❌ FAILED')
        console.log('📱 ========================================')
        if (!notificationResult) {
          console.error('❌ Slack notification returned false')
          console.error('❌ Check SLACK_WEBHOOK_URL environment variable in Vercel')
          console.error('❌ Make sure it is set for Production, Preview, and Development environments')
        }
      } catch (error) {
        console.error('❌ ========================================')
        console.error('❌ SLACK NOTIFICATION ERROR')
        console.error('❌ ========================================')
        console.error('❌ Error message:', error instanceof Error ? error.message : String(error))
        console.error('❌ Error stack:', error instanceof Error ? error.stack : 'No stack trace')
        console.error('❌ Error type:', error instanceof Error ? error.constructor.name : typeof error)
      }

      return NextResponse.json({
        success: true,
        visitor: result.rows[0],
      })
    }
  } catch (error) {
    console.error('Error tracking visitor:', error)
    return NextResponse.json(
      { error: 'Failed to track visitor' },
      { status: 500 }
    )
  }
}

/**
 * Get all visitors
 * GET /api/visitors
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '100')
    const offset = parseInt(searchParams.get('offset') || '0')

    const db = getDbPool()

    const result = await db.query(`
      SELECT 
        v.id, v.session_id, v.ip_address,
        v.country, v.country_code, v.city, v.region, v.latitude, v.longitude, v.timezone,
        v.device_type, v.browser, v.os, v.screen_resolution,
        v.pages_visited, v.visit_count, v.uae_time,
        v.first_visit, v.last_visit,
        v.user_agent, v.referer,
        l.label as ip_label
      FROM visitors v
      LEFT JOIN ip_labels l ON v.ip_address = l.ip_address
      ORDER BY v.last_visit DESC
      LIMIT $1 OFFSET $2
    `, [limit, offset])

    const countResult = await db.query('SELECT COUNT(*) as total FROM visitors')
    const total = parseInt(countResult.rows[0].total)

    return NextResponse.json({
      success: true,
      visitors: result.rows,
      total,
      limit,
      offset,
    })
  } catch (error) {
    console.error('Error fetching visitors:', error)
    return NextResponse.json(
      { error: 'Failed to fetch visitors' },
      { status: 500 }
    )
  }
}


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

    // Check all visits by this IP address to detect patterns
    const allVisitsByIP = await db.query(
      `SELECT first_visit, last_visit, visit_count, session_start, session_duration, total_session_time
       FROM visitors 
       WHERE ip_address = $1 
       ORDER BY first_visit DESC`,
      [ipAddress]
    )

    const now = new Date()
    let sessionDuration = 0
    let isDailyVisitor = false
    let isUnusualPattern = false
    let patternAlerts: string[] = []

    // Calculate session duration if this is a returning visitor
    if (existingVisitor.rows.length > 0) {
      const visitor = existingVisitor.rows[0]
      const sessionStart = visitor.session_start ? new Date(visitor.session_start) : new Date(visitor.first_visit)
      sessionDuration = Math.floor((now.getTime() - sessionStart.getTime()) / 1000) // Duration in seconds
    }

    // Detect daily visitors (visits on consecutive days)
    if (allVisitsByIP.rows.length > 0) {
      const recentVisits = allVisitsByIP.rows.slice(0, 7) // Check last 7 visits
      const visitDates = recentVisits.map(v => {
        const visitDate = new Date(v.first_visit)
        return visitDate.toDateString()
      })
      
      // Check if visitor has visited on multiple consecutive days
      const uniqueDates = [...new Set(visitDates)]
      if (uniqueDates.length >= 3) {
        isDailyVisitor = true
        patternAlerts.push(`📅 Daily Visitor: ${uniqueDates.length} different days in last week`)
      }

      // Check for unusual patterns
      const totalVisits = allVisitsByIP.rows.reduce((sum, v) => sum + (v.visit_count || 1), 0)
      const avgTimeBetweenVisits = allVisitsByIP.rows.length > 1 ? 
        (now.getTime() - new Date(allVisitsByIP.rows[allVisitsByIP.rows.length - 1].first_visit).getTime()) / allVisitsByIP.rows.length / (1000 * 60 * 60) : 0
      
      // Unusual patterns:
      // 1. Very frequent visits (more than 10 visits in a day)
      const todayVisits = recentVisits.filter(v => {
        const visitDate = new Date(v.first_visit)
        return visitDate.toDateString() === now.toDateString()
      }).length
      
      if (todayVisits > 10) {
        isUnusualPattern = true
        patternAlerts.push(`⚠️ High Frequency: ${todayVisits} visits today`)
      }

      // 2. Very long sessions (more than 2 hours)
      const longestSession = Math.max(...allVisitsByIP.rows.map(v => v.session_duration || 0))
      if (longestSession > 7200) { // 2 hours
        isUnusualPattern = true
        patternAlerts.push(`⏱️ Long Session: ${Math.floor(longestSession / 60)} minutes`)
      }

      // 3. Very short sessions repeatedly (bot-like behavior)
      const shortSessions = allVisitsByIP.rows.filter(v => (v.session_duration || 0) < 10).length
      if (shortSessions > 5 && totalVisits > 10) {
        isUnusualPattern = true
        patternAlerts.push(`🤖 Suspicious Pattern: ${shortSessions} very short sessions`)
      }

      // 4. Multiple visits from same IP in short time
      if (recentVisits.length > 0) {
        const lastVisit = new Date(recentVisits[0].last_visit)
        const hoursSinceLastVisit = (now.getTime() - lastVisit.getTime()) / (1000 * 60 * 60)
        if (hoursSinceLastVisit < 1 && recentVisits.length > 3) {
          isUnusualPattern = true
          patternAlerts.push(`🔄 Rapid Returns: ${recentVisits.length} visits in last hour`)
        }
      }
    }

    // SIMPLIFIED: A new visitor is someone with a NEW SESSION ID (first time we see this session)
    // This ensures EVERY new visit gets notified, regardless of IP history
    const isTrulyNewVisitor = existingVisitor.rows.length === 0

    // For existing visitors in same session (same session ID), update and only notify if unusual
    if (existingVisitor.rows.length > 0) {
      // Update existing visitor (same session, recent visit)
      const visitor = existingVisitor.rows[0]
      const pagesVisited = visitor.pages_visited || []
      
      // Add new page if not already in list
      if (pageUrl && !pagesVisited.includes(pageUrl)) {
        pagesVisited.push(pageUrl)
      }

      const newVisitCount = visitor.visit_count + 1
      const sessionStart = visitor.session_start ? new Date(visitor.session_start) : new Date(visitor.first_visit)
      const currentSessionDuration = Math.floor((now.getTime() - sessionStart.getTime()) / 1000)
      const totalTime = (visitor.total_session_time || 0) + currentSessionDuration
      
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
          session_duration = $14,
          total_session_time = $15,
          uae_time = $16,
          user_agent = $17,
          referer = $18,
          updated_at = NOW()
        WHERE session_id = $19
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
        currentSessionDuration,
        totalTime,
        uaeTime,
        userAgent || null,
        referer || null,
        sessionId,
      ])

      // Send notification for returning visitors only if unusual pattern or daily visitor
      // Otherwise, just update and return (don't send notification for normal returning visitors)
      if (!isUnusualPattern && !isDailyVisitor) {
        return NextResponse.json({
          success: true,
          visitor: {
            ...visitor,
            pagesVisited,
            visitCount: newVisitCount,
            sessionDuration: currentSessionDuration,
          },
          country: location?.country,
          countryCode: location?.countryCode,
        })
      }
      // Continue to send notification below for unusual patterns/daily visitors
    }

    // Create or update visitor record
    let visitorRecord
    if (existingVisitor.rows.length > 0) {
      // Update existing
      const visitor = existingVisitor.rows[0]
      const pagesVisited = visitor.pages_visited || []
      if (pageUrl && !pagesVisited.includes(pageUrl)) {
        pagesVisited.push(pageUrl)
      }
      
      const result = await db.query(`
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
          visit_count = COALESCE(visit_count, 0) + 1,
          last_visit = NOW(),
          session_start = COALESCE(session_start, NOW()),
          session_duration = $14,
          total_session_time = COALESCE(total_session_time, 0) + $14,
          uae_time = $15,
          user_agent = $16,
          referer = $17,
          updated_at = NOW()
        WHERE session_id = $18
        RETURNING *
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
        pageUrl ? [pageUrl] : [],
        sessionDuration,
        uaeTime,
        userAgent || null,
        referer || null,
        sessionId,
      ])
      visitorRecord = result.rows[0]
    } else {
      // Create new visitor
      const result = await db.query(`
        INSERT INTO visitors (
          session_id, ip_address,
          country, country_code, city, region, latitude, longitude, timezone,
          device_type, browser, os, screen_resolution,
          pages_visited, visit_count, uae_time,
          user_agent, referer, entry_point,
          session_start, session_duration, total_session_time,
          first_visit, last_visit
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, NOW(), 0, 0, NOW(), NOW())
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
      visitorRecord = result.rows[0]
    }

    // Format session duration for display
    const formatDuration = (seconds: number): string => {
      if (seconds < 60) return `${seconds}s`
      if (seconds < 3600) return `${Math.floor(seconds / 60)}m ${seconds % 60}s`
      return `${Math.floor(seconds / 3600)}h ${Math.floor((seconds % 3600) / 60)}m`
    }

    // Format referer/source
    const formatSource = (ref: string | null): string => {
      if (!ref) return 'Direct'
      try {
        const url = new URL(ref)
        if (url.hostname.includes('google')) return 'Google Search'
        if (url.hostname.includes('facebook')) return 'Facebook'
        if (url.hostname.includes('instagram')) return 'Instagram'
        if (url.hostname.includes('twitter') || url.hostname.includes('x.com')) return 'Twitter/X'
        if (url.hostname.includes('linkedin')) return 'LinkedIn'
        return url.hostname.replace('www.', '')
      } catch {
        return ref.substring(0, 50)
      }
    }

    // SIMPLIFIED LOGIC: ALWAYS notify for new visitors (new session)
    // Also notify for unusual patterns or daily visitors
    const shouldNotify = isTrulyNewVisitor || isUnusualPattern || isDailyVisitor
    
    // Log notification decision
    console.log('📱 ========================================')
    console.log('📱 NOTIFICATION DECISION')
    console.log('📱 ========================================')
    console.log('📱 Is New Visitor (new session):', isTrulyNewVisitor)
    console.log('📱 Is Daily Visitor:', isDailyVisitor)
    console.log('📱 Is Unusual Pattern:', isUnusualPattern)
    console.log('📱 Should Notify:', shouldNotify)
    console.log('📱 Session ID:', sessionId)
    console.log('📱 IP Address:', ipAddress)
    
    if (!shouldNotify) {
      // Normal returning visitor (same session, no unusual patterns), no notification needed
      console.log('📱 Skipping notification - normal returning visitor')
      return NextResponse.json({
        success: true,
        visitor: visitorRecord,
        country: location?.country,
        countryCode: location?.countryCode,
      })
    }

    // Send enhanced Slack notification
    console.log('📱 ========================================')
    console.log('📱 ATTEMPTING TO SEND ENHANCED VISITOR NOTIFICATION')
    console.log('📱 ========================================')
    console.log('📱 Is New Visitor:', isTrulyNewVisitor)
    console.log('📱 Is Daily Visitor:', isDailyVisitor)
    console.log('📱 Is Unusual Pattern:', isUnusualPattern)
    console.log('📱 Should Notify:', shouldNotify)
    console.log('📱 IP Address:', ipAddress)
    console.log('📱 IP Label:', ipLabel || 'None')
    console.log('📱 Location:', location ? `${location.city}, ${location.country}` : 'Unknown')
    console.log('📱 Device:', `${device.type} - ${device.browser} - ${device.os}`)
    console.log('📱 Session Duration:', formatDuration(sessionDuration))
    console.log('📱 Visit Count:', visitorRecord.visit_count)
    console.log('📱 SLACK_COMINGSOON_WEBHOOK exists:', !!process.env.SLACK_COMINGSOON_WEBHOOK)
    console.log('📱 SLACK_VISITOR_WEBHOOK_URL exists:', !!process.env.SLACK_VISITOR_WEBHOOK_URL)
    console.log('📱 SLACK_WEBHOOK_URL exists (fallback):', !!process.env.SLACK_WEBHOOK_URL)
    const webhookUrl = process.env.SLACK_COMINGSOON_WEBHOOK || process.env.SLACK_VISITOR_WEBHOOK_URL || process.env.SLACK_WEBHOOK_URL
    console.log('📱 Using webhook:', webhookUrl ? `${webhookUrl.substring(0, 50)}...` : 'NOT SET')
    
    try {
      const notificationResult = await sendVisitorNotification({
        ipAddress,
        ipLabel: ipLabel || undefined,
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
        pagesVisited: visitorRecord.pages_visited?.length || 0,
        visitCount: visitorRecord.visit_count || 1,
        isNewVisitor: isTrulyNewVisitor,
        sessionDuration: sessionDuration,
        source: formatSource(referer || null),
        isDailyVisitor,
        isUnusualPattern,
        patternAlerts,
      })
      console.log('📱 ========================================')
      console.log('📱 SLACK NOTIFICATION RESULT:', notificationResult ? '✅ SENT SUCCESSFULLY' : '❌ FAILED')
      console.log('📱 ========================================')
      if (!notificationResult) {
        console.error('❌ Slack notification returned false')
        console.error('❌ Check SLACK_COMINGSOON_WEBHOOK, SLACK_VISITOR_WEBHOOK_URL, or SLACK_WEBHOOK_URL environment variable in Vercel')
      }
    } catch (error) {
      console.error('❌ ========================================')
      console.error('❌ SLACK NOTIFICATION ERROR')
      console.error('❌ ========================================')
      console.error('❌ Error message:', error instanceof Error ? error.message : String(error))
      console.error('❌ Error stack:', error instanceof Error ? error.stack : 'No stack trace')
    }

    return NextResponse.json({
      success: true,
      visitor: visitorRecord,
      country: location?.country,
      countryCode: location?.countryCode,
    })
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


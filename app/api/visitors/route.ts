import { NextRequest, NextResponse } from 'next/server'
import { getDbPool } from '@/lib/db'
import { getAccurateLocation, getDeviceInfo, getUAETime } from '@/lib/visitor-tracking'

// Force dynamic rendering
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

/**
 * Track or update visitor information
 * POST /api/visitors
 */
export async function POST(request: NextRequest) {
  try {
    const { sessionId, pageUrl, userAgent, referer } = await request.json()

    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID required' }, { status: 400 })
    }

    // Get IP address
    const forwarded = request.headers.get('x-forwarded-for')
    const realIp = request.headers.get('x-real-ip')
    const ipAddress = forwarded?.split(',')[0] || realIp || request.ip || 'unknown'

    // Get location data
    const location = await getAccurateLocation(ipAddress)

    // Get device info
    const device = getDeviceInfo(userAgent || '')

    // Get UAE time
    const uaeTime = getUAETime()

    const db = getDbPool()

    // Check if visitor exists
    const existingVisitor = await db.query(
      'SELECT * FROM visitors WHERE session_id = $1',
      [sessionId]
    )

    if (existingVisitor.rows.length > 0) {
      // Update existing visitor
      const visitor = existingVisitor.rows[0]
      const pagesVisited = visitor.pages_visited || []
      
      // Add new page if not already in list
      if (pageUrl && !pagesVisited.includes(pageUrl)) {
        pagesVisited.push(pageUrl)
      }

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

      return NextResponse.json({
        success: true,
        visitor: {
          ...visitor,
          pagesVisited,
          visitCount: visitor.visit_count + 1,
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
        id, session_id, ip_address,
        country, country_code, city, region, latitude, longitude, timezone,
        device_type, browser, os, screen_resolution,
        pages_visited, visit_count, uae_time,
        first_visit, last_visit,
        user_agent, referer
      FROM visitors
      ORDER BY last_visit DESC
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


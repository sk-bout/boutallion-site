import { NextRequest, NextResponse } from 'next/server'
import type { TrackingData } from '@/lib/analytics'
import { getDbPool } from '@/lib/db'
import { getLocationFromIP } from '@/lib/geolocation'

/**
 * Server-side tracking endpoint
 * Captures IP address, location, and logs all tracking events to PostgreSQL
 */

export async function POST(request: NextRequest) {
  try {
    const trackingData: TrackingData = await request.json()

    // Get IP address from request
    const forwarded = request.headers.get('x-forwarded-for')
    const realIp = request.headers.get('x-real-ip')
    const ipAddress = forwarded?.split(',')[0] || realIp || request.ip || 'unknown'

    // Get location from IP
    const locationData = await getLocationFromIP(ipAddress)

    // Enhanced tracking data with server-side information
    const enhancedData = {
      ...trackingData,
      ipAddress,
      country: locationData?.country,
      city: locationData?.city,
      region: locationData?.region,
      location_string: locationData ? 
        `${locationData.city || ''}${locationData.city && locationData.region ? ', ' : ''}${locationData.region || ''}${(locationData.city || locationData.region) && locationData.country ? ', ' : ''}${locationData.country || ''}` :
        null,
      serverTimestamp: new Date().toISOString(),
    }

    // Log to console
    console.log('📊 Tracking Event:', JSON.stringify(enhancedData, null, 2))

    // Store in PostgreSQL database
    try {
      const db = getDbPool()
      await db.query(`
        INSERT INTO tracking_events (
          session_id, event_type, email, ip_address,
          country, city, region, location_string,
          event_data, page_url, referer, user_agent,
          device_type, browser, os,
          created_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, NOW())
      `, [
        trackingData.sessionId,
        trackingData.eventType,
        trackingData.email || null,
        ipAddress,
        locationData?.country || null,
        locationData?.city || null,
        locationData?.region || null,
        enhancedData.location_string || null,
        JSON.stringify(trackingData.eventData || {}),
        trackingData.pageUrl || null,
        trackingData.referrer || null,
        trackingData.userAgent || null,
        trackingData.deviceType || null,
        trackingData.browser || null,
        trackingData.os || null,
      ])
    } catch (dbError) {
      // Don't fail tracking if database save fails
      console.error('⚠️ Database save failed (tracking still logged):', dbError)
    }

    // Return success
    return NextResponse.json({ success: true, received: true }, { status: 200 })
  } catch (error) {
    console.error('Tracking API error:', error)
    // Don't fail the request - tracking should never break the user experience
    return NextResponse.json({ success: false, error: 'Tracking failed' }, { status: 500 })
  }
}

// Optional: GET endpoint to retrieve tracking data (for admin dashboard)
export async function GET(request: NextRequest) {
  // In production, retrieve from your database
  // For now, return a message
  return NextResponse.json({
    message: 'Tracking endpoint active',
    note: 'Use POST to send tracking data',
  })
}


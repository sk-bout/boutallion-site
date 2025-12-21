import { NextRequest, NextResponse } from 'next/server'
import { getDbPool } from '@/lib/db'

// Force dynamic rendering - don't run during build
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

/**
 * Get subscriptions with location data for map display
 * Returns only subscriptions with valid latitude/longitude
 */
export async function GET(request: NextRequest) {
  try {
    const db = getDbPool()
    
    // Query subscriptions with location data
    const result = await db.query(`
      SELECT 
        id,
        email,
        latitude,
        longitude,
        city,
        country,
        region,
        location_string,
        created_at
      FROM subscriptions
      WHERE latitude IS NOT NULL 
        AND longitude IS NOT NULL
        AND latitude != 0 
        AND longitude != 0
      ORDER BY created_at DESC
      LIMIT 1000
    `)

    return NextResponse.json({
      success: true,
      count: result.rows.length,
      subscriptions: result.rows,
    })
  } catch (error) {
    console.error('Error fetching subscriptions for map:', error)
    
    // If database is not configured, return empty array
    if (error instanceof Error && error.message.includes('DATABASE_URL')) {
      return NextResponse.json({
        success: true,
        count: 0,
        subscriptions: [],
        note: 'Database not configured. Subscriptions will be stored once database is set up.',
      })
    }
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch subscriptions',
        subscriptions: [],
      },
      { status: 500 }
    )
  }
}


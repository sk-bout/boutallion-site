import { NextRequest, NextResponse } from 'next/server'
import { getDbPool } from '@/lib/db'

/**
 * API endpoint to retrieve subscription data with locations
 * GET: List all subscriptions with filters
 * POST: Search subscriptions by criteria
 */

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const country = searchParams.get('country')
    const city = searchParams.get('city')
    const email = searchParams.get('email')
    const limit = parseInt(searchParams.get('limit') || '100')
    const offset = parseInt(searchParams.get('offset') || '0')

    const db = getDbPool()
    
    let query = `
      SELECT 
        id, email, ip_address,
        country, country_code, city, region, region_code, timezone,
        latitude, longitude, location_string,
        user_agent, referer, entry_point,
        device_type, browser, os,
        created_at, updated_at
      FROM subscriptions
      WHERE 1=1
    `
    const params: any[] = []
    let paramCount = 0

    if (email) {
      paramCount++
      query += ` AND email = $${paramCount}`
      params.push(email)
    }
    if (country) {
      paramCount++
      query += ` AND country = $${paramCount}`
      params.push(country)
    }
    if (city) {
      paramCount++
      query += ` AND city = $${paramCount}`
      params.push(city)
    }

    query += ` ORDER BY created_at DESC LIMIT $${paramCount + 1} OFFSET $${paramCount + 2}`
    params.push(limit, offset)

    const result = await db.query(query, params)

    // Get total count
    let countQuery = 'SELECT COUNT(*) as total FROM subscriptions WHERE 1=1'
    const countParams: any[] = []
    let countParamCount = 0

    if (email) {
      countParamCount++
      countQuery += ` AND email = $${countParamCount}`
      countParams.push(email)
    }
    if (country) {
      countParamCount++
      countQuery += ` AND country = $${countParamCount}`
      countParams.push(country)
    }
    if (city) {
      countParamCount++
      countQuery += ` AND city = $${countParamCount}`
      countParams.push(city)
    }

    const countResult = await db.query(countQuery, countParams)
    const total = parseInt(countResult.rows[0].total)

    return NextResponse.json({
      success: true,
      total,
      count: result.rows.length,
      subscriptions: result.rows,
    })
  } catch (error) {
    console.error('Error fetching subscriptions:', error)
    
    // If database is not configured, return helpful message
    if (error instanceof Error && error.message.includes('DATABASE_URL')) {
      return NextResponse.json({
        success: false,
        error: 'Database not configured',
        message: 'Please set DATABASE_URL in your environment variables',
        subscriptions: [],
      }, { status: 500 })
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

/**
 * Search subscriptions by criteria
 */
export async function POST(request: NextRequest) {
  try {
    const { email, country, city, region, startDate, endDate, limit = 100 } = await request.json()

    const db = getDbPool()
    
    let query = `
      SELECT 
        id, email, ip_address,
        country, country_code, city, region, region_code, timezone,
        latitude, longitude, location_string,
        user_agent, referer, entry_point,
        device_type, browser, os,
        created_at, updated_at
      FROM subscriptions
      WHERE 1=1
    `
    const params: any[] = []
    let paramCount = 0

    if (email) {
      paramCount++
      query += ` AND email ILIKE $${paramCount}`
      params.push(`%${email}%`)
    }
    if (country) {
      paramCount++
      query += ` AND country = $${paramCount}`
      params.push(country)
    }
    if (city) {
      paramCount++
      query += ` AND city = $${paramCount}`
      params.push(city)
    }
    if (region) {
      paramCount++
      query += ` AND region = $${paramCount}`
      params.push(region)
    }
    if (startDate) {
      paramCount++
      query += ` AND created_at >= $${paramCount}`
      params.push(startDate)
    }
    if (endDate) {
      paramCount++
      query += ` AND created_at <= $${paramCount}`
      params.push(endDate)
    }

    query += ` ORDER BY created_at DESC LIMIT $${paramCount + 1}`
    params.push(limit)

    const result = await db.query(query, params)

    return NextResponse.json({
      success: true,
      count: result.rows.length,
      subscriptions: result.rows,
    })
  } catch (error) {
    console.error('Error searching subscriptions:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to search subscriptions',
        subscriptions: [],
      },
      { status: 500 }
    )
  }
}

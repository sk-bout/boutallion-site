import { NextRequest, NextResponse } from 'next/server'
import { getDbPool } from '@/lib/db'

// Force dynamic rendering
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

/**
 * Test database connection and table access
 * GET /api/test-db
 */
export async function GET(request: NextRequest) {
  try {
    console.log('🧪 Testing database connection...')
    console.log('🧪 DATABASE_URL exists:', !!process.env.DATABASE_URL)
    console.log('🧪 DATABASE_URL preview:', process.env.DATABASE_URL ? process.env.DATABASE_URL.substring(0, 50) + '...' : 'MISSING')
    
    const db = getDbPool()
    if (!db) {
      return NextResponse.json({
        success: false,
        error: 'Database pool is null - DATABASE_URL may not be set',
        databaseUrlExists: !!process.env.DATABASE_URL,
      }, { status: 500 })
    }

    // Test 1: Basic connection
    console.log('🧪 Test 1: Basic connection...')
    await db.query('SELECT NOW()')
    console.log('✅ Test 1: Connection successful')

    // Test 2: Check if subscriptions table exists
    console.log('🧪 Test 2: Check subscriptions table...')
    const tableCheck = await db.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'subscriptions'
      );
    `)
    console.log('✅ Test 2: Subscriptions table exists:', tableCheck.rows[0].exists)

    // Test 3: Try to insert a test record
    console.log('🧪 Test 3: Try inserting test record...')
    const testEmail = `test-${Date.now()}@example.com`
    const insertResult = await db.query(`
      INSERT INTO subscriptions (email, ip_address, created_at)
      VALUES ($1, $2, NOW())
      RETURNING id, email, created_at
    `, [testEmail, '127.0.0.1'])
    console.log('✅ Test 3: Insert successful:', insertResult.rows[0])

    // Test 4: Try to read it back
    console.log('🧪 Test 4: Read back test record...')
    const readResult = await db.query(
      'SELECT * FROM subscriptions WHERE email = $1',
      [testEmail]
    )
    console.log('✅ Test 4: Read successful:', readResult.rows.length > 0)

    // Test 5: Count total subscriptions
    console.log('🧪 Test 5: Count total subscriptions...')
    const countResult = await db.query('SELECT COUNT(*) as count FROM subscriptions')
    const totalCount = parseInt(countResult.rows[0].count)
    console.log('✅ Test 5: Total subscriptions:', totalCount)

    // Clean up test record
    await db.query('DELETE FROM subscriptions WHERE email = $1', [testEmail])
    console.log('🧹 Cleaned up test record')

    return NextResponse.json({
      success: true,
      tests: {
        connection: '✅ OK',
        tableExists: tableCheck.rows[0].exists,
        insert: '✅ OK',
        read: readResult.rows.length > 0 ? '✅ OK' : '❌ Failed',
        totalSubscriptions: totalCount,
      },
      message: 'All database tests passed!',
    })
  } catch (error) {
    console.error('❌ Database test failed:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : String(error),
      errorCode: (error as any)?.code,
      errorDetail: (error as any)?.detail,
      errorHint: (error as any)?.hint,
      stack: error instanceof Error ? error.stack : undefined,
    }, { status: 500 })
  }
}


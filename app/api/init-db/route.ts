import { NextRequest, NextResponse } from 'next/server'
import { initDatabase } from '@/lib/db'

/**
 * Initialize database schema
 * Call this endpoint once to set up tables
 * GET /api/init-db
 */
export async function GET(request: NextRequest) {
  try {
    await initDatabase()
    return NextResponse.json({
      success: true,
      message: 'Database initialized successfully',
    })
  } catch (error) {
    console.error('Database initialization error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Database initialization failed',
      },
      { status: 500 }
    )
  }
}


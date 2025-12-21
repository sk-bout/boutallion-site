import { NextRequest, NextResponse } from 'next/server'
import { getDbPool } from '@/lib/db'

// Force dynamic rendering
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

/**
 * Set label for an IP address
 * POST /api/ip-labels
 */
export async function POST(request: NextRequest) {
  try {
    const { ipAddress, label, notes } = await request.json()

    if (!ipAddress || !label) {
      return NextResponse.json(
        { error: 'IP address and label are required' },
        { status: 400 }
      )
    }

    const db = getDbPool()

    // Insert or update label
    const result = await db.query(`
      INSERT INTO ip_labels (ip_address, label, notes, updated_at)
      VALUES ($1, $2, $3, NOW())
      ON CONFLICT (ip_address)
      DO UPDATE SET
        label = EXCLUDED.label,
        notes = EXCLUDED.notes,
        updated_at = NOW()
      RETURNING *
    `, [ipAddress, label, notes || null])

    return NextResponse.json({
      success: true,
      label: result.rows[0],
    })
  } catch (error) {
    console.error('Error setting IP label:', error)
    return NextResponse.json(
      { error: 'Failed to set IP label' },
      { status: 500 }
    )
  }
}

/**
 * Get all IP labels
 * GET /api/ip-labels
 */
export async function GET(request: NextRequest) {
  try {
    const db = getDbPool()

    const result = await db.query(`
      SELECT * FROM ip_labels
      ORDER BY updated_at DESC
    `)

    return NextResponse.json({
      success: true,
      labels: result.rows,
    })
  } catch (error) {
    console.error('Error fetching IP labels:', error)
    return NextResponse.json(
      { error: 'Failed to fetch IP labels' },
      { status: 500 }
    )
  }
}

/**
 * Delete IP label
 * DELETE /api/ip-labels
 */
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const ipAddress = searchParams.get('ip')

    if (!ipAddress) {
      return NextResponse.json(
        { error: 'IP address is required' },
        { status: 400 }
      )
    }

    const db = getDbPool()

    await db.query('DELETE FROM ip_labels WHERE ip_address = $1', [ipAddress])

    return NextResponse.json({
      success: true,
      message: 'Label deleted',
    })
  } catch (error) {
    console.error('Error deleting IP label:', error)
    return NextResponse.json(
      { error: 'Failed to delete IP label' },
      { status: 500 }
    )
  }
}


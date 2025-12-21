import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

/**
 * Test endpoint to verify visitor tracking and Slack notification setup
 * GET /api/test-visitor-tracking
 */
export async function GET(request: NextRequest) {
  const results: any = {
    timestamp: new Date().toISOString(),
    checks: {},
    errors: [],
  }

  // Check environment variables
  results.checks.slackWebhookUrl = {
    exists: !!process.env.SLACK_WEBHOOK_URL,
    preview: process.env.SLACK_WEBHOOK_URL 
      ? process.env.SLACK_WEBHOOK_URL.substring(0, 30) + '...' 
      : 'NOT SET',
  }

  results.checks.databaseUrl = {
    exists: !!process.env.DATABASE_URL,
    preview: process.env.DATABASE_URL 
      ? process.env.DATABASE_URL.substring(0, 30) + '...' 
      : 'NOT SET',
  }

  // Test database connection
  try {
    const { getDbPool } = await import('@/lib/db')
    const db = getDbPool()
    if (db) {
      const testQuery = await db.query('SELECT COUNT(*) as count FROM visitors')
      results.checks.database = {
        connected: true,
        visitorCount: parseInt(testQuery.rows[0].count, 10),
      }
    } else {
      results.checks.database = {
        connected: false,
        error: 'Database pool is null',
      }
      results.errors.push('Database pool is null - DATABASE_URL may not be set')
    }
  } catch (error) {
    results.checks.database = {
      connected: false,
      error: error instanceof Error ? error.message : String(error),
    }
    results.errors.push(`Database error: ${error instanceof Error ? error.message : String(error)}`)
  }

  // Test Slack notification function (dry run)
  try {
    const { sendVisitorNotification } = await import('@/lib/slack')
    // Just check if function exists and webhook URL is available
    results.checks.slackFunction = {
      available: typeof sendVisitorNotification === 'function',
      webhookConfigured: !!process.env.SLACK_WEBHOOK_URL,
    }
  } catch (error) {
    results.checks.slackFunction = {
      available: false,
      error: error instanceof Error ? error.message : String(error),
    }
    results.errors.push(`Slack function error: ${error instanceof Error ? error.message : String(error)}`)
  }

  // Overall status
  results.status = results.errors.length === 0 ? 'OK' : 'ERRORS FOUND'
  results.summary = {
    slackConfigured: !!process.env.SLACK_WEBHOOK_URL,
    databaseConnected: results.checks.database?.connected || false,
    ready: results.errors.length === 0 && !!process.env.SLACK_WEBHOOK_URL && results.checks.database?.connected,
  }

  return NextResponse.json(results, {
    status: results.errors.length === 0 ? 200 : 500,
  })
}


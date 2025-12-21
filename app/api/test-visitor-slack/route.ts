import { NextRequest, NextResponse } from 'next/server'
import { sendVisitorNotification } from '@/lib/slack'

export const dynamic = 'force-dynamic'

/**
 * Test endpoint to verify visitor Slack notification setup
 * GET /api/test-visitor-slack
 */
export async function GET(request: NextRequest) {
  const results: any = {
    timestamp: new Date().toISOString(),
    checks: {},
    test: {},
    errors: [],
  }

  // Check environment variables
  results.checks.slackWebhookUrl = {
    comingsoonWebhook: {
      exists: !!process.env.SLACK_COMINGSOON_WEBHOOK,
      preview: process.env.SLACK_COMINGSOON_WEBHOOK 
        ? process.env.SLACK_COMINGSOON_WEBHOOK.substring(0, 30) + '...' 
        : 'NOT SET',
    },
    visitorWebhook: {
      exists: !!process.env.SLACK_VISITOR_WEBHOOK_URL,
      preview: process.env.SLACK_VISITOR_WEBHOOK_URL 
        ? process.env.SLACK_VISITOR_WEBHOOK_URL.substring(0, 30) + '...' 
        : 'NOT SET',
    },
    mainWebhook: {
      exists: !!process.env.SLACK_WEBHOOK_URL,
      preview: process.env.SLACK_WEBHOOK_URL 
        ? process.env.SLACK_WEBHOOK_URL.substring(0, 30) + '...' 
        : 'NOT SET',
    },
    usingWebhook: process.env.SLACK_COMINGSOON_WEBHOOK || process.env.SLACK_VISITOR_WEBHOOK_URL || process.env.SLACK_WEBHOOK_URL || 'NONE',
  }

  // Test sending a notification - check in order: SLACK_COMINGSOON_WEBHOOK, SLACK_VISITOR_WEBHOOK_URL, SLACK_WEBHOOK_URL
  const webhookUrl = process.env.SLACK_COMINGSOON_WEBHOOK || process.env.SLACK_VISITOR_WEBHOOK_URL || process.env.SLACK_WEBHOOK_URL
  
  if (webhookUrl) {
    try {
      console.log('🧪 Testing Slack visitor notification...')
      const testResult = await sendVisitorNotification({
        ipAddress: '127.0.0.1',
        ipLabel: 'Test',
        location: {
          country: 'Test Country',
          city: 'Test City',
          latitude: 0,
          longitude: 0,
        },
        device: {
          type: 'desktop',
          browser: 'Test Browser',
          os: 'Test OS',
        },
        userAgent: 'Test User Agent',
        referer: 'https://test.com',
        timestamp: new Date().toISOString(),
        uaeTime: new Date().toLocaleString('en-US', { timeZone: 'Asia/Dubai' }),
        pagesVisited: 1,
        visitCount: 1,
        isNewVisitor: true,
      })
      
      results.test.notificationSent = testResult
      results.test.message = testResult 
        ? '✅ Test notification sent successfully to Slack!' 
        : '❌ Test notification failed - check Slack webhook URL'
    } catch (error) {
      results.test.notificationSent = false
      results.test.error = error instanceof Error ? error.message : String(error)
      results.errors.push(`Test notification error: ${error instanceof Error ? error.message : String(error)}`)
    }
  } else {
    results.test.notificationSent = false
    results.test.message = '❌ SLACK_COMINGSOON_WEBHOOK, SLACK_VISITOR_WEBHOOK_URL, or SLACK_WEBHOOK_URL not set - cannot test'
    results.errors.push('SLACK_COMINGSOON_WEBHOOK, SLACK_VISITOR_WEBHOOK_URL, or SLACK_WEBHOOK_URL environment variable must be set')
  }

  // Overall status
  results.status = results.errors.length === 0 && results.test.notificationSent ? 'OK' : 'ERRORS FOUND'
  results.summary = {
    slackConfigured: !!(process.env.SLACK_COMINGSOON_WEBHOOK || process.env.SLACK_VISITOR_WEBHOOK_URL || process.env.SLACK_WEBHOOK_URL),
    testPassed: results.test.notificationSent === true,
    ready: results.errors.length === 0 && !!webhookUrl && results.test.notificationSent === true,
  }

  return NextResponse.json(results, {
    status: results.errors.length === 0 ? 200 : 500,
  })
}


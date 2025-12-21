import { NextRequest, NextResponse } from 'next/server'
import { sendVisitorNotification } from '@/lib/slack'

export const dynamic = 'force-dynamic'

/**
 * Test endpoint to verify visitor Slack notification setup
 * GET /api/test-visitor-notification
 * 
 * This will send a test notification to Slack to verify everything is working
 */
export async function GET(request: NextRequest) {
  const results: any = {
    timestamp: new Date().toISOString(),
    checks: {},
    test: {},
    errors: [],
  }

  // Check environment variables
  results.checks.slackComingsoonWebhook = {
    exists: !!process.env.SLACK_COMINGSOON_WEBHOOK,
    preview: process.env.SLACK_COMINGSOON_WEBHOOK 
      ? process.env.SLACK_COMINGSOON_WEBHOOK.substring(0, 30) + '...' 
      : 'NOT SET',
  }
  results.checks.slackVisitorWebhookUrl = {
    exists: !!process.env.SLACK_VISITOR_WEBHOOK_URL,
    preview: process.env.SLACK_VISITOR_WEBHOOK_URL 
      ? process.env.SLACK_VISITOR_WEBHOOK_URL.substring(0, 30) + '...' 
      : 'NOT SET',
  }
  results.checks.slackWebhookUrlFallback = {
    exists: !!process.env.SLACK_WEBHOOK_URL,
    preview: process.env.SLACK_WEBHOOK_URL 
      ? process.env.SLACK_WEBHOOK_URL.substring(0, 30) + '...' 
      : 'NOT SET',
  }
  
  const webhookUrl = process.env.SLACK_COMINGSOON_WEBHOOK || process.env.SLACK_VISITOR_WEBHOOK_URL || process.env.SLACK_WEBHOOK_URL
  results.checks.usingWebhook = webhookUrl ? webhookUrl.substring(0, 50) + '...' : 'NONE'

  // Test sending a notification
  if (webhookUrl) {
    try {
      console.log('🧪 ========================================')
      console.log('🧪 TESTING VISITOR SLACK NOTIFICATION')
      console.log('🧪 ========================================')
      console.log('🧪 Webhook URL:', webhookUrl.substring(0, 50) + '...')
      console.log('🧪 Using webhook:', webhookUrl === process.env.SLACK_COMINGSOON_WEBHOOK ? 'SLACK_COMINGSOON_WEBHOOK' : 
                                         webhookUrl === process.env.SLACK_VISITOR_WEBHOOK_URL ? 'SLACK_VISITOR_WEBHOOK_URL' : 
                                         'SLACK_WEBHOOK_URL (fallback)')
      
      const testResult = await sendVisitorNotification({
        ipAddress: '127.0.0.1',
        ipLabel: 'Test User',
        location: {
          country: 'Testland',
          city: 'Testville',
          region: 'Test Region',
          latitude: 0,
          longitude: 0,
        },
        device: {
          type: 'desktop',
          browser: 'Test Browser',
          os: 'Test OS',
        },
        userAgent: 'Mozilla/5.0 (Test; CPU OS 13_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.1 Mobile/15E148 Safari/604.1',
        referer: 'https://test.com/source',
        timestamp: new Date().toISOString(),
        uaeTime: new Date().toLocaleString('en-US', { timeZone: 'Asia/Dubai' }),
        pagesVisited: 2,
        visitCount: 1,
        isNewVisitor: true,
        sessionDuration: 125, // 2 minutes 5 seconds
        source: 'Test Source',
        isDailyVisitor: false,
        isUnusualPattern: false,
        patternAlerts: [],
      })
      
      results.test.notificationSent = testResult
      results.test.message = testResult 
        ? '✅ Test notification sent successfully to Slack! Check your #comingsoon-visitors channel.' 
        : '❌ Test notification failed - check Slack webhook URL and Vercel logs'
      
      // If failed, check Vercel logs for detailed error messages
      if (!testResult) {
        results.test.troubleshooting = [
          '1. Check Vercel Dashboard → Your Project → Logs for detailed error messages',
          '2. Verify webhook URL is correct: ' + (webhookUrl ? webhookUrl.substring(0, 50) + '...' : 'NOT SET'),
          '3. Ensure webhook is active in Slack (Slack App Settings → Incoming Webhooks)',
          '4. Verify bot has permission to post to #comingsoon-visitors channel',
          '5. Check if webhook URL matches the channel (should be for #comingsoon-visitors)',
        ]
      }
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
    slackConfigured: !!webhookUrl,
    testPassed: results.test.notificationSent === true,
    ready: results.errors.length === 0 && !!webhookUrl && results.test.notificationSent === true,
  }

  return NextResponse.json(results, {
    status: results.errors.length === 0 ? 200 : 500,
  })
}


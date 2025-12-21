import { NextRequest, NextResponse } from 'next/server'
import { sendVisitorNotification } from '@/lib/slack'

export const dynamic = 'force-dynamic'

/**
 * Debug endpoint to check visitor tracking setup
 * GET /api/debug-visitor-tracking
 */
export async function GET(request: NextRequest) {
  const diagnostics: any = {
    timestamp: new Date().toISOString(),
    environment: {
    slackComingsoonWebhookUrl: {
      exists: !!process.env.SLACK_COMINGSOON_WEBHOOK_URL,
      length: process.env.SLACK_COMINGSOON_WEBHOOK_URL?.length || 0,
      preview: process.env.SLACK_COMINGSOON_WEBHOOK_URL 
        ? `${process.env.SLACK_COMINGSOON_WEBHOOK_URL.substring(0, 30)}...` 
        : 'NOT SET',
    },
    slackComingsoonWebhook: {
      exists: !!process.env.SLACK_COMINGSOON_WEBHOOK,
      length: process.env.SLACK_COMINGSOON_WEBHOOK?.length || 0,
      preview: process.env.SLACK_COMINGSOON_WEBHOOK 
        ? `${process.env.SLACK_COMINGSOON_WEBHOOK.substring(0, 30)}...` 
        : 'NOT SET',
    },
      slackVisitorWebhookUrl: {
        exists: !!process.env.SLACK_VISITOR_WEBHOOK_URL,
        length: process.env.SLACK_VISITOR_WEBHOOK_URL?.length || 0,
        preview: process.env.SLACK_VISITOR_WEBHOOK_URL 
          ? `${process.env.SLACK_VISITOR_WEBHOOK_URL.substring(0, 30)}...` 
          : 'NOT SET',
      },
      slackWebhookUrl: {
        exists: !!process.env.SLACK_WEBHOOK_URL,
        length: process.env.SLACK_WEBHOOK_URL?.length || 0,
        preview: process.env.SLACK_WEBHOOK_URL 
          ? `${process.env.SLACK_WEBHOOK_URL.substring(0, 30)}...` 
          : 'NOT SET',
      },
      databaseUrl: {
        exists: !!process.env.DATABASE_URL,
        hasSslMode: process.env.DATABASE_URL?.includes('sslmode') || false,
      },
    },
    webhook: {
      selected: process.env.SLACK_COMINGSOON_WEBHOOK_URL || process.env.SLACK_COMINGSOON_WEBHOOK || process.env.SLACK_VISITOR_WEBHOOK_URL || process.env.SLACK_WEBHOOK_URL || 'NONE',
      selectedPreview: (process.env.SLACK_COMINGSOON_WEBHOOK_URL || process.env.SLACK_COMINGSOON_WEBHOOK || process.env.SLACK_VISITOR_WEBHOOK_URL || process.env.SLACK_WEBHOOK_URL)?.substring(0, 50) + '...' || 'NONE',
    },
    test: {
      notificationSent: false,
      error: null,
    },
    recommendations: [] as string[],
  }

  // Check which webhook will be used
  const webhookUrl = process.env.SLACK_COMINGSOON_WEBHOOK_URL || process.env.SLACK_COMINGSOON_WEBHOOK || process.env.SLACK_VISITOR_WEBHOOK_URL || process.env.SLACK_WEBHOOK_URL

  if (!webhookUrl) {
    diagnostics.recommendations.push('❌ No Slack webhook URL found. Set SLACK_COMINGSOON_WEBHOOK_URL in Vercel environment variables.')
    diagnostics.recommendations.push('Go to Vercel Dashboard → Settings → Environment Variables → Add SLACK_COMINGSOON_WEBHOOK_URL')
  } else {
    // Test sending a notification
    try {
      console.log('🧪 Testing visitor notification from debug endpoint...')
      const testResult = await sendVisitorNotification({
        ipAddress: request.ip || request.headers.get('x-forwarded-for') || '127.0.0.1',
        ipLabel: 'Debug Test',
        location: {
          country: 'Test Country',
          city: 'Test City',
          region: 'Test Region',
          latitude: 0,
          longitude: 0,
        },
        device: {
          type: 'desktop',
          browser: 'Debug Browser',
          os: 'Debug OS',
        },
        userAgent: request.headers.get('user-agent') || 'Debug User Agent',
        referer: request.headers.get('referer') || 'https://debug.test',
        timestamp: new Date().toISOString(),
        uaeTime: new Date().toLocaleString('en-US', { timeZone: 'Asia/Dubai' }),
        pagesVisited: 1,
        visitCount: 1,
        isNewVisitor: true,
        sessionDuration: 0,
        source: 'Debug Test',
        isDailyVisitor: false,
        isUnusualPattern: false,
        patternAlerts: [],
      })
      
      diagnostics.test.notificationSent = testResult
      if (testResult) {
        diagnostics.recommendations.push('✅ Test notification sent successfully! Check your #comingsoon-visitors Slack channel.')
      } else {
        diagnostics.recommendations.push('❌ Test notification failed. Check Vercel function logs for errors.')
        diagnostics.recommendations.push('Verify the webhook URL is correct and the Slack app has permission to post to the channel.')
      }
    } catch (error) {
      diagnostics.test.error = error instanceof Error ? error.message : String(error)
      diagnostics.recommendations.push(`❌ Error testing notification: ${diagnostics.test.error}`)
    }
  }

  // Add general recommendations
  if (!process.env.DATABASE_URL) {
    diagnostics.recommendations.push('⚠️ DATABASE_URL not set - visitor tracking may not work')
  }

  diagnostics.status = diagnostics.recommendations.some(r => r.startsWith('✅')) ? 'OK' : 'NEEDS_ATTENTION'

  return NextResponse.json(diagnostics, {
    status: diagnostics.status === 'OK' ? 200 : 500,
  })
}


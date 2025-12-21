import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

/**
 * Test Slack webhook directly
 * GET /api/test-slack-webhook
 */
export async function GET(request: NextRequest) {
  // Check for visitor webhook in order: SLACK_COMINGSOON_WEBHOOK, SLACK_VISITOR_WEBHOOK_URL, then fallback to SLACK_WEBHOOK_URL
  const webhookUrl = process.env.SLACK_COMINGSOON_WEBHOOK || process.env.SLACK_VISITOR_WEBHOOK_URL || process.env.SLACK_WEBHOOK_URL
  
  if (!webhookUrl) {
    return NextResponse.json({
      success: false,
      error: 'SLACK_COMINGSOON_WEBHOOK, SLACK_VISITOR_WEBHOOK_URL, or SLACK_WEBHOOK_URL not set',
      instructions: [
        '1. Go to Vercel Dashboard → Settings → Environment Variables',
        '2. Add SLACK_COMINGSOON_WEBHOOK (preferred) or SLACK_VISITOR_WEBHOOK_URL',
        '3. Value: https://hooks.slack.com/services/YOUR/WEBHOOK/URL',
        '4. Redeploy your site',
      ],
    }, { status: 400 })
  }

  const testMessage = {
    text: '🧪 Test message from Boutallion website',
    blocks: [
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: '🧪 Slack Webhook Test',
          emoji: true,
        },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: 'If you see this message, your Slack webhook is working correctly! ✅',
        },
      },
      {
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: `*Webhook URL:*\n\`${webhookUrl.substring(0, 50)}...\``,
          },
          {
            type: 'mrkdwn',
            text: `*Time:*\n${new Date().toISOString()}`,
          },
        ],
      },
    ],
  }

  try {
    console.log('🧪 Testing Slack webhook...')
    console.log('🧪 URL:', webhookUrl.substring(0, 50) + '...')
    
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000)
    
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Boutallion-Website-Test/1.0',
      },
      body: JSON.stringify(testMessage),
      signal: controller.signal,
    })
    
    clearTimeout(timeoutId)
    
    const responseText = await response.text()
    
    if (response.ok) {
      return NextResponse.json({
        success: true,
        message: '✅ Test message sent successfully!',
        response: responseText || 'OK',
        status: response.status,
        webhookUrl: webhookUrl.substring(0, 50) + '...',
        timestamp: new Date().toISOString(),
      })
    } else {
      return NextResponse.json({
        success: false,
        error: 'Webhook returned error',
        status: response.status,
        statusText: response.statusText,
        response: responseText,
        webhookUrl: webhookUrl.substring(0, 50) + '...',
      }, { status: response.status })
    }
  } catch (error) {
    console.error('❌ Test failed:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : String(error),
      webhookUrl: webhookUrl.substring(0, 50) + '...',
      troubleshooting: [
        '1. Verify webhook URL is correct',
        '2. Check webhook is active in Slack',
        '3. Ensure bot is added to channel',
        '4. Check Vercel function logs for details',
      ],
    }, { status: 500 })
  }
}


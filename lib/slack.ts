/**
 * Slack Notification Service
 * Sends notifications to Slack when subscriptions occur
 */

export interface SlackNotificationData {
  email: string
  ipAddress: string
  location?: {
    country?: string
    city?: string
    region?: string
    location_string?: string
    latitude?: number
    longitude?: number
  }
  userAgent?: string
  referer?: string
  timestamp: string
  mailerliteSuccess?: boolean
  device?: {
    type?: string
    browser?: string
    os?: string
  }
  uaeTime?: string
  pagesVisited?: number
}

/**
 * Send subscription notification to Slack
 */
export async function sendSlackNotification(data: SlackNotificationData): Promise<boolean> {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL

  if (!webhookUrl) {
    console.log('📱 Slack webhook not configured, skipping notification')
    return false
  }

  try {
    // Format location string
    const locationParts: string[] = []
    if (data.location?.city) locationParts.push(data.location.city)
    if (data.location?.region) locationParts.push(data.location.region)
    if (data.location?.country) locationParts.push(data.location.country)
    const locationString = locationParts.length > 0 
      ? locationParts.join(', ') 
      : data.location?.location_string || 'Unknown'

    // Format coordinates
    const coordinates = data.location?.latitude && data.location?.longitude
      ? `${data.location.latitude}, ${data.location.longitude}`
      : 'N/A'

    // Create Slack message with rich formatting
    const slackMessage = {
      text: `🎉 New Subscription: ${data.email}`,
      blocks: [
        {
          type: 'header',
          text: {
            type: 'plain_text',
            text: '🎉 New Email Subscription',
            emoji: true,
          },
        },
        {
          type: 'section',
          fields: [
            {
              type: 'mrkdwn',
              text: `*Email:*\n${data.email}`,
            },
            {
              type: 'mrkdwn',
              text: `*Status:*\n${data.mailerliteSuccess ? '✅ Success' : '⚠️ Partial'}`,
            },
            {
              type: 'mrkdwn',
              text: `*Location:*\n${locationString}`,
            },
            {
              type: 'mrkdwn',
              text: `*IP Address:*\n\`${data.ipAddress}\``,
            },
            {
              type: 'mrkdwn',
              text: `*Coordinates:*\n${coordinates}`,
            },
            {
              type: 'mrkdwn',
              text: `*Time:*\n${new Date(data.timestamp).toLocaleString()}`,
            },
            {
              type: 'mrkdwn',
              text: `*UAE Time:*\n${data.uaeTime || 'N/A'}`,
            },
            {
              type: 'mrkdwn',
              text: `*Device:*\n${data.device?.type || 'Unknown'} • ${data.device?.browser || 'Unknown'}`,
            },
            {
              type: 'mrkdwn',
              text: `*OS:*\n${data.device?.os || 'Unknown'}`,
            },
            {
              type: 'mrkdwn',
              text: `*Pages Visited:*\n${data.pagesVisited || 1}`,
            },
          ],
        },
      ],
    }

    // Add location map link if coordinates available
    if (data.location?.latitude && data.location?.longitude) {
      const mapUrl = `https://www.google.com/maps?q=${data.location.latitude},${data.location.longitude}`
      slackMessage.blocks.push({
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `📍 <${mapUrl}|View on Google Maps>`,
        },
      })
    }

    // Add additional details in a collapsible section
    if (data.userAgent || data.referer) {
      slackMessage.blocks.push({
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: '*Additional Details:*',
        },
      })

      const details: string[] = []
      if (data.userAgent) {
        details.push(`*User Agent:* ${data.userAgent.substring(0, 100)}${data.userAgent.length > 100 ? '...' : ''}`)
      }
      if (data.referer) {
        details.push(`*Referer:* ${data.referer}`)
      }

      if (details.length > 0) {
        slackMessage.blocks.push({
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: details.join('\n'),
          },
        })
      }
    }

    // Add divider
    slackMessage.blocks.push({
      type: 'divider',
    })

    // Send to Slack
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(slackMessage),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ Slack notification failed:', response.status, errorText)
      return false
    }

    console.log('✅ Slack notification sent successfully')
    return true
  } catch (error) {
    console.error('❌ Error sending Slack notification:', error)
    return false
  }
}


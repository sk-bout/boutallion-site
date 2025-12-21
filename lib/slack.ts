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
 * Send visitor notification to Slack (for all visitors, not just subscribers)
 */
export interface VisitorNotificationData {
  ipAddress: string
  ipLabel?: string | null
  location?: {
    country?: string
    city?: string
    region?: string
    latitude?: number
    longitude?: number
  }
  device?: {
    type?: string
    browser?: string
    os?: string
  }
  userAgent?: string
  referer?: string
  timestamp: string
  uaeTime?: string
  pagesVisited?: number
  visitCount?: number
  isNewVisitor?: boolean
  sessionDuration?: number // Duration in seconds
  source?: string // Formatted source (e.g., "Google Search", "Direct")
  isDailyVisitor?: boolean
  isUnusualPattern?: boolean
  patternAlerts?: string[]
}

/**
 * Send visitor notification to Slack
 */
export async function sendVisitorNotification(data: VisitorNotificationData): Promise<boolean> {
  // Use separate webhook for visitors if available, otherwise fall back to main webhook
  const webhookUrl = process.env.SLACK_VISITOR_WEBHOOK_URL || process.env.SLACK_WEBHOOK_URL

  console.log('📱 ========================================')
  console.log('📱 sendVisitorNotification called')
  console.log('📱 ========================================')
  console.log('📱 SLACK_VISITOR_WEBHOOK_URL exists:', !!process.env.SLACK_VISITOR_WEBHOOK_URL)
  console.log('📱 SLACK_WEBHOOK_URL exists (fallback):', !!process.env.SLACK_WEBHOOK_URL)
  console.log('📱 Using webhook:', webhookUrl ? webhookUrl.substring(0, 50) + '...' : 'NOT SET')
  
  if (!webhookUrl) {
    console.error('❌ Slack webhook not configured, skipping visitor notification')
    console.error('❌ Please set SLACK_VISITOR_WEBHOOK_URL or SLACK_WEBHOOK_URL in Vercel environment variables')
    return false
  }
  
  console.log('📱 Sending visitor notification to Slack...', {
    ipAddress: data.ipAddress,
    isNewVisitor: data.isNewVisitor,
    hasLocation: !!data.location,
    ipLabel: data.ipLabel,
  })

  try {
    // Format location string
    const locationParts: string[] = []
    if (data.location?.city) locationParts.push(data.location.city)
    if (data.location?.region) locationParts.push(data.location.region)
    if (data.location?.country) locationParts.push(data.location.country)
    const locationString = locationParts.length > 0 
      ? locationParts.join(', ') 
      : 'Unknown'

    // Format coordinates
    const coordinates = data.location?.latitude && data.location?.longitude
      ? `${data.location.latitude}, ${data.location.longitude}`
      : 'N/A'

    // Format session duration
    const formatDuration = (seconds?: number): string => {
      if (!seconds || seconds === 0) return 'Just arrived'
      if (seconds < 60) return `${seconds} seconds`
      if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ${seconds % 60} seconds`
      const hours = Math.floor(seconds / 3600)
      const minutes = Math.floor((seconds % 3600) / 60)
      return `${hours} hour${hours > 1 ? 's' : ''} ${minutes} minute${minutes > 1 ? 's' : ''}`
    }

    // Create Slack message with enhanced information
    let visitorStatus = data.isNewVisitor ? '🆕 New' : '👤 Returning'
    const visitorLabel = data.ipLabel ? ` (${data.ipLabel})` : ''
    
    // Add alerts for daily visitors and unusual patterns
    if (data.isDailyVisitor) {
      visitorStatus = '📅 Daily Visitor'
    }
    if (data.isUnusualPattern) {
      visitorStatus = '⚠️ Unusual Pattern'
    }
    
    const headerText = `${visitorStatus} Visitor${visitorLabel} on Site`
    
    const slackMessage: any = {
      text: headerText,
      blocks: [
        {
          type: 'header',
          text: {
            type: 'plain_text',
            text: headerText,
            emoji: true,
          },
        },
        {
          type: 'section',
          fields: [
            {
              type: 'mrkdwn',
              text: `*Timestamp:*\n${new Date(data.timestamp).toLocaleString('en-US', { 
                timeZone: 'UTC',
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
              })} UTC`,
            },
            {
              type: 'mrkdwn',
              text: `*UAE Time:*\n${data.uaeTime || 'N/A'}`,
            },
            {
              type: 'mrkdwn',
              text: `*IP Address:*\n\`${data.ipAddress}\``,
            },
            {
              type: 'mrkdwn',
              text: `*Label:*\n${data.ipLabel || 'None'}`,
            },
            {
              type: 'mrkdwn',
              text: `*Country:*\n${data.location?.country || 'Unknown'}`,
            },
            {
              type: 'mrkdwn',
              text: `*City:*\n${data.location?.city || 'Unknown'}`,
            },
            {
              type: 'mrkdwn',
              text: `*Region:*\n${data.location?.region || 'N/A'}`,
            },
            {
              type: 'mrkdwn',
              text: `*Coordinates:*\n${coordinates}`,
            },
            {
              type: 'mrkdwn',
              text: `*Device Type:*\n${data.device?.type || 'Unknown'}`,
            },
            {
              type: 'mrkdwn',
              text: `*Browser:*\n${data.device?.browser || 'Unknown'}`,
            },
            {
              type: 'mrkdwn',
              text: `*OS:*\n${data.device?.os || 'Unknown'}`,
            },
            {
              type: 'mrkdwn',
              text: `*Visit Count:*\n${data.visitCount || 1}`,
            },
            {
              type: 'mrkdwn',
              text: `*Pages Visited:*\n${data.pagesVisited || 1}`,
            },
            {
              type: 'mrkdwn',
              text: `*Session Duration:*\n${formatDuration(data.sessionDuration)}`,
            },
            {
              type: 'mrkdwn',
              text: `*Source:*\n${data.source || 'Direct'}`,
            },
          ],
        },
      ],
    }

    // Add pattern alerts if any
    if (data.patternAlerts && data.patternAlerts.length > 0) {
      slackMessage.blocks.push({
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*⚠️ Pattern Alerts:*\n${data.patternAlerts.join('\n')}`,
        } as { type: 'mrkdwn'; text: string },
      })
    }

    // Add location map link if coordinates available
    if (data.location?.latitude && data.location?.longitude) {
      const mapUrl = `https://www.google.com/maps?q=${data.location.latitude},${data.location.longitude}`
      slackMessage.blocks.push({
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `📍 <${mapUrl}|View on Google Maps>`,
        } as { type: 'mrkdwn'; text: string },
      })
    }

    // Add referer if available
    if (data.referer) {
      slackMessage.blocks.push({
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*Referer:* ${data.referer}`,
        } as { type: 'mrkdwn'; text: string },
      })
    }

    // Add divider
    slackMessage.blocks.push({
      type: 'divider',
    })

    // Send to Slack with retry logic and proper error handling
    const maxRetries = 3
    let lastError: Error | null = null
    let timeoutId: NodeJS.Timeout | null = null
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`📱 Attempting to send Slack notification (attempt ${attempt}/${maxRetries})...`)
        console.log(`📱 Webhook URL: ${webhookUrl.substring(0, 50)}...`)
        
        const controller = new AbortController()
        timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout
        
        const response = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'Boutallion-Website/1.0',
          },
          body: JSON.stringify(slackMessage),
          signal: controller.signal,
        })
        
        if (timeoutId) {
          clearTimeout(timeoutId)
          timeoutId = null
        }
        
        if (response.ok) {
          const responseText = await response.text()
          console.log('✅ Slack visitor notification sent successfully')
          console.log('✅ Response:', responseText || 'OK')
          return true
        }
        
        // If not OK, try to get error message
        const errorText = await response.text()
        console.error(`❌ Slack notification failed (attempt ${attempt}/${maxRetries}):`, {
          status: response.status,
          statusText: response.statusText,
          error: errorText.substring(0, 200),
        })
        
        // Don't retry on 4xx errors (client errors - bad webhook URL, etc.)
        if (response.status >= 400 && response.status < 500) {
          console.error('❌ Client error - not retrying. Check webhook URL.')
          console.error('❌ Common issues:')
          console.error('   - Webhook URL is incorrect')
          console.error('   - Webhook has been revoked')
          console.error('   - Bot not added to channel')
          return false
        }
        
        // Retry on 5xx errors (server errors) or network errors
        if (attempt < maxRetries) {
          const delay = attempt * 1000 // Exponential backoff: 1s, 2s, 3s
          console.log(`⏳ Retrying in ${delay}ms...`)
          await new Promise(resolve => setTimeout(resolve, delay))
        }
        
        lastError = new Error(`HTTP ${response.status}: ${errorText}`)
      } catch (error) {
        if (timeoutId) {
          clearTimeout(timeoutId)
          timeoutId = null
        }
        
        if (error instanceof Error && error.name === 'AbortError') {
          console.error(`❌ Request timeout (attempt ${attempt}/${maxRetries})`)
          lastError = new Error('Request timeout after 10 seconds')
        } else {
          console.error(`❌ Network error (attempt ${attempt}/${maxRetries}):`, error)
          lastError = error instanceof Error ? error : new Error(String(error))
        }
        
        // Retry on network errors
        if (attempt < maxRetries) {
          const delay = attempt * 1000
          console.log(`⏳ Retrying in ${delay}ms...`)
          await new Promise(resolve => setTimeout(resolve, delay))
        }
      }
    }
    
    // All retries failed
    console.error('❌ ========================================')
    console.error('❌ ALL RETRY ATTEMPTS FAILED')
    console.error('❌ ========================================')
    console.error('❌ Last error:', lastError?.message || 'Unknown error')
    console.error('❌ Webhook URL:', webhookUrl ? `${webhookUrl.substring(0, 50)}...` : 'NOT SET')
    console.error('❌ Check:')
    console.error('   1. SLACK_VISITOR_WEBHOOK_URL is set in Vercel')
    console.error('   2. Webhook URL is correct and active')
    console.error('   3. Bot is added to the channel')
    console.error('   4. Network connectivity from Vercel to Slack')
    return false
  } catch (error) {
    console.error('❌ Unexpected error in sendVisitorNotification:', error)
    return false
  }
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
    const slackMessage: any = {
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
        } as { type: 'mrkdwn'; text: string },
      })
    }

    // Add additional details in a collapsible section
    if (data.userAgent || data.referer) {
      slackMessage.blocks.push({
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: '*Additional Details:*',
        } as { type: 'mrkdwn'; text: string },
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
          } as { type: 'mrkdwn'; text: string },
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


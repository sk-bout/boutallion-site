/**
 * Email utility for sending form submissions
 * Supports multiple email services via environment variables
 */

export interface EmailData {
  to: string
  subject: string
  html: string
  text?: string
}

/**
 * Send email using configured email service
 * Supports: Resend, SendGrid, SMTP (via nodemailer), or custom webhook
 */
export async function sendEmail(data: EmailData): Promise<boolean> {
  try {
    // Option 1: Resend API
    const resendApiKey = process.env.RESEND_API_KEY
    if (resendApiKey) {
      return await sendViaResend(data, resendApiKey)
    }

    // Option 2: SendGrid API
    const sendgridApiKey = process.env.SENDGRID_API_KEY
    if (sendgridApiKey) {
      return await sendViaSendGrid(data, sendgridApiKey)
    }

    // Option 3: Custom webhook/API endpoint
    const emailWebhookUrl = process.env.EMAIL_WEBHOOK_URL
    if (emailWebhookUrl) {
      return await sendViaWebhook(data, emailWebhookUrl)
    }

    // Option 4: Simple SMTP (if configured)
    const smtpHost = process.env.SMTP_HOST
    if (smtpHost) {
      return await sendViaSMTP(data)
    }

    console.warn('⚠️ No email service configured. Set RESEND_API_KEY, SENDGRID_API_KEY, EMAIL_WEBHOOK_URL, or SMTP settings.')
    return false
  } catch (error) {
    console.error('❌ Email sending error:', error)
    return false
  }
}

/**
 * Send email via Resend API
 */
async function sendViaResend(data: EmailData, apiKey: string): Promise<boolean> {
  try {
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'
    console.log('📧 Resend: Attempting to send email...')
    console.log('📧 Resend: From:', fromEmail)
    console.log('📧 Resend: To:', data.to)
    console.log('📧 Resend: Subject:', data.subject)
    
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: data.to,
        subject: data.subject,
        html: data.html,
        text: data.text || data.html.replace(/<[^>]*>/g, ''),
      }),
    })

    const responseData = await response.text()
    let parsedResponse: any = {}
    try {
      parsedResponse = JSON.parse(responseData)
    } catch {
      parsedResponse = { message: responseData }
    }

    if (response.ok) {
      console.log('✅ Email sent via Resend successfully!')
      console.log('📧 Resend Response:', JSON.stringify(parsedResponse, null, 2))
      return true
    }

    console.error('❌ Resend API error:', response.status)
    console.error('❌ Resend Error Response:', responseData)
    console.error('❌ Full Error Details:', JSON.stringify(parsedResponse, null, 2))
    
    // Check for common errors
    if (parsedResponse.message?.includes('domain') || parsedResponse.message?.includes('verify')) {
      console.error('❌ DOMAIN VERIFICATION ERROR:')
      console.error('   Your "from" email domain needs to be verified in Resend')
      console.error('   Go to Resend.com → Domains → Add and verify your domain')
      console.error('   Or use onboarding@resend.dev for testing')
    }
    
    return false
  } catch (error) {
    console.error('❌ Resend API exception:', error)
    console.error('❌ Error details:', error instanceof Error ? error.message : String(error))
    if (error instanceof Error && error.stack) {
      console.error('❌ Stack trace:', error.stack)
    }
    return false
  }
}

/**
 * Send email via SendGrid API
 */
async function sendViaSendGrid(data: EmailData, apiKey: string): Promise<boolean> {
  try {
    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        personalizations: [{
          to: [{ email: data.to }],
        }],
        from: {
          email: process.env.SENDGRID_FROM_EMAIL || 'noreply@boutallion.com',
          name: 'Boutallion',
        },
        subject: data.subject,
        content: [
          {
            type: 'text/html',
            value: data.html,
          },
          {
            type: 'text/plain',
            value: data.text || data.html.replace(/<[^>]*>/g, ''),
          },
        ],
      }),
    })

    if (response.ok) {
      console.log('✅ Email sent via SendGrid')
      return true
    }

    const errorText = await response.text()
    console.error('❌ SendGrid API error:', response.status, errorText)
    return false
  } catch (error) {
    console.error('❌ SendGrid API error:', error)
    return false
  }
}

/**
 * Send email via custom webhook/API endpoint
 */
async function sendViaWebhook(data: EmailData, webhookUrl: string): Promise<boolean> {
  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (response.ok) {
      console.log('✅ Email sent via webhook')
      return true
    }

    const errorText = await response.text()
    console.error('❌ Webhook error:', response.status, errorText)
    return false
  } catch (error) {
    console.error('❌ Webhook error:', error)
    return false
  }
}

/**
 * Send email via SMTP (requires nodemailer - will be added if needed)
 */
async function sendViaSMTP(data: EmailData): Promise<boolean> {
  // SMTP implementation would go here if nodemailer is added
  console.warn('⚠️ SMTP not yet implemented. Please use Resend, SendGrid, or webhook.')
  return false
}

/**
 * Format form submission as HTML email
 */
export function formatFormSubmissionEmail(formData: {
  fullName: string
  email: string
  cityCountry: string
  whatBringsYou: string
}): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #d4c5a0; color: #000; padding: 20px; text-align: center; }
        .content { background-color: #f9f9f9; padding: 20px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; }
        .value { margin-top: 5px; color: #333; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New Boutallion Registration</h1>
        </div>
        <div class="content">
          <div class="field">
            <div class="label">Full Name</div>
            <div class="value">${escapeHtml(formData.fullName)}</div>
          </div>
          <div class="field">
            <div class="label">Email</div>
            <div class="value">${escapeHtml(formData.email)}</div>
          </div>
          <div class="field">
            <div class="label">City / Country</div>
            <div class="value">${escapeHtml(formData.cityCountry)}</div>
          </div>
          <div class="field">
            <div class="label">What brings you to Boutallion?</div>
            <div class="value">${escapeHtml(formData.whatBringsYou).replace(/\n/g, '<br>')}</div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `
}

function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  }
  return text.replace(/[&<>"']/g, (m) => map[m])
}


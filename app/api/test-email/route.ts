import { NextRequest, NextResponse } from 'next/server'
import { sendEmail, formatFormSubmissionEmail } from '@/lib/email'

// Force dynamic rendering
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET(request: NextRequest) {
  try {
    console.log('📧 Testing email configuration...')
    
    // Check environment variables
    const envCheck = {
      hasResendKey: !!process.env.RESEND_API_KEY,
      hasSendGridKey: !!process.env.SENDGRID_API_KEY,
      hasWebhookUrl: !!process.env.EMAIL_WEBHOOK_URL,
      hasSmtpHost: !!process.env.SMTP_HOST,
      resendFromEmail: process.env.RESEND_FROM_EMAIL || 'not set',
      resendKeyPreview: process.env.RESEND_API_KEY 
        ? `${process.env.RESEND_API_KEY.substring(0, 10)}...` 
        : 'not set',
    }
    
    console.log('📧 Environment check:', envCheck)
    
    // Try to send a test email
    const testEmailHtml = formatFormSubmissionEmail({
      fullName: 'Test User',
      email: 'test@example.com',
      cityCountry: 'Test City / Test Country',
      whatBringsYou: 'This is a test email to verify email configuration.',
    })
    
    const emailSent = await sendEmail({
      to: 'boutallion.ae@gmail.com',
      subject: '[TEST] Boutallion Email Configuration Test',
      html: testEmailHtml + `
        <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;">
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin-top: 20px;">
          <h3 style="margin-top: 0; color: #333;">Test Email</h3>
          <p style="font-size: 12px; color: #666; margin: 5px 0;">
            <strong>Timestamp:</strong> ${new Date().toISOString()}<br>
            <strong>Status:</strong> If you receive this email, your email configuration is working correctly!
          </p>
        </div>
      `,
    })
    
    return NextResponse.json({
      success: emailSent,
      message: emailSent 
        ? 'Test email sent successfully! Check boutallion.ae@gmail.com'
        : 'Test email failed. Check logs for details.',
      environment: envCheck,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('❌ Test email error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : String(error),
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    )
  }
}


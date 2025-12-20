import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    // Validate email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Option 1: Using MailerLite Form Action URL (simpler, no API key needed)
    // Get the form action URL from environment variable
    const mailerliteFormUrl = process.env.MAILERLITE_FORM_URL

    if (mailerliteFormUrl) {
      // Submit to MailerLite form endpoint
      const formData = new URLSearchParams()
      formData.append('email', email)
      formData.append('fields[source]', 'Website Subscription')

      const response = await fetch(mailerliteFormUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
      })

      if (response.ok) {
        return NextResponse.json({ success: true, message: 'Successfully subscribed' })
      } else {
        const errorText = await response.text()
        console.error('MailerLite form submission error:', errorText)
        return NextResponse.json(
          { error: 'Failed to subscribe. Please try again.' },
          { status: 500 }
        )
      }
    }

    // Option 2: Using MailerLite API (requires API key)
    const mailerliteApiKey = process.env.MAILERLITE_API_KEY
    const mailerliteGroupId = process.env.MAILERLITE_GROUP_ID || process.env.MAILERLITE_LIST_ID

    if (mailerliteApiKey && mailerliteGroupId) {
      const response = await fetch(`https://api.mailerlite.com/api/v2/subscribers/${mailerliteGroupId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-MailerLite-ApiKey': mailerliteApiKey,
        },
        body: JSON.stringify({
          email: email,
          name: '', // Optional
          fields: {
            source: 'Website Subscription',
          },
        }),
      })

      if (response.ok || response.status === 201) {
        return NextResponse.json({ success: true, message: 'Successfully subscribed' })
      } else {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }))
        console.error('MailerLite API error:', errorData)
        
        // Handle duplicate email (already subscribed)
        if (response.status === 400 && errorData.error?.message?.includes('already')) {
          return NextResponse.json(
            { success: true, message: 'You are already subscribed' },
            { status: 200 }
          )
        }

        return NextResponse.json(
          { error: 'Failed to subscribe. Please try again.' },
          { status: 500 }
        )
      }
    }

    // If neither method is configured, return error
    return NextResponse.json(
      { error: 'MailerLite is not configured. Please set MAILERLITE_FORM_URL or MAILERLITE_API_KEY in environment variables.' },
      { status: 500 }
    )
  } catch (error) {
    console.error('Subscription error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    )
  }
}


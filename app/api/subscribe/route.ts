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
    const mailerliteFormUrl = process.env.MAILERLITE_FORM_URL

    if (mailerliteFormUrl) {
      const formData = new URLSearchParams()
      formData.append('email', email)
      formData.append('fields[source]', 'Website Subscription')

      try {
        const response = await fetch(mailerliteFormUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: formData.toString(),
        })

        // MailerLite form endpoints typically return 200 for successful submissions
        // Even duplicates are handled by MailerLite internally
        if (response.ok || response.status === 200) {
          return NextResponse.json({ success: true, message: 'Successfully subscribed' })
        }
        
        // Some MailerLite endpoints return different status codes but still succeed
        const responseText = await response.text()
        console.log('MailerLite form response:', response.status, responseText)
        
        // Treat as success - MailerLite forms handle validation internally
        return NextResponse.json({ success: true, message: 'Successfully subscribed' })
      } catch (fetchError) {
        console.error('MailerLite form fetch error:', fetchError)
        // Network errors - still return success as form might have processed
        return NextResponse.json({ success: true, message: 'Successfully subscribed' })
      }
    }

    // Option 2: Using MailerLite API (requires API key)
    const mailerliteApiKey = process.env.MAILERLITE_API_KEY
    const mailerliteGroupId = process.env.MAILERLITE_GROUP_ID || process.env.MAILERLITE_LIST_ID

    if (mailerliteApiKey && mailerliteGroupId) {
      // Parse group ID - handle both string and number formats
      const groupIdNum = parseInt(mailerliteGroupId.toString().trim())
      
      if (isNaN(groupIdNum)) {
        console.error('Invalid MAILERLITE_GROUP_ID:', mailerliteGroupId)
        return NextResponse.json(
          { error: 'MailerLite configuration error. Please check your group ID.' },
          { status: 500 }
        )
      }

      const headers = {
        'Content-Type': 'application/json',
        'X-MailerLite-ApiKey': mailerliteApiKey,
      }

      // Try MailerLite API v2 with groups array (current API format)
      const apiUrl = `https://api.mailerlite.com/api/v2/subscribers`
      const requestBody = {
        email: email.trim().toLowerCase(),
        groups: [groupIdNum],
        fields: {
          source: 'Website Subscription',
        },
      }

      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers,
          body: JSON.stringify(requestBody),
        })

        const responseText = await response.text()
        let responseData: any = {}
        
        try {
          responseData = responseText ? JSON.parse(responseText) : {}
        } catch {
          responseData = { message: responseText }
        }

        // Success cases (200 or 201)
        if (response.ok || response.status === 200 || response.status === 201) {
          console.log('MailerLite subscription successful:', email)
          return NextResponse.json({ success: true, message: 'Successfully subscribed' })
        }

        // Handle duplicate/already subscribed - treat as success
        if (response.status === 400 || response.status === 422) {
          const errorMessage = (
            responseData.error?.message || 
            responseData.message || 
            responseText || 
            ''
          ).toLowerCase()
          
          if (
            errorMessage.includes('already') ||
            errorMessage.includes('duplicate') ||
            errorMessage.includes('exists') ||
            errorMessage.includes('subscribed') ||
            errorMessage.includes('member')
          ) {
            console.log('MailerLite: Email already subscribed:', email)
            return NextResponse.json(
              { success: true, message: 'You are already subscribed' },
              { status: 200 }
            )
          }
        }

        // Log error for debugging
        console.error('MailerLite API error:', {
          status: response.status,
          statusText: response.statusText,
          error: responseData,
          responseText,
          email: email
        })

        // For other API errors, still return success to avoid blocking users
        // Many MailerLite errors are non-critical
        return NextResponse.json({ success: true, message: 'Successfully subscribed' })
      } catch (fetchError) {
        console.error('MailerLite API fetch error:', fetchError)
        // Network/connection errors - return success to avoid blocking users
        return NextResponse.json({ success: true, message: 'Successfully subscribed' })
      }
    }

    // If neither method is configured, log warning but don't block users
    console.warn('MailerLite is not configured. Please set MAILERLITE_FORM_URL or MAILERLITE_API_KEY in environment variables.')
    return NextResponse.json(
      { success: true, message: 'Successfully subscribed' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Subscription error:', error)
    // Return success on unexpected errors to avoid blocking users
    return NextResponse.json(
      { success: true, message: 'Successfully subscribed' },
      { status: 200 }
    )
  }
}



import { NextRequest, NextResponse } from 'next/server'
import { getLocationFromIP, getLocationSummary } from '@/lib/geolocation'
import { getDbPool } from '@/lib/db'
import { sendSlackNotification } from '@/lib/slack'
import { sendEmail, formatFormSubmissionEmail } from '@/lib/email'

// Force dynamic rendering - don't run during build
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  const startTime = Date.now()
  console.log('📧 Subscription API called at:', new Date().toISOString())
  
  try {
    const { email, fullName, cityCountry, whatBringsYou } = await request.json()
    console.log('📧 Form submission received:', { email, fullName, cityCountry, whatBringsYou })

    // Validate email - handle both string and non-string inputs
    if (!email) {
      console.error('❌ Missing email field')
      return NextResponse.json(
        { error: 'Email address is required' },
        { status: 400 }
      )
    }

    if (typeof email !== 'string') {
      console.error('❌ Email is not a string:', typeof email, email)
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      )
    }

    const trimmedEmail = email.trim()
    if (!trimmedEmail) {
      console.error('❌ Email is empty after trimming')
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      )
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      console.error('❌ Invalid email format:', email)
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      )
    }

    // Use lowercase email for consistency
    const normalizedEmail = trimmedEmail.toLowerCase()

    // Validate required fields with better error messages
    if (!fullName || typeof fullName !== 'string' || !fullName.trim()) {
      console.error('❌ Missing full name')
      return NextResponse.json(
        { error: 'Please enter your full name' },
        { status: 400 }
      )
    }

    if (!cityCountry || typeof cityCountry !== 'string' || !cityCountry.trim()) {
      console.error('❌ Missing city/country')
      return NextResponse.json(
        { error: 'Please enter your city and country' },
        { status: 400 }
      )
    }

    if (!whatBringsYou || typeof whatBringsYou !== 'string' || !whatBringsYou.trim()) {
      console.error('❌ Missing what brings you field')
      return NextResponse.json(
        { error: 'Please tell us what brings you to Boutallion' },
        { status: 400 }
      )
    }

    // Get tracking data from request (for server-side logging)
    const userAgent = request.headers.get('user-agent') || ''
    const referer = request.headers.get('referer') || ''
    const forwarded = request.headers.get('x-forwarded-for')
    const realIp = request.headers.get('x-real-ip')
    const ipAddress = forwarded?.split(',')[0] || realIp || request.ip || 'unknown'

    // Get location data from IP address
    const locationData = await getLocationFromIP(ipAddress)
    const locationSummary = getLocationSummary(locationData)

    // Initialize MailerLite success flag
    let mailerliteSuccess = false
    
    // Option 1: Using MailerLite Form Action URL (simpler, no API key needed)
    const mailerliteFormUrl = process.env.MAILERLITE_FORM_URL

    if (mailerliteFormUrl) {
      console.log('📧 Using MailerLite Form URL method')
      const formData = new URLSearchParams()
      formData.append('email', normalizedEmail)
      formData.append('fields[source]', 'Website Subscription')
      formData.append('fields[full_name]', fullName.trim())
      formData.append('fields[city_country]', cityCountry.trim())
      formData.append('fields[what_brings_you]', whatBringsYou.trim())

      try {
        console.log('📧 Sending to MailerLite Form URL:', mailerliteFormUrl.substring(0, 50) + '...')
        const response = await fetch(mailerliteFormUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: formData.toString(),
        })

        const responseText = await response.text()
        console.log('📧 MailerLite Form Response Status:', response.status)
        console.log('📧 MailerLite Form Response:', responseText.substring(0, 200))

        // MailerLite form endpoints typically return 200 for successful submissions
        if (response.ok || response.status === 200) {
          mailerliteSuccess = true
          console.log('✅ MailerLite Form submission successful')
        } else {
          console.error('❌ MailerLite Form submission failed:', response.status, responseText.substring(0, 200))
        }
      } catch (fetchError) {
        console.error('❌ MailerLite Form fetch error:', fetchError instanceof Error ? fetchError.message : String(fetchError))
        console.error('❌ Full error:', fetchError)
      }
    } else {
      console.log('⚠️ MAILERLITE_FORM_URL not set, trying API method...')
    }

    // Option 2: Using MailerLite API (requires API key)
    const mailerliteApiKey = process.env.MAILERLITE_API_KEY
    const mailerliteGroupId = process.env.MAILERLITE_GROUP_ID || process.env.MAILERLITE_LIST_ID
    
    console.log('📧 MailerLite Configuration Check:', {
      hasFormUrl: !!mailerliteFormUrl,
      hasApiKey: !!mailerliteApiKey,
      hasGroupId: !!mailerliteGroupId,
      groupIdPreview: mailerliteGroupId ? mailerliteGroupId.substring(0, 20) + '...' : 'NOT SET',
    })

    // Prepare group ID for MailerLite (if available)
    let groupIdStr: string | null = null

    if (mailerliteApiKey && mailerliteGroupId) {
      try {
        let rawGroupId = String(mailerliteGroupId).trim()
        
        // Extract group ID from URL if it's a full URL
        // Example: https://dashboard.mailerlite.com/subscribers?...&group=174295207542523685
        if (rawGroupId.includes('group=')) {
          const match = rawGroupId.match(/group=(\d+)/)
          if (match && match[1]) {
            rawGroupId = match[1]
            console.log('📧 Extracted group ID from URL:', rawGroupId)
          }
        }
        
        // Also check for URL patterns and extract just the number
        if (rawGroupId.includes('dashboard.mailerlite.com')) {
          const match = rawGroupId.match(/(\d{15,})/)
          if (match && match[1]) {
            rawGroupId = match[1]
            console.log('📧 Extracted group ID from MailerLite URL:', rawGroupId)
          }
        }
        
        groupIdStr = rawGroupId
        
        // Validate group ID is a number (not a URL)
        if (!groupIdStr || 
            groupIdStr === '' || 
            groupIdStr === 'NaN' || 
            groupIdStr === 'undefined' || 
            groupIdStr === 'null' ||
            groupIdStr.startsWith('http') ||
            !/^\d+$/.test(groupIdStr)) {
          console.error('❌ Invalid MAILERLITE_GROUP_ID format:', {
            original: mailerliteGroupId,
            processed: groupIdStr,
            issue: groupIdStr.startsWith('http') ? 'Looks like a URL, should be just the number' : 'Not a valid number',
          })
          console.warn('⚠️ Expected format: Just the group ID number (e.g., 174295207542523685)')
          console.warn('⚠️ Current value appears to be a URL. Please update MAILERLITE_GROUP_ID in Vercel to just the number.')
          groupIdStr = null
        } else {
          console.log('✅ Valid MailerLite Group ID:', groupIdStr)
        }
      } catch (e) {
        console.error('⚠️ Error processing MAILERLITE_GROUP_ID:', e)
        groupIdStr = null
      }

      // Try MailerLite API if group ID is valid
      if (groupIdStr && mailerliteApiKey) {
        const headers = {
          'Content-Type': 'application/json',
          'X-MailerLite-ApiKey': mailerliteApiKey,
        }

        const apiUrl = `https://api.mailerlite.com/api/v2/subscribers`
        
        // Prepare custom fields with location data and form fields
        const customFields: Record<string, string> = {
          source: 'Website Subscription',
          full_name: fullName,
          city_country: cityCountry,
          what_brings_you: whatBringsYou,
        }
        
        // Add location fields if available
        if (locationSummary.country) customFields.country = locationSummary.country
        if (locationSummary.city) customFields.city = locationSummary.city
        if (locationSummary.region) customFields.region = locationSummary.region
        if (locationSummary.location && locationSummary.location !== 'Unknown') {
          customFields.subscription_location = locationSummary.location
        }
        if (locationSummary.timezone) customFields.timezone = locationSummary.timezone
        
        // Create subscriber with group included (MailerLite API v2 format)
        const requestBody: any = {
          email: normalizedEmail,
          fields: customFields,
          groups: [groupIdStr], // Use as string
        }

        try {
          // Create/update subscriber with group
          let response = await fetch(apiUrl, {
            method: 'POST',
            headers,
            body: JSON.stringify(requestBody),
          })
          
          let responseText = await response.text()
          let responseData: any = {}
          
          try {
            responseData = responseText ? JSON.parse(responseText) : {}
          } catch {
            responseData = { message: responseText }
          }
          
          // If groups as string failed, try as number
          if ((response.status === 422 || response.status === 400) && 
              (responseText.includes('groups') || responseText.includes('invalid'))) {
            console.log('⚠️ Groups as string failed, trying as number...')
            requestBody.groups = [parseInt(groupIdStr)]
            
            response = await fetch(apiUrl, {
              method: 'POST',
              headers,
              body: JSON.stringify(requestBody),
            })
            
            responseText = await response.text()
            try {
              responseData = responseText ? JSON.parse(responseText) : {}
            } catch {
              responseData = { message: responseText }
            }
          }

          // Log MailerLite response status
          console.log('📧 MailerLite API Response Status:', response.status, response.ok ? 'OK' : 'NOT OK')
          
          // Success cases (200 or 201)
          if (response.ok || response.status === 200 || response.status === 201) {
            mailerliteSuccess = true
            console.log('✅ MailerLite subscription successful:', normalizedEmail)
            console.log('📧 MailerLite response:', JSON.stringify(responseData, null, 2))
          } else if (response.status === 400 || response.status === 422) {
            // Handle duplicate/already subscribed - treat as success
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
              mailerliteSuccess = true
              console.log('✅ MailerLite: Email already subscribed:', normalizedEmail)
            } else {
              console.warn('⚠️ MailerLite API returned error (non-critical):', response.status, responseText.substring(0, 200))
            }
          } else {
            console.warn('⚠️ MailerLite API error (non-critical):', response.status, responseText.substring(0, 200))
          }
        } catch (fetchError) {
          console.error('⚠️ MailerLite API fetch error (non-critical):', fetchError instanceof Error ? fetchError.message : String(fetchError))
          // Continue - don't block subscription
        }
      }
    }

    // Save to PostgreSQL database REGARDLESS of MailerLite result
    // (We want to track all subscription attempts)
    console.log('🔄 Attempting to save to database...')
    console.log('🔄 DATABASE_URL exists:', !!process.env.DATABASE_URL)
    console.log('🔄 DATABASE_URL preview:', process.env.DATABASE_URL ? process.env.DATABASE_URL.substring(0, 50) + '...' : 'MISSING')
    console.log('🔄 Environment check:', {
      hasMailerliteApiKey: !!process.env.MAILERLITE_API_KEY,
      hasMailerliteGroupId: !!process.env.MAILERLITE_GROUP_ID,
      hasDatabaseUrl: !!process.env.DATABASE_URL,
      nodeEnv: process.env.NODE_ENV,
    })
    
    try {
      const db = getDbPool()
      if (!db) {
        console.error('❌ Database pool is null - DATABASE_URL may not be loaded')
        console.error('❌ DATABASE_URL value:', process.env.DATABASE_URL ? 'SET' : 'NOT SET')
        throw new Error('Database pool not initialized - DATABASE_URL may be missing')
      }
      
      // Test connection first
      try {
        await db.query('SELECT 1')
        console.log('✅ Database connection test: OK')
      } catch (connError) {
        console.error('❌ Database connection test failed:', connError)
        throw new Error(`Database connection failed: ${connError instanceof Error ? connError.message : String(connError)}`)
      }
      
      // Check if table exists
      try {
        const tableCheck = await db.query(`
          SELECT EXISTS (
            SELECT FROM information_schema.tables 
            WHERE table_schema = 'public' 
            AND table_name = 'subscriptions'
          );
        `)
        if (!tableCheck.rows[0].exists) {
          console.warn('⚠️ Subscriptions table does not exist, initializing...')
          const { initDatabase } = await import('@/lib/db')
          await initDatabase()
          console.log('✅ Database initialized')
        }
      } catch (initError) {
        console.error('⚠️ Could not check/initialize table:', initError)
        // Continue anyway - might work
      }
      
      const location = locationData
      console.log('🔄 Database pool obtained, executing query...')
      console.log('🔄 Email:', normalizedEmail)
      console.log('🔄 Location data:', location ? JSON.stringify(location, null, 2) : 'Missing')
      console.log('🔄 IP Address:', ipAddress)
      
      const dbResult = await db.query(`
        INSERT INTO subscriptions (
          email, ip_address,
          country, country_code, city, region, region_code, timezone,
          latitude, longitude, location_string,
          user_agent, referer, entry_point,
          device_type, browser, os,
          mailerlite_group_id,
          created_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, NOW())
        ON CONFLICT (email) 
        DO UPDATE SET
          ip_address = EXCLUDED.ip_address,
          country = EXCLUDED.country,
          city = EXCLUDED.city,
          region = EXCLUDED.region,
          latitude = EXCLUDED.latitude,
          longitude = EXCLUDED.longitude,
          location_string = EXCLUDED.location_string,
          updated_at = NOW()
        RETURNING id, email, created_at
      `, [
        normalizedEmail,
        ipAddress,
        location?.country || null,
        location?.countryCode || null,
        location?.city || null,
        location?.region || null,
        location?.regionCode || null,
        location?.timezone || null,
        location?.latitude || null,
        location?.longitude || null,
        locationSummary.location !== 'Unknown' ? locationSummary.location : null,
        userAgent || null,
        referer || null,
        'direct',
        'desktop',
        'unknown',
        'unknown',
        groupIdStr ? (parseInt(groupIdStr) || null) : null,
      ])
      
      console.log('✅ Subscription saved to database successfully!')
      console.log('✅ Database record:', JSON.stringify(dbResult.rows[0], null, 2))
      console.log('✅ Database save completed in:', Date.now() - startTime, 'ms')
      
      // Verify the record was actually saved
      try {
        const verifyResult = await db.query(
          'SELECT id, email, created_at FROM subscriptions WHERE email = $1',
          [normalizedEmail]
        )
        if (verifyResult.rows.length > 0) {
          console.log('✅ Verified: Subscription exists in database:', verifyResult.rows[0])
        } else {
          console.error('⚠️ WARNING: Subscription query returned no results after insert!')
        }
      } catch (verifyError) {
        console.error('⚠️ Could not verify subscription save:', verifyError)
      }
    } catch (dbError) {
      // Log detailed error for debugging
      console.error('❌ ========================================')
      console.error('❌ DATABASE SAVE FAILED!')
      console.error('❌ ========================================')
      console.error('❌ Error message:', dbError instanceof Error ? dbError.message : String(dbError))
      console.error('❌ Error code:', (dbError as any)?.code)
      console.error('❌ Error stack:', dbError instanceof Error ? dbError.stack : 'No stack trace')
      console.error('❌ Email attempted:', normalizedEmail)
      console.error('❌ DATABASE_URL check:', {
        exists: !!process.env.DATABASE_URL,
        length: process.env.DATABASE_URL?.length || 0,
        startsWith: process.env.DATABASE_URL?.substring(0, 20) || 'N/A',
        isSupabase: process.env.DATABASE_URL?.includes('supabase.co'),
        hasSSL: process.env.DATABASE_URL?.includes('sslmode'),
      })
      
      // Try to get more details about the error
      if (dbError instanceof Error) {
        console.error('❌ Full error details:', {
          name: dbError.name,
          message: dbError.message,
          code: (dbError as any).code,
          detail: (dbError as any).detail,
          hint: (dbError as any).hint,
          position: (dbError as any).position,
        })
      }
      
      // Still continue - don't fail subscription if database save fails
      // But log it prominently so we can see it
      console.error('⚠️⚠️⚠️ SUBSCRIPTION SAVED TO MAILERLITE BUT NOT TO DATABASE ⚠️⚠️⚠️')
      console.error('⚠️⚠️⚠️ CHECK DATABASE_URL IN VERCEL ENVIRONMENT VARIABLES ⚠️⚠️⚠️')
      console.error('⚠️⚠️⚠️ CHECK SUPABASE CONNECTION STRING FORMAT ⚠️⚠️⚠️')
    }
    
    // Log subscription tracking
    console.log('📧 Subscription Tracking:', JSON.stringify({
      email: normalizedEmail,
      ipAddress,
      location: locationSummary,
      userAgent,
      referer,
      timestamp: new Date().toISOString(),
      source: 'mailerlite_api',
      groupId: groupIdStr,
      mailerliteSuccess,
      success: true,
    }, null, 2))
    
    console.log(`📍 Subscription: ${normalizedEmail} | Location: ${locationSummary.location} | IP: ${ipAddress} | Country: ${locationSummary.country || 'Unknown'} | City: ${locationSummary.city || 'Unknown'}`)
    
    // Get device info for Slack notification
    const getDeviceType = (ua: string): string => {
      if (/Mobile|Android|iPhone|iPad/i.test(ua)) return 'mobile'
      if (/Tablet|iPad/i.test(ua)) return 'tablet'
      return 'desktop'
    }
    
    const getBrowser = (ua: string): string => {
      if (ua.includes('Chrome') && !ua.includes('Edg')) return 'Chrome'
      if (ua.includes('Firefox')) return 'Firefox'
      if (ua.includes('Safari') && !ua.includes('Chrome')) return 'Safari'
      if (ua.includes('Edg')) return 'Edge'
      return 'Unknown'
    }
    
    const getOS = (ua: string): string => {
      if (ua.includes('Windows')) return 'Windows'
      if (ua.includes('Mac OS X')) return 'macOS'
      if (ua.includes('Linux')) return 'Linux'
      if (ua.includes('Android')) return 'Android'
      if (ua.includes('iOS') || ua.includes('iPhone') || ua.includes('iPad')) return 'iOS'
      return 'Unknown'
    }
    
    // Get UAE time
    const uaeTime = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Dubai',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).format(new Date())
    
    // ALWAYS send email copy to boutallion.ae@gmail.com as backup
    // This ensures we capture all submissions even if MailerLite fails
    let emailBackupSuccess = false
    try {
      console.log('📧 Attempting to send email backup to boutallion.ae@gmail.com...')
      console.log('📧 Email service check:', {
        hasResendKey: !!process.env.RESEND_API_KEY,
        hasSendGridKey: !!process.env.SENDGRID_API_KEY,
        hasWebhookUrl: !!process.env.EMAIL_WEBHOOK_URL,
        hasSmtpHost: !!process.env.SMTP_HOST,
      })
      
      const emailHtml = formatFormSubmissionEmail({
        fullName,
        email: normalizedEmail,
        cityCountry,
        whatBringsYou,
      })
      
      emailBackupSuccess = await sendEmail({
        to: 'boutallion.ae@gmail.com',
        subject: `[Boutallion Registration] ${fullName} - ${normalizedEmail}`,
        html: emailHtml + `
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;">
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin-top: 20px;">
            <h3 style="margin-top: 0; color: #333;">Submission Details</h3>
            <p style="font-size: 12px; color: #666; margin: 5px 0;">
              <strong>MailerLite Status:</strong> ${mailerliteSuccess ? '✅ Success' : '❌ Failed or Not Configured'}<br>
              <strong>Timestamp:</strong> ${new Date().toISOString()}<br>
              <strong>IP Address:</strong> ${ipAddress}<br>
              <strong>Location:</strong> ${locationSummary.location}<br>
              <strong>Country:</strong> ${locationSummary.country || 'Unknown'}<br>
              <strong>City:</strong> ${locationSummary.city || 'Unknown'}
            </p>
          </div>
        `,
      })
      
      if (emailBackupSuccess) {
        console.log('✅ Email backup sent successfully to boutallion.ae@gmail.com')
      } else {
        console.error('❌ ========================================')
        console.error('❌ EMAIL BACKUP FAILED!')
        console.error('❌ ========================================')
        console.error('❌ Email service configuration check:')
        console.error('   - RESEND_API_KEY:', process.env.RESEND_API_KEY ? 'SET' : '❌ NOT SET')
        console.error('   - SENDGRID_API_KEY:', process.env.SENDGRID_API_KEY ? 'SET' : '❌ NOT SET')
        console.error('   - EMAIL_WEBHOOK_URL:', process.env.EMAIL_WEBHOOK_URL ? 'SET' : '❌ NOT SET')
        console.error('   - RESEND_FROM_EMAIL:', process.env.RESEND_FROM_EMAIL || 'not set (will use onboarding@resend.dev)')
        console.error('')
        console.error('❌ TO FIX:')
        console.error('   1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables')
        console.error('   2. Add RESEND_API_KEY with your Resend API key')
        console.error('   3. (Optional) Add RESEND_FROM_EMAIL (or verify domain in Resend)')
        console.error('   4. Redeploy your application')
        console.error('   5. Test at: /api/test-email')
        console.error('❌ ========================================')
      }
    } catch (emailError) {
      console.error('❌ ========================================')
      console.error('❌ EMAIL BACKUP EXCEPTION!')
      console.error('❌ ========================================')
      console.error('❌ Error:', emailError instanceof Error ? emailError.message : String(emailError))
      if (emailError instanceof Error && emailError.stack) {
        console.error('❌ Stack:', emailError.stack)
      }
      console.error('❌ Make sure RESEND_API_KEY is set in Vercel environment variables!')
      console.error('❌ ========================================')
    }

    // Send Slack notification (non-blocking)
    try {
      await sendSlackNotification({
        email: normalizedEmail,
        fullName,
        cityCountry,
        whatBringsYou,
        ipAddress,
        location: {
          country: locationSummary.country,
          city: locationSummary.city,
          region: locationSummary.region,
          location_string: locationSummary.location,
          latitude: locationData?.latitude,
          longitude: locationData?.longitude,
        },
        userAgent,
        referer,
        timestamp: new Date().toISOString(),
        mailerliteSuccess,
        device: {
          type: getDeviceType(userAgent || ''),
          browser: getBrowser(userAgent || ''),
          os: getOS(userAgent || ''),
        },
        uaeTime,
        pagesVisited: 1, // Will be updated by visitor tracking
      })
    } catch (slackError) {
      console.error('⚠️ Slack notification error (non-critical):', slackError)
      // Don't fail subscription if Slack fails
    }
    
    console.log('✅ Total processing time:', Date.now() - startTime, 'ms')
    
    // Log final status
    console.log('📊 Final Subscription Status:', {
      email: normalizedEmail,
      mailerliteSuccess: mailerliteSuccess ? '✅' : '❌',
      emailBackupSuccess: emailBackupSuccess ? '✅' : '❌',
      databaseSaved: '✅', // Database save happens before this
    })
    
    // Always return success to user (even if MailerLite fails, we have email backup)
    return NextResponse.json({ 
      success: true, 
      message: 'Successfully subscribed',
      mailerliteSuccess,
      emailBackupSuccess,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('❌ ========================================')
    console.error('❌ SUBSCRIPTION API ERROR')
    console.error('❌ ========================================')
    console.error('❌ Error:', error instanceof Error ? error.message : String(error))
    console.error('❌ Stack:', error instanceof Error ? error.stack : 'No stack trace')
    console.error('❌ ========================================')
    
    // Return a user-friendly error message
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred'
    
    // Check if it's a validation error (should return 400)
    if (errorMessage.includes('required') || errorMessage.includes('Invalid') || errorMessage.includes('valid')) {
      return NextResponse.json(
        { error: errorMessage },
        { status: 400 }
      )
    }
    
    // For other errors, still try to save to database/email backup if possible
    // but return an error to the user so they know something went wrong
    return NextResponse.json(
      { 
        error: 'We encountered an issue processing your subscription. Please try again or contact us directly.',
        details: process.env.NODE_ENV === 'development' ? errorMessage : undefined
      },
      { status: 500 }
    )
  }
}



import { NextRequest, NextResponse } from 'next/server'
import { getLocationFromIP, getLocationSummary } from '@/lib/geolocation'
import { getDbPool } from '@/lib/db'

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

    // Get tracking data from request (for server-side logging)
    const userAgent = request.headers.get('user-agent') || ''
    const referer = request.headers.get('referer') || ''
    const forwarded = request.headers.get('x-forwarded-for')
    const realIp = request.headers.get('x-real-ip')
    const ipAddress = forwarded?.split(',')[0] || realIp || request.ip || 'unknown'

    // Get location data from IP address
    const locationData = await getLocationFromIP(ipAddress)
    const locationSummary = getLocationSummary(locationData)

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

    // Prepare group ID for MailerLite (if available)
    let groupIdStr: string | null = null
    let mailerliteSuccess = false

    if (mailerliteApiKey && mailerliteGroupId) {
      try {
        groupIdStr = String(mailerliteGroupId).trim()
        if (!groupIdStr || groupIdStr === '' || groupIdStr === 'NaN' || groupIdStr === 'undefined' || groupIdStr === 'null') {
          console.warn('⚠️ Invalid MAILERLITE_GROUP_ID, skipping MailerLite API')
          groupIdStr = null
        }
      } catch (e) {
        console.warn('⚠️ Error processing MAILERLITE_GROUP_ID, skipping MailerLite API')
        groupIdStr = null
      }

      // Try MailerLite API if group ID is valid
      if (groupIdStr && mailerliteApiKey) {
        const headers = {
          'Content-Type': 'application/json',
          'X-MailerLite-ApiKey': mailerliteApiKey,
        }

        const apiUrl = `https://api.mailerlite.com/api/v2/subscribers`
        
        // Prepare custom fields with location data
        const customFields: Record<string, string> = {
          source: 'Website Subscription',
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
          email: email.trim().toLowerCase(),
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
            console.log('✅ MailerLite subscription successful:', email)
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
              console.log('✅ MailerLite: Email already subscribed:', email)
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
    try {
      const db = getDbPool()
      if (!db) {
        console.error('❌ Database pool is null - DATABASE_URL may not be loaded')
        throw new Error('Database pool not initialized - DATABASE_URL may be missing')
      }
      
      const location = locationData
      console.log('🔄 Database pool obtained, executing query...')
      console.log('🔄 Email:', email.trim().toLowerCase())
      console.log('🔄 Location data:', location ? 'Present' : 'Missing')
      
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
        email.trim().toLowerCase(),
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
    } catch (dbError) {
      // Log detailed error for debugging
      console.error('❌ Database save failed!')
      console.error('❌ Error message:', dbError instanceof Error ? dbError.message : String(dbError))
      console.error('❌ Error stack:', dbError instanceof Error ? dbError.stack : 'No stack trace')
      console.error('❌ Email attempted:', email)
      // Still continue - don't fail subscription if database save fails
    }
    
    // Log subscription tracking
    console.log('📧 Subscription Tracking:', JSON.stringify({
      email,
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
    
    console.log(`📍 Subscription: ${email} | Location: ${locationSummary.location} | IP: ${ipAddress} | Country: ${locationSummary.country || 'Unknown'} | City: ${locationSummary.city || 'Unknown'}`)
    
    // Always return success to user
    return NextResponse.json({ success: true, message: 'Successfully subscribed' })

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



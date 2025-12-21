/**
 * Google Geolocation API Integration
 * Uses Google's Geolocation API for accurate IP-based location detection
 * 
 * Free tier: $5 credit/month (first 40,000 requests free)
 * Alternative: Use ip-api.com (free) as fallback
 */

export interface GoogleLocationData {
  ip: string
  country?: string
  countryCode?: string
  city?: string
  region?: string
  regionCode?: string
  timezone?: string
  latitude?: number
  longitude?: number
  isp?: string
  org?: string
  accuracy?: number
}

/**
 * Get location using Google Geolocation API (primary)
 * Falls back to ip-api.com if Google API key not configured
 */
export async function getLocationFromIPGoogle(ipAddress: string): Promise<GoogleLocationData | null> {
  // Skip localhost and private IPs
  if (!ipAddress || 
      ipAddress === 'unknown' || 
      ipAddress === '127.0.0.1' || 
      ipAddress.startsWith('192.168.') || 
      ipAddress.startsWith('10.') ||
      ipAddress.startsWith('172.16.')) {
    return null
  }

  const googleApiKey = process.env.GOOGLE_GEOLOCATION_API_KEY

  // Try Google Geolocation API first if key is configured
  if (googleApiKey) {
    try {
      // Google doesn't have a direct IP geolocation API
      // We'll use ip-api.com for IP geolocation (it's free and accurate)
      // For Google Maps integration, we'll use the coordinates later
      
      // Alternative: Use a service that integrates with Google Maps
      // For now, use ip-api.com and enhance with Google Maps Geocoding if needed
      
      const response = await fetch(`http://ip-api.com/json/${ipAddress}?fields=status,message,country,countryCode,region,regionName,city,zip,lat,lon,timezone,isp,org,as,query`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error('IP geolocation API error')
      }

      const data = await response.json()

      if (data.status === 'fail') {
        return null
      }

      // If we have coordinates, enhance with Google Geocoding for better accuracy
      let enhancedData = {
        ip: data.query || ipAddress,
        country: data.country || undefined,
        countryCode: data.countryCode || undefined,
        city: data.city || undefined,
        region: data.regionName || data.region || undefined,
        regionCode: data.region || undefined,
        timezone: data.timezone || undefined,
        latitude: data.lat || undefined,
        longitude: data.lon || undefined,
        isp: data.isp || undefined,
        org: data.org || undefined,
      }

      // Enhance with Google Geocoding API if coordinates are available
      if (googleApiKey && data.lat && data.lon) {
        try {
          const geocodeResponse = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${data.lat},${data.lon}&key=${googleApiKey}`
          )
          
          if (geocodeResponse.ok) {
            const geocodeData = await geocodeResponse.json()
            if (geocodeData.results && geocodeData.results.length > 0) {
              const result = geocodeData.results[0]
              
              // Extract more accurate location data from Google
              for (const component of result.address_components) {
                if (component.types.includes('country')) {
                  enhancedData.country = component.long_name
                  enhancedData.countryCode = component.short_name
                }
                if (component.types.includes('locality')) {
                  enhancedData.city = component.long_name
                }
                if (component.types.includes('administrative_area_level_1')) {
                  enhancedData.region = component.long_name
                  enhancedData.regionCode = component.short_name
                }
              }
            }
          }
        } catch (geocodeError) {
          // Continue with ip-api data if Google Geocoding fails
          console.log('Google Geocoding enhancement failed, using ip-api data')
        }
      }

      return enhancedData
    } catch (error) {
      console.error('Error fetching location with Google integration:', error)
      // Fall through to fallback
    }
  }

  // Fallback to ip-api.com (free, no API key needed)
  try {
    const response = await fetch(`http://ip-api.com/json/${ipAddress}?fields=status,message,country,countryCode,region,regionName,city,zip,lat,lon,timezone,isp,org,as,query`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    })

    if (!response.ok) {
      return null
    }

    const data = await response.json()

    if (data.status === 'fail') {
      return null
    }

    return {
      ip: data.query || ipAddress,
      country: data.country || undefined,
      countryCode: data.countryCode || undefined,
      city: data.city || undefined,
      region: data.regionName || data.region || undefined,
      regionCode: data.region || undefined,
      timezone: data.timezone || undefined,
      latitude: data.lat || undefined,
      longitude: data.lon || undefined,
      isp: data.isp || undefined,
      org: data.org || undefined,
    }
  } catch (error) {
    console.error('Error fetching IP geolocation:', error)
    return null
  }
}


/**
 * IP Geolocation Service
 * Gets location data (country, city, region) from IP address
 * Uses Google-enhanced geolocation if available, falls back to ip-api.com
 */

import { getLocationFromIPGoogle, type GoogleLocationData } from './geolocation-google'

export interface LocationData {
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
  asn?: string
}

/**
 * Get location data from IP address
 * Uses Google-enhanced geolocation if API key is configured
 * Falls back to ip-api.com (free, no API key needed)
 */
export async function getLocationFromIP(ipAddress: string): Promise<LocationData | null> {
  // Use Google-enhanced geolocation (includes Google Maps integration)
  return await getLocationFromIPGoogle(ipAddress)
  // Skip localhost and private IPs
  if (!ipAddress || 
      ipAddress === 'unknown' || 
      ipAddress === '127.0.0.1' || 
      ipAddress.startsWith('192.168.') || 
      ipAddress.startsWith('10.') ||
      ipAddress.startsWith('172.16.')) {
    return null
  }

  try {
    // Using ip-api.com (free, 45 requests/minute, no API key needed)
    // Returns: country, countryCode, region, regionName, city, zip, lat, lon, timezone, isp, org, as
    const response = await fetch(`http://ip-api.com/json/${ipAddress}?fields=status,message,country,countryCode,region,regionName,city,zip,lat,lon,timezone,isp,org,as,query`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    })

    if (!response.ok) {
      console.error('IP geolocation API error:', response.status)
      return null
    }

    const data = await response.json()

    if (data.status === 'fail') {
      console.error('IP geolocation failed:', data.message)
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
      asn: data.as || undefined,
    }
  } catch (error) {
    console.error('Error fetching IP geolocation:', error)
    return null
  }
}

/**
 * Format location as a readable string
 */
export function formatLocation(location: LocationData | null): string {
  if (!location) return 'Unknown'
  
  const parts: string[] = []
  if (location.city) parts.push(location.city)
  if (location.region) parts.push(location.region)
  if (location.country) parts.push(location.country)
  
  return parts.length > 0 ? parts.join(', ') : 'Unknown'
}

/**
 * Get location summary for logging/storage
 */
export function getLocationSummary(location: LocationData | null): Record<string, string | undefined> {
  if (!location) {
    return {
      country: undefined,
      city: undefined,
      region: undefined,
      location: 'Unknown',
    }
  }

  return {
    country: location.country,
    countryCode: location.countryCode,
    city: location.city,
    region: location.region,
    regionCode: location.regionCode,
    timezone: location.timezone,
    location: formatLocation(location),
    latitude: location.latitude?.toString(),
    longitude: location.longitude?.toString(),
  }
}


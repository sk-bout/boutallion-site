/**
 * Enhanced Visitor Tracking System
 * Tracks: IP, location, device, UAE time, visitor count, pages visited
 * Uses free IP geolocation services
 */

export interface VisitorData {
  sessionId: string
  ipAddress: string
  location?: {
    country?: string
    countryCode?: string
    city?: string
    region?: string
    latitude?: number
    longitude?: number
    timezone?: string
  }
  device: {
    type: 'desktop' | 'mobile' | 'tablet'
    browser: string
    os: string
    screenResolution: string
  }
  uaeTime: string // Local time in UAE
  pagesVisited: string[]
  visitCount: number
  firstVisit: string
  lastVisit: string
  userAgent: string
  referer?: string
}

/**
 * Get accurate IP geolocation using multiple free services
 * Tries multiple services for best accuracy
 */
export async function getAccurateLocation(ipAddress: string): Promise<VisitorData['location'] | null> {
  if (!ipAddress || ipAddress === 'unknown' || ipAddress === '127.0.0.1') {
    return null
  }

  // Service 1: ip-api.com (free, 45 req/min, no API key)
  try {
    const response = await fetch(`http://ip-api.com/json/${ipAddress}?fields=status,message,country,countryCode,region,regionName,city,zip,lat,lon,timezone,isp,org,as,query`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
    })

    if (response.ok) {
      const data = await response.json()
      if (data.status === 'success') {
        return {
          country: data.country,
          countryCode: data.countryCode,
          city: data.city,
          region: data.regionName || data.region,
          latitude: data.lat,
          longitude: data.lon,
          timezone: data.timezone,
        }
      }
    }
  } catch (error) {
    console.log('ip-api.com failed, trying alternative...')
  }

  // Service 2: ipapi.co (free tier: 1000 req/day, no API key)
  try {
    const response = await fetch(`https://ipapi.co/${ipAddress}/json/`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
    })

    if (response.ok) {
      const data = await response.json()
      if (!data.error) {
        return {
          country: data.country_name,
          countryCode: data.country_code,
          city: data.city,
          region: data.region,
          latitude: data.latitude,
          longitude: data.longitude,
          timezone: data.timezone,
        }
      }
    }
  } catch (error) {
    console.log('ipapi.co failed, trying alternative...')
  }

  // Service 3: ip-api.io (free, 1000 req/month)
  try {
    const response = await fetch(`https://ip-api.io/json/${ipAddress}`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
    })

    if (response.ok) {
      const data = await response.json()
      if (data.status === 'success') {
        return {
          country: data.country_name,
          countryCode: data.country_code,
          city: data.city,
          region: data.region_name,
          latitude: data.latitude,
          longitude: data.longitude,
          timezone: data.time_zone?.name,
        }
      }
    }
  } catch (error) {
    console.log('ip-api.io failed')
  }

  return null
}

/**
 * Get device information from user agent
 */
export function getDeviceInfo(userAgent: string): VisitorData['device'] {
  if (typeof window === 'undefined') {
    // Server-side fallback
    const isMobile = /Mobile|Android|iPhone|iPad/i.test(userAgent)
    const isTablet = /Tablet|iPad/i.test(userAgent)
    
    return {
      type: isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop',
      browser: 'unknown',
      os: 'unknown',
      screenResolution: 'unknown',
    }
  }

  // Client-side detection
  const width = window.innerWidth
  let deviceType: 'desktop' | 'mobile' | 'tablet' = 'desktop'
  if (width < 768) deviceType = 'mobile'
  else if (width < 1024) deviceType = 'tablet'

  // Browser detection
  let browser = 'unknown'
  if (userAgent.includes('Chrome') && !userAgent.includes('Edg')) browser = 'Chrome'
  else if (userAgent.includes('Firefox')) browser = 'Firefox'
  else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) browser = 'Safari'
  else if (userAgent.includes('Edg')) browser = 'Edge'
  else if (userAgent.includes('Opera')) browser = 'Opera'

  // OS detection
  let os = 'unknown'
  if (userAgent.includes('Windows')) os = 'Windows'
  else if (userAgent.includes('Mac OS X')) os = 'macOS'
  else if (userAgent.includes('Linux')) os = 'Linux'
  else if (userAgent.includes('Android')) os = 'Android'
  else if (userAgent.includes('iOS') || userAgent.includes('iPhone') || userAgent.includes('iPad')) os = 'iOS'

  return {
    type: deviceType,
    browser,
    os,
    screenResolution: `${window.screen.width}x${window.screen.height}`,
  }
}

/**
 * Convert timestamp to UAE time (Asia/Dubai)
 */
export function getUAETime(timestamp?: number): string {
  const date = timestamp ? new Date(timestamp) : new Date()
  return new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Dubai',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(date)
}

/**
 * Get Google Maps URL for location
 */
export function getMapUrl(latitude?: number, longitude?: number): string | null {
  if (!latitude || !longitude) return null
  return `https://www.google.com/maps?q=${latitude},${longitude}&z=10`
}


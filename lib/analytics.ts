/**
 * Comprehensive Analytics Tracking System
 * Tracks: subscriptions, user behavior, session data, referrers, IP, sharing, exit behavior
 */

export interface TrackingData {
  // User identification
  email?: string
  sessionId: string
  userId?: string
  
  // Session data
  timestamp: number
  pageUrl: string
  referrer: string
  userAgent: string
  language: string
  timezone: string
  screenResolution: string
  viewportSize: string
  
  // Location data (from IP)
  ipAddress?: string
  country?: string
  city?: string
  region?: string
  
  // Behavior data
  timeOnSite?: number
  pagesViewed?: number
  scrollDepth?: number
  clickEvents?: number
  
  // Event specific
  eventType: 'page_view' | 'subscription' | 'share' | 'exit' | 'click' | 'scroll' | 'session_start' | 'session_end'
  eventData?: Record<string, any>
  
  // Device & Browser
  deviceType: 'desktop' | 'mobile' | 'tablet'
  browser: string
  os: string
  
  // Entry point
  entryPoint: 'direct' | 'search' | 'social' | 'referral' | 'email' | 'other'
  searchQuery?: string
  campaignSource?: string
  campaignMedium?: string
  campaignName?: string
}

class AnalyticsTracker {
  private sessionId: string
  private sessionStartTime: number
  private pageViewCount: number = 0
  private clickCount: number = 0
  private maxScrollDepth: number = 0
  private lastActivityTime: number
  private trackingEndpoint: string = '/api/track'

  constructor() {
    this.sessionId = this.generateSessionId()
    this.sessionStartTime = Date.now()
    this.lastActivityTime = Date.now()
    this.pageViewCount = 1
    
    // Track session start
    this.trackEvent('session_start', {})
    
    // Track page view
    this.trackPageView()
    
    // Set up activity tracking
    this.setupActivityTracking()
    
    // Track exit intent
    this.setupExitTracking()
    
    // Track scroll depth
    this.setupScrollTracking()
    
    // Track clicks
    this.setupClickTracking()
    
    // Track sharing
    this.setupShareTracking()
  }

  private generateSessionId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  }

  private getDeviceType(): 'desktop' | 'mobile' | 'tablet' {
    if (typeof window === 'undefined') return 'desktop'
    const width = window.innerWidth
    if (width < 768) return 'mobile'
    if (width < 1024) return 'tablet'
    return 'desktop'
  }

  private getBrowserInfo(): { browser: string; os: string } {
    if (typeof window === 'undefined') return { browser: 'unknown', os: 'unknown' }
    
    const ua = navigator.userAgent
    let browser = 'unknown'
    let os = 'unknown'

    // Browser detection
    if (ua.includes('Chrome') && !ua.includes('Edg')) browser = 'Chrome'
    else if (ua.includes('Firefox')) browser = 'Firefox'
    else if (ua.includes('Safari') && !ua.includes('Chrome')) browser = 'Safari'
    else if (ua.includes('Edg')) browser = 'Edge'
    else if (ua.includes('Opera') || ua.includes('OPR')) browser = 'Opera'

    // OS detection
    if (ua.includes('Windows')) os = 'Windows'
    else if (ua.includes('Mac')) os = 'macOS'
    else if (ua.includes('Linux')) os = 'Linux'
    else if (ua.includes('Android')) os = 'Android'
    else if (ua.includes('iOS') || ua.includes('iPhone') || ua.includes('iPad')) os = 'iOS'

    return { browser, os }
  }

  private getEntryPoint(): {
    entryPoint: 'direct' | 'search' | 'social' | 'referral' | 'email' | 'other'
    searchQuery?: string
    campaignSource?: string
    campaignMedium?: string
    campaignName?: string
  } {
    if (typeof window === 'undefined') {
      return { entryPoint: 'direct' }
    }

    const referrer = document.referrer
    const urlParams = new URLSearchParams(window.location.search)
    
    // Check URL parameters first (UTM parameters)
    const utmSource = urlParams.get('utm_source')
    const utmMedium = urlParams.get('utm_medium')
    const utmCampaign = urlParams.get('utm_campaign')
    const utmTerm = urlParams.get('utm_term')
    
    if (utmSource) {
      return {
        entryPoint: 'other',
        campaignSource: utmSource,
        campaignMedium: utmMedium || undefined,
        campaignName: utmCampaign || undefined,
        searchQuery: utmTerm || undefined,
      }
    }

    // Check referrer
    if (!referrer || referrer === window.location.href) {
      return { entryPoint: 'direct' }
    }

    try {
      const referrerUrl = new URL(referrer)
      const hostname = referrerUrl.hostname.toLowerCase()

      // Search engines
      const searchEngines = ['google', 'bing', 'yahoo', 'duckduckgo', 'yandex', 'baidu']
      if (searchEngines.some(se => hostname.includes(se))) {
        const query = referrerUrl.searchParams.get('q') || referrerUrl.searchParams.get('query') || referrerUrl.searchParams.get('text')
        return {
          entryPoint: 'search',
          searchQuery: query || undefined,
        }
      }

      // Social media
      const socialNetworks = ['facebook', 'twitter', 'instagram', 'linkedin', 'pinterest', 'reddit', 'tiktok', 'youtube']
      if (socialNetworks.some(sn => hostname.includes(sn))) {
        return { entryPoint: 'social' }
      }

      // Email
      if (hostname.includes('mail') || hostname.includes('email')) {
        return { entryPoint: 'email' }
      }

      return { entryPoint: 'referral' }
    } catch {
      return { entryPoint: 'other' }
    }
  }

  private async collectTrackingData(eventType: TrackingData['eventType'], eventData?: Record<string, any>): Promise<TrackingData> {
    const now = Date.now()
    const timeOnSite = Math.floor((now - this.sessionStartTime) / 1000)
    const { browser, os } = this.getBrowserInfo()
    const entryPointData = this.getEntryPoint()

    return {
      sessionId: this.sessionId,
      timestamp: now,
      pageUrl: typeof window !== 'undefined' ? window.location.href : '',
      referrer: typeof document !== 'undefined' ? document.referrer : '',
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
      language: typeof navigator !== 'undefined' ? navigator.language : '',
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      screenResolution: typeof screen !== 'undefined' ? `${screen.width}x${screen.height}` : '',
      viewportSize: typeof window !== 'undefined' ? `${window.innerWidth}x${window.innerHeight}` : '',
      timeOnSite,
      pagesViewed: this.pageViewCount,
      scrollDepth: this.maxScrollDepth,
      clickEvents: this.clickCount,
      eventType,
      eventData,
      deviceType: this.getDeviceType(),
      browser,
      os,
      ...entryPointData,
      ...(eventData?.email && { email: eventData.email }),
    }
  }

  private async sendTrackingData(data: TrackingData): Promise<void> {
    try {
      // Send to our tracking API (server-side, includes IP)
      await fetch(this.trackingEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        keepalive: true, // Ensure request completes even if page unloads
      })

      // Also send to Google Analytics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        const gtag = (window as any).gtag
        
        // Map our event to GA4 event
        const gaEventName = this.mapToGAEvent(data.eventType)
        gtag('event', gaEventName, {
          event_category: 'engagement',
          event_label: data.eventType,
          value: data.timeOnSite,
          custom_parameters: {
            session_id: data.sessionId,
            pages_viewed: data.pagesViewed,
            scroll_depth: data.scrollDepth,
            device_type: data.deviceType,
            entry_point: data.entryPoint,
            ...(data.email && { email: data.email }),
            ...(data.searchQuery && { search_query: data.searchQuery }),
          },
        })
      }
    } catch (error) {
      // Silently fail - don't interrupt user experience
      console.error('Analytics tracking error:', error)
    }
  }

  private mapToGAEvent(eventType: TrackingData['eventType']): string {
    const mapping: Record<TrackingData['eventType'], string> = {
      page_view: 'page_view',
      subscription: 'generate_lead',
      share: 'share',
      exit: 'page_exit',
      click: 'click',
      scroll: 'scroll',
      session_start: 'session_start',
      session_end: 'session_end',
    }
    return mapping[eventType] || 'custom_event'
  }

  private setupActivityTracking(): void {
    if (typeof window === 'undefined') return

    const updateActivity = () => {
      this.lastActivityTime = Date.now()
    }

    // Track various user activities
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click']
    events.forEach(event => {
      window.addEventListener(event, updateActivity, { passive: true })
    })
  }

  private setupExitTracking(): void {
    if (typeof window === 'undefined') return

    // Track exit intent (mouse leaving viewport)
    document.addEventListener('mouseleave', (e) => {
      if (e.clientY <= 0) {
        this.trackEvent('exit', {
          exitType: 'mouse_leave',
          timeOnPage: Math.floor((Date.now() - this.lastActivityTime) / 1000),
        })
      }
    }, { passive: true })

    // Track before unload
    window.addEventListener('beforeunload', () => {
      const timeOnSite = Math.floor((Date.now() - this.sessionStartTime) / 1000)
      this.trackEvent('session_end', {
        timeOnSite,
        pagesViewed: this.pageViewCount,
        finalScrollDepth: this.maxScrollDepth,
      })
      
      // Use sendBeacon for reliable tracking on page unload
      const data = {
        sessionId: this.sessionId,
        eventType: 'session_end',
        timeOnSite,
        pagesViewed: this.pageViewCount,
      }
      navigator.sendBeacon(this.trackingEndpoint, JSON.stringify(data))
    })
  }

  private setupScrollTracking(): void {
    if (typeof window === 'undefined') return

    let lastScrollDepth = 0
    const scrollThresholds = [25, 50, 75, 90, 100]

    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0

      if (scrollPercent > this.maxScrollDepth) {
        this.maxScrollDepth = scrollPercent

        // Track milestone scroll depths
        scrollThresholds.forEach(threshold => {
          if (scrollPercent >= threshold && lastScrollDepth < threshold) {
            this.trackEvent('scroll', {
              scrollDepth: threshold,
            })
          }
        })

        lastScrollDepth = scrollPercent
      }
    }, { passive: true })
  }

  private setupClickTracking(): void {
    if (typeof window === 'undefined') return

    document.addEventListener('click', (e) => {
      this.clickCount++
      
      const target = e.target as HTMLElement
      const linkText = target.textContent?.trim().substring(0, 50)
      const linkUrl = (target as HTMLAnchorElement)?.href
      
      this.trackEvent('click', {
        element: target.tagName,
        linkText,
        linkUrl,
      })
    }, { passive: true })
  }

  private setupShareTracking(): void {
    if (typeof window === 'undefined') return

    // Track native share API
    if (navigator.share) {
      // This will be called when user uses native share
      const originalShare = navigator.share.bind(navigator)
      navigator.share = async (data: ShareData) => {
        this.trackEvent('share', {
          shareMethod: 'native',
          shareTitle: data.title,
          shareUrl: data.url,
        })
        return originalShare(data)
      }
    }

    // Track social sharing buttons (if you add them)
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement
      const shareButton = target.closest('[data-share]')
      
      if (shareButton) {
        const shareMethod = shareButton.getAttribute('data-share')
        this.trackEvent('share', {
          shareMethod,
          shareUrl: window.location.href,
        })
      }
    }, { passive: true })
  }

  public async trackPageView(): Promise<void> {
    this.pageViewCount++
    const data = await this.collectTrackingData('page_view', {
      pageTitle: typeof document !== 'undefined' ? document.title : '',
    })
    await this.sendTrackingData(data)
  }

  public async trackSubscription(email: string, additionalData?: Record<string, any>): Promise<void> {
    const data = await this.collectTrackingData('subscription', {
      email,
      timeToSubscribe: Math.floor((Date.now() - this.sessionStartTime) / 1000),
      pagesViewedBeforeSubscribe: this.pageViewCount,
      scrollDepthBeforeSubscribe: this.maxScrollDepth,
      ...additionalData,
    })
    await this.sendTrackingData(data)
  }

  public async trackEvent(eventType: TrackingData['eventType'], eventData?: Record<string, any>): Promise<void> {
    const data = await this.collectTrackingData(eventType, eventData)
    await this.sendTrackingData(data)
  }

  public getSessionId(): string {
    return this.sessionId
  }
}

// Singleton instance
let trackerInstance: AnalyticsTracker | null = null

// Server-side mock tracker class
class ServerAnalyticsTracker {
  private sessionId: string = 'server-session'
  private sessionStartTime: number = Date.now()
  private pageViewCount: number = 0
  private clickCount: number = 0
  private maxScrollDepth: number = 0
  private lastActivityTime: number = Date.now()
  private trackingEndpoint: string = '/api/track'

  async trackPageView(): Promise<void> {}
  async trackSubscription(email: string, additionalData?: Record<string, any>): Promise<void> {}
  async trackEvent(eventType: TrackingData['eventType'], eventData?: Record<string, any>): Promise<void> {}
  getSessionId(): string { return this.sessionId }
}

export function getAnalyticsTracker(): AnalyticsTracker {
  if (typeof window === 'undefined') {
    // Server-side: return a mock tracker
    return new ServerAnalyticsTracker() as unknown as AnalyticsTracker
  }

  if (!trackerInstance) {
    trackerInstance = new AnalyticsTracker()
  }
  return trackerInstance
}


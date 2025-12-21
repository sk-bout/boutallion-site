'use client'

import { useEffect } from 'react'
import { getAnalyticsTracker } from '@/lib/analytics'

/**
 * Analytics Tracker Component
 * Initializes tracking on page load
 * Hidden and non-intrusive
 */
export default function AnalyticsTracker() {
  useEffect(() => {
    // Initialize analytics tracking
    const tracker = getAnalyticsTracker()
    
    // Track initial page view
    tracker.trackPageView()
    
    // Track route changes (for Next.js App Router)
    const handleRouteChange = () => {
      tracker.trackPageView()
    }
    
    // Listen for popstate (browser back/forward)
    window.addEventListener('popstate', handleRouteChange)
    
    return () => {
      window.removeEventListener('popstate', handleRouteChange)
    }
  }, [])

  // This component renders nothing - it's purely for tracking
  return null
}


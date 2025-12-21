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
    
    // Track initial page view with a small delay to ensure page is fully loaded
    const timeoutId = setTimeout(() => {
      tracker.trackPageView()
    }, 500)
    
    // Track route changes (for Next.js App Router)
    const handleRouteChange = () => {
      setTimeout(() => {
        tracker.trackPageView()
      }, 500)
    }
    
    // Listen for popstate (browser back/forward)
    window.addEventListener('popstate', handleRouteChange)
    
    // Also listen for Next.js route changes
    const handlePathChange = () => {
      setTimeout(() => {
        tracker.trackPageView()
      }, 500)
    }
    
    // Listen for pathname changes (Next.js App Router)
    if (typeof window !== 'undefined') {
      const originalPushState = history.pushState
      history.pushState = function(...args) {
        originalPushState.apply(history, args)
        handlePathChange()
      }
      
      const originalReplaceState = history.replaceState
      history.replaceState = function(...args) {
        originalReplaceState.apply(history, args)
        handlePathChange()
      }
    }
    
    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener('popstate', handleRouteChange)
    }
  }, [])

  // This component renders nothing - it's purely for tracking
  return null
}


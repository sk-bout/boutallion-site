'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function ViewTransition() {
  const pathname = usePathname()

  useEffect(() => {
    // Ensure View Transitions API is supported
    if (typeof document !== 'undefined' && 'startViewTransition' in document) {
      // View Transitions are handled at the navigation level
    }
  }, [pathname])

  return null
}


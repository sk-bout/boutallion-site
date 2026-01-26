'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'

interface NavigationItem {
  id: string
  label: string
  href: string
}

// Navigation items - can be expanded as pages are created
const NAVIGATION_ITEMS: NavigationItem[] = [
  { id: 'about', label: 'About', href: '/lab/corridor/about' },
  { id: 'materials', label: 'Materials', href: '/lab/corridor/materials' },
  { id: 'craftsmanship', label: 'Craftsmanship', href: '/lab/corridor/craftsmanship' },
  { id: 'collections', label: 'Collections', href: '/lab/corridor/collections' },
  { id: 'request-order', label: 'Request Order', href: '/lab/corridor/request-order' },
]

export default function CorridorNavigation() {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const pathname = usePathname()

  // Close dropdown when clicking outside or navigating
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    const handleScroll = () => {
      setIsOpen(false)
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      window.addEventListener('scroll', handleScroll, true)
      window.addEventListener('touchmove', handleScroll, true)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      window.removeEventListener('scroll', handleScroll, true)
      window.removeEventListener('touchmove', handleScroll, true)
    }
  }, [isOpen])

  // Close on navigation
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const handleItemClick = (href: string) => {
    setIsOpen(false)
    router.push(href)
  }

  return (
    <div 
      ref={dropdownRef}
      className="fixed top-0 left-0 z-[100] p-3 sm:p-4 md:p-6 pointer-events-none"
      style={{
        paddingTop: `max(0.75rem, env(safe-area-inset-top))`,
        paddingLeft: `max(0.75rem, env(safe-area-inset-left))`,
        boxSizing: 'border-box',
      }}
    >
      <div className="relative pointer-events-auto" dir="ltr">
        {/* Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-3 py-2 text-xs sm:text-sm bg-transparent border border-white/40 text-white/90 font-sans hover:text-gold-DEFAULT hover:border-gold-DEFAULT/60 transition-colors duration-200 font-light flex items-center justify-center gap-2"
          aria-label="Open navigation menu"
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          {/* Hamburger Icon */}
          <div className="flex flex-col gap-1.5 w-4 h-4 justify-center">
            <span
              className={`block h-[1px] bg-current transition-all duration-300 ${
                isOpen ? 'rotate-45 translate-y-1.5' : ''
              }`}
              style={{ width: '100%' }}
            />
            <span
              className={`block h-[1px] bg-current transition-all duration-300 ${
                isOpen ? 'opacity-0' : 'opacity-100'
              }`}
              style={{ width: '100%' }}
            />
            <span
              className={`block h-[1px] bg-current transition-all duration-300 ${
                isOpen ? '-rotate-45 -translate-y-1.5' : ''
              }`}
              style={{ width: '100%' }}
            />
          </div>
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div 
            className="absolute top-full left-0 mt-1.5 bg-boutallion-green border border-white/30 shadow-lg shadow-black/50 overflow-hidden z-50 min-w-[200px]"
            style={{
              animation: 'fadeIn 200ms ease-out',
            }}
            dir="ltr"
          >
            {NAVIGATION_ITEMS.map((item) => {
              const isActive = pathname === item.href
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.href)}
                  className={`w-full px-4 py-3 text-left text-xs sm:text-sm font-sans font-light transition-colors duration-200 border-b border-white/10 last:border-b-0 ${
                    isActive
                      ? 'text-gold-DEFAULT bg-white/5'
                      : 'text-white/70 hover:text-gold-DEFAULT/90 hover:bg-white/5'
                  }`}
                  aria-label={`Navigate to ${item.label}`}
                >
                  {item.label}
                </button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

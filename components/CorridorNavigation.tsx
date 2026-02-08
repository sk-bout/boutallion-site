'use client'

import { useState, useRef, useEffect, useLayoutEffect } from 'react'
import { createPortal } from 'react-dom'
import { useRouter, usePathname } from 'next/navigation'

interface SubItem {
  id: string
  label: string
  href: string
}

interface NavigationItem {
  id: string
  label: string
  href?: string
  subItems?: SubItem[]
}

// Navigation items - About has submenu; others are direct links
const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    id: 'about',
    label: 'About',
    subItems: [
      { id: 'about-us', label: 'About Us', href: '/lab/corridor/about-us' },
      { id: 'our-story', label: 'Our Story', href: '/lab/corridor/our-story' },
      { id: 'the-founder', label: 'The Founder', href: '/lab/corridor/the-founder' },
    ],
  },
  { id: 'materials', label: 'Materials', href: '/lab/corridor/materials' },
  { id: 'craftsmanship', label: 'Craftsmanship', href: '/lab/corridor/craftsmanship' },
  { id: 'collections', label: 'Collections', href: '/lab/corridor/collections' },
  { id: 'request-order', label: 'Request Order', href: '/lab/corridor/request-order' },
]

interface CorridorNavigationProps {
  /** When true, renders inline (no fixed positioning) for use inside a header bar */
  inline?: boolean
}

export default function CorridorNavigation({ inline }: CorridorNavigationProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 })
  const buttonRef = useRef<HTMLButtonElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const dropdownMenuRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const pathname = usePathname()

  // Position dropdown based on button when opening (for portal/inline mode)
  // useLayoutEffect ensures position is set before paint, avoiding flash at (0,0)
  useLayoutEffect(() => {
    if (isOpen && inline && buttonRef.current && typeof document !== 'undefined') {
      const rect = buttonRef.current.getBoundingClientRect()
      setDropdownPosition({
        top: rect.bottom + 6,
        left: rect.left,
      })
    }
  }, [isOpen, inline])

  // Close dropdown when clicking outside or navigating
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node
      const inButton = buttonRef.current?.contains(target)
      const inMenu = dropdownMenuRef.current?.contains(target)
      if (!inButton && !inMenu) {
        setIsOpen(false)
      }
    }

    const handleScroll = () => {
      setIsOpen(false)
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('pointerdown', handleClickOutside)
      window.addEventListener('scroll', handleScroll, true)
      window.addEventListener('touchmove', handleScroll, true)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('pointerdown', handleClickOutside)
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
      className={inline ? 'relative pointer-events-auto overflow-visible' : 'fixed top-0 left-0 z-[100] p-3 sm:p-4 md:p-6 pointer-events-none overflow-visible'}
      style={inline ? undefined : {
        paddingTop: `max(0.75rem, env(safe-area-inset-top))`,
        paddingLeft: `max(0.75rem, env(safe-area-inset-left))`,
        boxSizing: 'border-box',
      }}
    >
      <div className={inline ? 'relative' : 'relative pointer-events-auto'} dir="ltr">
        {/* Hamburger Button */}
        <button
          ref={buttonRef}
          type="button"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            setIsOpen((prev) => !prev)
          }}
          onPointerDown={(e) => e.stopPropagation()}
          className="px-3 py-2 text-xs sm:text-sm bg-transparent border border-white/70 text-white/90 font-sans hover:bg-white/10 hover:border-white transition-colors duration-200 font-light flex items-center justify-center gap-2"
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

        {/* Dropdown Menu - use portal when inline to avoid clipping by parent overflow */}
        {isOpen && (() => {
          const dropdownContent = (
            <div
              ref={dropdownMenuRef}
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => e.stopPropagation()}
              className={`bg-boutallion-green border border-white/30 shadow-lg shadow-black/50 overflow-hidden z-[9999] min-w-[200px] pointer-events-auto ${
                inline ? 'fixed' : 'absolute top-full left-0 mt-1.5'
              }`}
              style={
                inline && typeof document !== 'undefined'
                  ? {
                      top: dropdownPosition.top,
                      left: dropdownPosition.left,
                      animation: 'fadeIn 200ms ease-out',
                    }
                  : {
                      animation: 'fadeIn 200ms ease-out',
                    }
              }
              dir="ltr"
            >
              {NAVIGATION_ITEMS.map((item) => {
                if (item.subItems) {
                  return (
                    <div key={item.id} className="border-b border-white/10 last:border-b-0">
                      <div className="px-4 py-2 text-xs sm:text-sm font-sans font-light text-white/50">
                        {item.label}
                      </div>
                      {item.subItems.map((sub) => {
                        const isActive = pathname === sub.href
                        return (
                          <button
                            key={sub.id}
                            type="button"
                            onClick={() => handleItemClick(sub.href)}
                            onPointerDown={(e) => e.stopPropagation()}
                            className={`w-full px-6 py-2.5 text-left text-xs sm:text-sm font-sans font-light transition-colors duration-200 ${
                              isActive
                                ? 'text-gold-DEFAULT bg-white/5'
                                : 'text-white/70 hover:text-gold-DEFAULT/90 hover:bg-white/5'
                            }`}
                            aria-label={`Navigate to ${sub.label}`}
                          >
                            {sub.label}
                          </button>
                        )
                      })}
                    </div>
                  )
                }
                const isActive = pathname === item.href
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => item.href && handleItemClick(item.href)}
                    onPointerDown={(e) => e.stopPropagation()}
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
          )
          if (inline && typeof document !== 'undefined') {
            return createPortal(dropdownContent, document.body)
          }
          return dropdownContent
        })()}
      </div>
    </div>
  )
}

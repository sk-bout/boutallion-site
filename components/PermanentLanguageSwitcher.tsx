'use client'

import { usePathname, useRouter, useParams } from 'next/navigation'
import { Locale, getLocaleFromPath, locales } from '@/lib/i18n'
import { useState, useRef, useEffect } from 'react'

const LANGUAGES: { code: Locale; label: string; nativeLabel: string }[] = [
  { code: 'en', label: 'English', nativeLabel: 'English' },
  { code: 'it', label: 'Italian', nativeLabel: 'Italiano' },
  { code: 'ar', label: 'Arabic', nativeLabel: 'العربية' },
  { code: 'nl', label: 'Dutch', nativeLabel: 'Nederlands' },
  { code: 'fr', label: 'French', nativeLabel: 'Français' },
  { code: 'ru', label: 'Russian', nativeLabel: 'Русский' },
]

export default function PermanentLanguageSwitcher() {
  const pathname = usePathname()
  const router = useRouter()
  const params = useParams()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  
  // Get locale from params first (most reliable), then fallback to pathname parsing
  const localeFromParams = params?.locale as Locale | undefined
  const localeFromPath = getLocaleFromPath(pathname)
  const currentLocale = (localeFromParams && locales.includes(localeFromParams)) 
    ? localeFromParams 
    : localeFromPath

  const currentLanguage = LANGUAGES.find(lang => lang.code === currentLocale) || LANGUAGES[0]

  const switchLanguage = (newLocale: Locale) => {
    // Close dropdown immediately
    setIsOpen(false)
    // Remove current locale from path
    const pathWithoutLocale = pathname.replace(/^\/(en|ar|it|fr|nl|zh|ru)/, '') || '/'
    // Add new locale
    router.push(`/${newLocale}${pathWithoutLocale}`)
  }

  // Close dropdown when clicking outside or scrolling
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
      window.addEventListener('scroll', handleScroll, true) // Use capture phase to catch all scroll events
      window.addEventListener('touchmove', handleScroll, true) // For mobile touch scrolling
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      window.removeEventListener('scroll', handleScroll, true)
      window.removeEventListener('touchmove', handleScroll, true)
    }
  }, [isOpen])

  // Determine if current locale is RTL (Arabic)
  const isRTL = currentLocale === 'ar'

  return (
    <div 
      ref={dropdownRef}
      className="fixed top-0 right-0 z-50 p-3 sm:p-4 md:p-6 pointer-events-none"
      style={{
        paddingTop: `max(0.75rem, env(safe-area-inset-top))`,
        paddingRight: `max(0.75rem, env(safe-area-inset-right))`,
        boxSizing: 'border-box',
      }}
    >
      <div className="relative pointer-events-auto" dir="ltr">
        {/* Dropdown Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-4 py-2.5 sm:px-4 sm:py-2.5 text-xs sm:text-sm bg-white/10 backdrop-blur-md border border-white/20 text-gold-DEFAULT font-sans tracking-wide hover:bg-white/15 hover:border-gold-DEFAULT/50 transition-all duration-200 font-normal shadow-sm hover:shadow-md whitespace-nowrap flex items-center justify-between gap-2 min-w-[120px] sm:min-w-[140px] rounded-sm"
          aria-label="Select language"
          aria-expanded={isOpen}
          aria-haspopup="true"
          dir="ltr"
        >
          <span className="text-left truncate" dir={isRTL ? 'rtl' : 'ltr'}>{currentLanguage.nativeLabel}</span>
          <svg
            className={`w-3 h-3 transition-transform duration-200 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div 
            className="absolute top-full right-0 mt-1.5 min-w-[120px] sm:min-w-[140px] bg-boutallion-green/98 backdrop-blur-xl border border-white/20 shadow-lg shadow-black/40 overflow-hidden z-50 rounded-sm"
            style={{
              animation: 'fadeIn 200ms ease-out',
            }}
            dir="ltr"
          >
            {LANGUAGES.map((lang) => {
              const isLangRTL = lang.code === 'ar'
              const isActive = currentLocale === lang.code
              return (
                <button
                  key={lang.code}
                  onClick={() => switchLanguage(lang.code)}
                  className={`w-full px-4 py-2.5 sm:px-4 sm:py-2.5 text-left text-xs sm:text-sm font-sans tracking-wide transition-all duration-200 border-b border-white/5 last:border-b-0 ${
                    isActive
                      ? 'bg-white/10 text-gold-DEFAULT'
                      : 'text-white/70 hover:bg-white/8 hover:text-gold-DEFAULT/90'
                  }`}
                  aria-label={`Switch to ${lang.label}`}
                  dir="ltr"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="flex-1 text-left truncate" dir={isLangRTL ? 'rtl' : 'ltr'}>{lang.nativeLabel}</span>
                    {isActive && (
                      <svg 
                        className="w-3 h-3 text-gold-DEFAULT flex-shrink-0" 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

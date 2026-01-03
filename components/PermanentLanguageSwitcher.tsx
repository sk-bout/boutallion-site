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
  { code: 'zh', label: 'Chinese', nativeLabel: '中文' },
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
      className="fixed top-0 right-0 z-[100] p-3 sm:p-4 md:p-6 pointer-events-none"
      style={{
        paddingTop: `max(0.75rem, env(safe-area-inset-top))`,
        paddingRight: `max(0.75rem, env(safe-area-inset-right))`,
        boxSizing: 'border-box',
        visibility: 'visible',
        opacity: 1,
      }}
    >
      <div className="relative pointer-events-auto" dir="ltr">
        {/* Dropdown Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-3 py-2 text-xs sm:text-sm bg-transparent border border-white/40 text-white/90 font-sans hover:text-gold-DEFAULT hover:border-gold-DEFAULT/60 transition-colors duration-200 font-light whitespace-nowrap flex items-center justify-center gap-1.5"
          aria-label="Select language"
          aria-expanded={isOpen}
          aria-haspopup="true"
          dir="ltr"
          style={{
            minWidth: 'fit-content',
          }}
        >
          <span className="text-left" dir={isRTL ? 'rtl' : 'ltr'}>{currentLanguage.nativeLabel}</span>
          <svg
            className={`w-2.5 h-2.5 transition-transform duration-200 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div 
            className="absolute top-full right-0 mt-1.5 bg-boutallion-green border border-white/30 shadow-lg shadow-black/50 overflow-hidden z-50"
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
                  className={`w-full px-3 py-2 text-xs sm:text-sm font-sans font-light transition-colors duration-200 border-b border-white/10 last:border-b-0 ${
                    isActive
                      ? 'text-gold-DEFAULT bg-white/5'
                      : 'text-white/70 hover:text-gold-DEFAULT/90 hover:bg-white/5'
                  }`}
                  aria-label={`Switch to ${lang.label}`}
                  dir="ltr"
                >
                  <span className="text-left" dir={isLangRTL ? 'rtl' : 'ltr'}>{lang.nativeLabel}</span>
                </button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

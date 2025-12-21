'use client'

import { usePathname, useRouter } from 'next/navigation'
import { Locale, getLocaleFromPath } from '@/lib/i18n'
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
  const currentLocale = getLocaleFromPath(pathname)
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const currentLanguage = LANGUAGES.find(lang => lang.code === currentLocale) || LANGUAGES[0]

  const switchLanguage = (newLocale: Locale) => {
    // Close dropdown immediately
    setIsOpen(false)
    // Remove current locale from path
    const pathWithoutLocale = pathname.replace(/^\/(en|ar|it|fr|nl|zh|ru)/, '') || '/'
    // Add new locale
    router.push(`/${newLocale}${pathWithoutLocale}`)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

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
      <div className="relative pointer-events-auto flex justify-end">
        {/* Dropdown Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-4 py-2.5 sm:px-5 sm:py-3 text-xs sm:text-sm bg-white/10 backdrop-blur-md border border-white/20 text-gold-DEFAULT font-sans tracking-[0.1em] sm:tracking-[0.15em] uppercase hover:bg-white/15 hover:border-gold-DEFAULT/40 transition-all duration-300 font-medium shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-black/30 whitespace-nowrap flex items-center gap-2 min-w-[120px] sm:min-w-[140px] justify-between"
          aria-label="Select language"
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          <span>{currentLanguage.nativeLabel}</span>
          <svg
            className={`w-3 h-3 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div 
            className="absolute top-full right-0 mt-2 min-w-[140px] sm:min-w-[160px] bg-boutallion-green/95 backdrop-blur-xl border border-white/20 shadow-2xl shadow-black/50 overflow-hidden z-50 rounded-sm"
            style={{
              animation: 'fadeIn 300ms ease-out',
            }}
          >
            {LANGUAGES.map((lang, index) => (
              <button
                key={lang.code}
                onClick={() => switchLanguage(lang.code)}
                className={`w-full px-4 py-3 sm:px-5 sm:py-3.5 text-left text-xs sm:text-sm font-sans tracking-[0.1em] sm:tracking-[0.15em] uppercase transition-all duration-300 border-b border-white/5 last:border-b-0 ${
                  currentLocale === lang.code
                    ? 'bg-white/10 text-gold-DEFAULT border-l-2 border-gold-DEFAULT/60 shadow-inner'
                    : 'text-white/70 hover:bg-white/8 hover:text-gold-DEFAULT/90 hover:border-l-2 hover:border-gold-DEFAULT/30'
                }`}
                aria-label={`Switch to ${lang.label}`}
                style={{
                  animationDelay: `${index * 30}ms`,
                }}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="flex-1">{lang.nativeLabel}</span>
                  {currentLocale === lang.code && (
                    <svg 
                      className="w-3.5 h-3.5 text-gold-DEFAULT flex-shrink-0" 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

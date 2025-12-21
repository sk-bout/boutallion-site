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
    // Remove current locale from path
    const pathWithoutLocale = pathname.replace(/^\/(en|ar|it|fr|nl|zh|ru)/, '') || '/'
    // Add new locale
    router.push(`/${newLocale}${pathWithoutLocale}`)
    setIsOpen(false)
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
      className="fixed top-0 right-0 z-50 p-4 sm:p-6 pointer-events-none"
      style={{
        paddingTop: `max(1rem, env(safe-area-inset-top))`,
        paddingRight: `max(1rem, env(safe-area-inset-right))`,
        maxWidth: `calc(100vw - 2rem - env(safe-area-inset-right, 0px))`,
        boxSizing: 'border-box',
      }}
    >
      <div className="relative pointer-events-auto">
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
          <div className="absolute top-full right-0 mt-2 min-w-[140px] sm:min-w-[160px] bg-black/90 backdrop-blur-md border border-white/20 shadow-xl shadow-black/40 overflow-hidden">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => switchLanguage(lang.code)}
                className={`w-full px-4 py-3 text-left text-xs sm:text-sm font-sans tracking-[0.1em] uppercase transition-all duration-300 ${
                  currentLocale === lang.code
                    ? 'bg-white/15 text-gold-DEFAULT border-l-2 border-gold-DEFAULT/60'
                    : 'text-white/80 hover:bg-white/10 hover:text-gold-DEFAULT'
                }`}
                aria-label={`Switch to ${lang.label}`}
              >
                <div className="flex items-center justify-between">
                  <span>{lang.nativeLabel}</span>
                  {currentLocale === lang.code && (
                    <svg className="w-3 h-3 text-gold-DEFAULT" fill="currentColor" viewBox="0 0 20 20">
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

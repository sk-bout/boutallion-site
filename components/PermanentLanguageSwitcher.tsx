'use client'

import { usePathname, useRouter } from 'next/navigation'
import { Locale, getLocaleFromPath } from '@/lib/i18n'

const LANGUAGES: { code: Locale; label: string; nativeLabel: string }[] = [
  { code: 'en', label: 'English', nativeLabel: 'English' },
  { code: 'it', label: 'Italian', nativeLabel: 'Italiano' },
  { code: 'ar', label: 'Arabic', nativeLabel: 'العربية' },
  { code: 'nl', label: 'Dutch', nativeLabel: 'Nederlands' },
]

export default function PermanentLanguageSwitcher() {
  const pathname = usePathname()
  const router = useRouter()
  const currentLocale = getLocaleFromPath(pathname)

  const switchLanguage = (newLocale: Locale) => {
    // Remove current locale from path
    const pathWithoutLocale = pathname.replace(/^\/(en|ar|it|fr|nl|zh|ru)/, '') || '/'
    // Add new locale
    router.push(`/${newLocale}${pathWithoutLocale}`)
  }

  return (
    <div 
      className="fixed top-0 right-0 z-50 p-4 sm:p-6 pointer-events-none"
      style={{
        paddingTop: `max(1rem, env(safe-area-inset-top))`,
        paddingRight: `max(1rem, env(safe-area-inset-right))`,
        maxWidth: `calc(100vw - 2rem - env(safe-area-inset-right, 0px))`,
        boxSizing: 'border-box',
      }}
    >
      <div className="flex flex-wrap gap-2 sm:gap-3 pointer-events-auto">
        {LANGUAGES.map((lang) => (
          <button
            key={lang.code}
            onClick={() => switchLanguage(lang.code)}
            className={`px-3 py-2 sm:px-4 sm:py-2.5 text-xs sm:text-sm md:text-sm bg-white/10 backdrop-blur-md border text-gold-DEFAULT font-sans tracking-[0.1em] sm:tracking-[0.15em] uppercase hover:bg-white/15 hover:border-gold-DEFAULT/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-black/30 whitespace-nowrap overflow-hidden text-ellipsis ${
              currentLocale === lang.code 
                ? 'border-gold-DEFAULT/60 bg-white/15' 
                : 'border-white/20'
            }`}
            aria-label={`Switch to ${lang.label}`}
            disabled={currentLocale === lang.code}
            style={{
              wordWrap: 'break-word',
              overflowWrap: 'break-word',
            }}
          >
            {lang.nativeLabel}
          </button>
        ))}
      </div>
    </div>
  )
}


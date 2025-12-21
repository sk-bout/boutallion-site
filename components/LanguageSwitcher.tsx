'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Locale, getLocaleFromPath, getTranslations } from '@/lib/i18n'

// GCC countries list
const GCC_COUNTRIES = [
  'United Arab Emirates',
  'UAE',
  'Saudi Arabia',
  'Kuwait',
  'Qatar',
  'Bahrain',
  'Oman',
]

// GCC country codes
const GCC_COUNTRY_CODES = ['AE', 'SA', 'KW', 'QA', 'BH', 'OM']

// Netherlands
const NETHERLANDS_COUNTRIES = ['Netherlands', 'Holland', 'The Netherlands']
const NETHERLANDS_COUNTRY_CODES = ['NL']

// Italy
const ITALY_COUNTRIES = ['Italy', 'Italia']
const ITALY_COUNTRY_CODES = ['IT']

export default function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname()
  const router = useRouter()
  const [showSwitcher, setShowSwitcher] = useState(false)
  const [shouldShowSwitcher, setShouldShowSwitcher] = useState<boolean | null>(null) // null = checking, true/false = result

  // Check if visitor is from a country that should see language switcher
  useEffect(() => {
    const checkVisitorCountry = async () => {
      try {
        // Get visitor info from the tracking API
        const sessionId = sessionStorage.getItem('sessionId') || `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
        if (!sessionStorage.getItem('sessionId')) {
          sessionStorage.setItem('sessionId', sessionId)
        }

        const response = await fetch('/api/visitors', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sessionId,
            pageUrl: window.location.href,
            userAgent: navigator.userAgent,
            referer: document.referrer || '',
          }),
        })

        if (response.ok) {
          const data = await response.json()
          const country = data.visitor?.country || data.country
          const countryCode = data.visitor?.country_code || data.countryCode

          // Check if country matches the current locale
          let shouldShow = false

          if (locale === 'ar') {
            // For Arabic: show if GCC country
            shouldShow = country && (
              GCC_COUNTRIES.some(gcc => country.toLowerCase().includes(gcc.toLowerCase())) ||
              GCC_COUNTRY_CODES.includes(countryCode?.toUpperCase())
            )
          } else if (locale === 'nl') {
            // For Dutch: show if Netherlands
            shouldShow = country && (
              NETHERLANDS_COUNTRIES.some(nl => country.toLowerCase().includes(nl.toLowerCase())) ||
              NETHERLANDS_COUNTRY_CODES.includes(countryCode?.toUpperCase())
            )
          } else if (locale === 'it') {
            // For Italian: show if Italy
            shouldShow = country && (
              ITALY_COUNTRIES.some(it => country.toLowerCase().includes(it.toLowerCase())) ||
              ITALY_COUNTRY_CODES.includes(countryCode?.toUpperCase())
            )
          }

          setShouldShowSwitcher(shouldShow || false)
        } else {
          setShouldShowSwitcher(false)
        }
      } catch (error) {
        console.error('Error checking visitor country:', error)
        setShouldShowSwitcher(false)
      }
    }

    // Check if locale needs country detection (ar, nl, it)
    if (locale === 'ar' || locale === 'nl' || locale === 'it') {
      checkVisitorCountry()
    } else {
      setShouldShowSwitcher(false)
    }
  }, [locale])

  useEffect(() => {
    // Show switcher if:
    // 1. Locale is ar, nl, or it
    // 2. Visitor is from matching country (or still checking)
    // 3. Not already in English
    if ((locale === 'ar' || locale === 'nl' || locale === 'it') && (shouldShowSwitcher === true || shouldShowSwitcher === null)) {
      setShowSwitcher(true)
    } else {
      setShowSwitcher(false)
    }
  }, [locale, shouldShowSwitcher])

  const switchToEnglish = () => {
    const pathWithoutLocale = pathname.replace(/^\/(ar|it|fr|nl|zh|ru|en)/, '') || '/'
    router.push(`/en${pathWithoutLocale}`)
    setShowSwitcher(false)
  }

  if (!showSwitcher) return null

  const t = getTranslations(locale)

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={switchToEnglish}
        className="px-4 py-2 bg-black/30 backdrop-blur-md border border-white/20 text-white/80 hover:text-gold-DEFAULT hover:border-gold-DEFAULT/40 transition-all duration-300 font-sans text-xs tracking-[0.1em] uppercase"
        aria-label={t['switch-to-english'] || t['continue-in-english'] || 'Switch to English'}
      >
        {t['switch-to-english'] || t['continue-in-english'] || 'English'}
      </button>
    </div>
  )
}


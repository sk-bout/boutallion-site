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

export default function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname()
  const router = useRouter()
  const [showSwitcher, setShowSwitcher] = useState(false)
  const [isGCCVisitor, setIsGCCVisitor] = useState<boolean | null>(null) // null = checking, true/false = result

  // Check if visitor is from GCC country
  useEffect(() => {
    const checkGCCCountry = async () => {
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

          // Check if country is GCC
          const isGCC = country && (
            GCC_COUNTRIES.some(gcc => country.toLowerCase().includes(gcc.toLowerCase())) ||
            GCC_COUNTRY_CODES.includes(countryCode?.toUpperCase())
          )

          setIsGCCVisitor(isGCC || false)
        } else {
          setIsGCCVisitor(false)
        }
      } catch (error) {
        console.error('Error checking GCC country:', error)
        setIsGCCVisitor(false)
      }
    }

    // Only check if locale is Arabic
    if (locale === 'ar') {
      checkGCCCountry()
    } else {
      setIsGCCVisitor(false)
    }
  }, [locale])

  useEffect(() => {
    // Show switcher only if:
    // 1. Locale is Arabic (ar)
    // 2. Visitor is from GCC country (or still checking)
    // 3. Not already in English
    if (locale === 'ar' && (isGCCVisitor === true || isGCCVisitor === null)) {
      setShowSwitcher(true)
    } else {
      setShowSwitcher(false)
    }
  }, [locale, isGCCVisitor])

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
        aria-label={locale === 'ar' ? t['switch-to-english'] || 'English' : 'Continue in English'}
      >
        {locale === 'ar' ? (t['switch-to-english'] || 'English') : (t['continue-in-english'] || 'Continue in English')}
      </button>
    </div>
  )
}


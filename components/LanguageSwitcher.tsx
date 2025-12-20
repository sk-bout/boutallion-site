'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Locale, getLocaleFromPath, getTranslations } from '@/lib/i18n'

export default function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname()
  const router = useRouter()
  const [showSwitcher, setShowSwitcher] = useState(false)

  useEffect(() => {
    // Show switcher if not English
    if (locale !== 'en') {
      setShowSwitcher(true)
    }
  }, [locale])

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
      >
        Continue in English
      </button>
    </div>
  )
}


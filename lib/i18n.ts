import { translations as en } from './translations/en'
import { translations as ar } from './translations/ar'
import { translations as it } from './translations/it'
import { translations as fr } from './translations/fr'
import { translations as nl } from './translations/nl'
import { translations as zh } from './translations/zh'
import { translations as ru } from './translations/ru'

export type Locale = 'en' | 'ar' | 'it' | 'fr' | 'nl' | 'zh' | 'ru'

export const locales: Locale[] = ['en', 'ar', 'it', 'fr', 'nl', 'zh', 'ru']

export const translations = {
  en,
  ar,
  it,
  fr,
  nl,
  zh,
  ru,
}

export function getTranslations(locale: Locale) {
  return translations[locale] || translations.en
}

export function getLocaleFromPath(pathname: string): Locale {
  // Handle empty pathname or root
  if (!pathname || pathname === '/') {
    return 'en'
  }
  
  // Remove leading slash and split
  const cleanPath = pathname.startsWith('/') ? pathname.slice(1) : pathname
  const segments = cleanPath.split('/').filter(Boolean)
  const firstSegment = segments[0]
  
  // Check if first segment is a valid locale
  if (firstSegment && locales.includes(firstSegment as Locale)) {
    return firstSegment as Locale
  }
  
  // Default to English
  return 'en'
}



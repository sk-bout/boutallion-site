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
  const segments = pathname.split('/').filter(Boolean)
  const firstSegment = segments[0]
  
  if (locales.includes(firstSegment as Locale)) {
    return firstSegment as Locale
  }
  
  return 'en'
}


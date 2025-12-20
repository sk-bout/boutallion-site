import { MetadataRoute } from 'next'
import { i18n } from '@/lib/i18n'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://boutallion.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = i18n.locales
  const currentDate = new Date()
  
  // Base routes for each locale
  const routes = [
    '', // Root page
  ]

  // Generate sitemap entries for each locale
  const entries: MetadataRoute.Sitemap = []

  locales.forEach((locale) => {
    routes.forEach((route) => {
      const url = `${siteUrl}/${locale}${route}`
      entries.push({
        url,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: locale === 'en' ? 1.0 : 0.9, // English is primary
        alternates: {
          languages: Object.fromEntries(
            locales.map((loc) => [loc, `${siteUrl}/${loc}${route}`])
          ),
        },
      })
    })
  })

  return entries
}

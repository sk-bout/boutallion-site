import { MetadataRoute } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://boutallion.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteUrl
  const currentDate = new Date().toISOString()

  return [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
      alternates: {
        languages: {
          en: `${baseUrl}`,
          ar: `${baseUrl}/ar`,
          'ar-SA': `${baseUrl}/ar-sa`,
          'ar-AE': `${baseUrl}/ar-ae`,
          'ar-QA': `${baseUrl}/ar-qa`,
          'ar-KW': `${baseUrl}/ar-kw`,
          'ar-BH': `${baseUrl}/ar-bh`,
          'ar-OM': `${baseUrl}/ar-om`,
          fr: `${baseUrl}/fr`,
          it: `${baseUrl}/it`,
        },
      },
    },
    // Add more pages as they're created
    // Example:
    // {
    //   url: `${baseUrl}/collections`,
    //   lastModified: currentDate,
    //   changeFrequency: 'weekly',
    //   priority: 0.9,
    // },
  ]
}


import { MetadataRoute } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://boutallion.com'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Boutallion - The Most Luxurious Abaya Brand',
    short_name: 'Boutallion',
    description: 'The Most Luxurious Abaya Brand in the World. Italian Haute Couture Abayas Made in Italy.',
    start_url: '/',
    display: 'standalone',
    background_color: '#031a1d',
    theme_color: '#031a1d',
    icons: [
      {
        src: '/og-image.png',
        sizes: 'any',
        type: 'image/png',
      },
      {
        src: '/og-image.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/og-image.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    categories: ['fashion', 'shopping', 'luxury'],
    lang: 'en',
    dir: 'ltr',
    orientation: 'portrait',
  }
}


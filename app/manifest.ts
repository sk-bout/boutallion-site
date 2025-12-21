import { MetadataRoute } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://boutallion.com'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Boutallion - World\'s Most Exclusive Abaya Brand',
    short_name: 'Boutallion',
    description: 'Founded in 2016, Boutallion is the first abaya brand defined by European luxury standards, crafted in Italy with exceptional materials and refined craftsmanship.',
    start_url: '/',
    display: 'standalone',
    background_color: '#031a1d',
    theme_color: '#031a1d',
    icons: [
      {
        src: '/logo.png',
        sizes: 'any',
        type: 'image/png',
      },
      {
        src: '/logo.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/logo.png',
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


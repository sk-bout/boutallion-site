import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { brandTitle, brandDescription } from '@/lib/seo'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://boutallion.com'

// Export metadata for root page (for Facebook/WhatsApp crawlers)
// CRITICAL: Use absolute HTTPS URLs for all OG tags
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: brandTitle,
  description: brandDescription,
  openGraph: {
    title: brandTitle,
    description: brandDescription,
    url: siteUrl, // Already HTTPS from siteUrl constant
    siteName: 'Boutallion',
    images: [
      {
        url: `${siteUrl}/og-image.png`, // Absolute HTTPS URL
        width: 1200,
        height: 630,
        alt: 'Boutallion - World\'s Most Exclusive Abaya Brand',
        type: 'image/png',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: brandTitle,
    description: brandDescription,
    images: [`${siteUrl}/og-image.png`], // Absolute HTTPS URL
  },
  other: {
    'og:url': siteUrl,
    'og:image:secure_url': `${siteUrl}/og-image.png`,
  },
}

export default function RootPage() {
  // This will be handled by middleware, but as a fallback redirect to English
  // Bots will see the metadata above before redirect
  redirect('/en')
}

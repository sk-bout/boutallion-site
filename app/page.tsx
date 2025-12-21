import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
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
    'og:title': brandTitle,
    'og:description': brandDescription,
    'og:type': 'website',
    'og:site_name': 'Boutallion',
    'og:locale': 'en_US',
    'og:image': `${siteUrl}/og-image.png`,
    'og:image:url': `${siteUrl}/og-image.png`,
    'og:image:secure_url': `${siteUrl}/og-image.png`,
    'og:image:width': '1200',
    'og:image:height': '630',
    'og:image:type': 'image/png',
    'og:image:alt': 'Boutallion - World\'s Most Exclusive Abaya Brand',
  },
}

export default async function RootPage() {
  // Check if this is a bot/crawler request
  const headersList = await headers()
  const userAgent = headersList.get('user-agent') || ''
  const isBot = /bot|crawler|spider|crawling|GPTBot|ChatGPT|CCBot|anthropic|Claude|Perplexity|Google-Extended|Bingbot|facebookexternalhit|FacebookBot|Twitterbot|LinkedInBot|WhatsApp|Telegram|Applebot|Bytespider|SemrushBot|AhrefsBot|MJ12bot|DotBot|BLEXBot|Omgilibot|Diffbot|MauiBot|SemanticScholarBot|YouBot/i.test(userAgent)
  
  // For bots, serve content (metadata is in layout head via explicit meta tags)
  // The root layout will wrap this with proper HTML and head tags
  if (isBot) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        backgroundColor: '#031a1d', 
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        padding: '2rem',
        textAlign: 'center'
      }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: 'normal', margin: '0 0 1rem 0' }}>Boutallion</h1>
          <p style={{ fontSize: '1.2rem', opacity: 0.8, maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>{brandDescription}</p>
        </div>
      </div>
    )
  }
  
  // Regular users get redirected to /en
  redirect('/en')
}

import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

/**
 * Test endpoint to verify OG tags and image
 * GET /api/test-og
 */
export async function GET(request: NextRequest) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://boutallion.com'
  
  // Import the actual metadata values
  const { defaultMetadata } = await import('@/lib/seo')
  
  // Extract title - handle both string and object types
  const pageTitle = typeof defaultMetadata.title === 'string' 
    ? defaultMetadata.title 
    : (defaultMetadata.title && 'default' in defaultMetadata.title)
      ? defaultMetadata.title.default
      : 'Not set'
  
  const results = {
    timestamp: new Date().toISOString(),
    siteUrl,
    title: pageTitle,
    description: defaultMetadata.description || 'Not set',
    ogImage: {
      url: `${siteUrl}/og-image.png`,
      expectedDimensions: '1200x630',
      directUrl: `${siteUrl}/og-image.png`,
    },
    metadata: {
      openGraph: {
        url: siteUrl,
        type: 'website',
        title: defaultMetadata.openGraph?.title || pageTitle,
        description: defaultMetadata.openGraph?.description || defaultMetadata.description || 'Not set',
        image: `${siteUrl}/og-image.png`,
        imageWidth: 1200,
        imageHeight: 630,
        imageType: 'image/png',
      },
      twitter: {
        card: 'summary_large_image',
        title: defaultMetadata.twitter?.title || pageTitle,
        description: defaultMetadata.twitter?.description || defaultMetadata.description || 'Not set',
        image: `${siteUrl}/og-image.png`,
      },
    },
    checks: {
      siteUrlConfigured: !!process.env.NEXT_PUBLIC_SITE_URL,
      ogImageUrl: `${siteUrl}/og-image.png`,
    },
    instructions: {
      testDirectImage: `Visit: ${siteUrl}/og-image.png`,
      testInWhatsApp: `Share this URL in WhatsApp: ${siteUrl}`,
      alternativeTesters: [
        'https://www.opengraph.xyz/url/' + siteUrl,
        'https://cards-dev.twitter.com/validator',
        'https://www.linkedin.com/post-inspector/',
      ],
    },
  }

  return NextResponse.json(results, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}


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
  
  const results = {
    timestamp: new Date().toISOString(),
    siteUrl,
    title: typeof defaultMetadata.title === 'string' 
      ? defaultMetadata.title 
      : defaultMetadata.title?.default || 'Not set',
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
        title: typeof defaultMetadata.openGraph?.title === 'string'
          ? defaultMetadata.openGraph.title
          : defaultMetadata.openGraph?.title || 'Not set',
        description: defaultMetadata.openGraph?.description || 'Not set',
        image: `${siteUrl}/og-image.png`,
        imageWidth: 1200,
        imageHeight: 630,
        imageType: 'image/png',
      },
      twitter: {
        card: 'summary_large_image',
        title: typeof defaultMetadata.twitter?.title === 'string'
          ? defaultMetadata.twitter.title
          : defaultMetadata.twitter?.title || 'Not set',
        description: defaultMetadata.twitter?.description || 'Not set',
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


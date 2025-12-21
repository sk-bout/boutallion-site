import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

/**
 * Test endpoint to verify OG tags and image
 * GET /api/test-og
 */
export async function GET(request: NextRequest) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://boutallion.com'
  
  const results = {
    timestamp: new Date().toISOString(),
    siteUrl,
    ogImage: {
      url: `${siteUrl}/og-image.png`,
      expectedDimensions: '1200x630',
      directUrl: `${siteUrl}/og-image.png`,
    },
    metadata: {
      openGraph: {
        url: siteUrl,
        type: 'website',
        image: `${siteUrl}/og-image.png`,
        imageWidth: 1200,
        imageHeight: 630,
        imageType: 'image/png',
      },
      twitter: {
        card: 'summary_large_image',
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


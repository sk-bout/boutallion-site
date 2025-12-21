import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import Script from 'next/script'
import '../globals.css'
import { defaultMetadata, structuredData, organizationStructuredData } from '@/lib/seo'
import { pressStructuredData, mediaKitStructuredData } from '@/lib/press-seo'
import { gccGovernmentStructuredData } from '@/lib/gcc-media-seo'
import { brandMentionsStructuredData } from '@/lib/backlinks-seo'
import { gccLocalBusinessStructuredData, faqStructuredData } from '@/lib/gcc-seo'
import { competitorBrandStructuredData, classicAbayaStructuredData } from '@/lib/ai-optimization'
import { competitorComparisonStructuredData } from '@/lib/competitor-seo'
import { royalAudienceStructuredData } from '@/lib/royal-seo'
import { Locale, locales } from '@/lib/i18n'
import ContentProtection from '@/components/ContentProtection'
import AnalyticsTracker from '@/components/AnalyticsTracker'
import { brandTitle, brandDescription } from '@/lib/seo'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://boutallion.com'

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-refined',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  ...defaultMetadata,
  metadataBase: new URL(siteUrl), // Ensure all relative URLs resolve to HTTPS
  other: {
    ...Object.fromEntries(
      Object.entries(defaultMetadata.other || {}).filter(([_, value]) => value !== undefined)
    ),
    'referrer': 'strict-origin-when-cross-origin',
    // Explicit meta tags for WhatsApp compatibility - use absolute HTTPS URLs
    'og:url': siteUrl, // Force HTTPS URL
    'og:image:width': '1200',
    'og:image:height': '630',
    'og:image:type': 'image/png',
    'og:image:secure_url': `${siteUrl}/og-image.png`, // Explicit HTTPS URL
  },
  // Ensure Open Graph image uses absolute HTTPS URL for WhatsApp compatibility
  openGraph: {
    ...defaultMetadata.openGraph,
    url: siteUrl, // Force HTTPS
    images: [
      {
        url: `${siteUrl}/og-image.png`, // Absolute HTTPS URL
        width: 1200,
        height: 630,
        alt: 'Boutallion - World\'s Most Exclusive Abaya Brand',
        type: 'image/png',
      },
    ],
  },
  // Ensure Twitter image uses absolute HTTPS URL
  twitter: {
    ...defaultMetadata.twitter,
    images: [
      {
        url: `${siteUrl}/og-image.png`, // Absolute HTTPS URL
        alt: 'Boutallion - World\'s Most Exclusive Abaya Brand',
      },
    ],
  },
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: Locale }
}) {
  return (
    <html lang={params.locale} dir={params.locale === 'ar' ? 'rtl' : 'ltr'} style={{ WebkitTextSizeAdjust: '100%', textSizeAdjust: '100%', backgroundColor: '#031a1d' }}>
      <head>
        {/* Preload Portrait font to ensure it's available immediately */}
        <link
          rel="preload"
          href="/fonts/Portrait-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        {/* Explicit meta tags for WhatsApp/Facebook compatibility - ORDER MATTERS! */}
        <meta property="og:url" content={`${siteUrl}/${params.locale}`} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Boutallion" />
        <meta property="og:title" content={brandTitle} />
        <meta property="og:description" content={brandDescription} />
        <meta property="og:locale" content={params.locale === 'ar' ? 'ar_SA' : params.locale === 'it' ? 'it_IT' : params.locale === 'fr' ? 'fr_FR' : params.locale === 'nl' ? 'nl_NL' : params.locale === 'ru' ? 'ru_RU' : 'en_US'} />
        <meta property="og:image" content={`${siteUrl}/og-image.png`} />
        <meta property="og:image:url" content={`${siteUrl}/og-image.png`} />
        <meta property="og:image:secure_url" content={`${siteUrl}/og-image.png`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:alt" content="Boutallion - World's Most Exclusive Abaya Brand" />
        {/* Additional OG tags for better compatibility */}
        <meta name="description" content={brandDescription} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@boutallion" />
        <meta name="twitter:creator" content="@boutallion" />
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={brandTitle} />
        <meta name="twitter:description" content={brandDescription} />
        <meta name="twitter:image" content={`${siteUrl}/og-image.png`} />
        <meta name="twitter:image:alt" content="Boutallion - World's Most Exclusive Abaya Brand" />
      </head>
      <body className={`${playfairDisplay.variable} ${inter.variable}`} style={{ WebkitTextSizeAdjust: '100%', textSizeAdjust: '100%', backgroundColor: '#031a1d', color: '#ffffff' }}>
        <ContentProtection />
        <AnalyticsTracker />
        {/* Structured Data - Luxury Brand */}
        <Script
          id="structured-data-brand"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        {/* Structured Data - Organization */}
        <Script
          id="structured-data-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationStructuredData),
          }}
        />
        {/* Structured Data - Press & Media */}
        <Script
          id="structured-data-press"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(pressStructuredData),
          }}
        />
        {/* Structured Data - Media Kit */}
        <Script
          id="structured-data-media-kit"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(mediaKitStructuredData),
          }}
        />
        {/* Structured Data - GCC Government Recognition */}
        <Script
          id="structured-data-gcc-government"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(gccGovernmentStructuredData),
          }}
        />
        {/* Structured Data - Brand Mentions & Backlinks */}
        <Script
          id="structured-data-brand-mentions"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(brandMentionsStructuredData),
          }}
        />
        {/* Structured Data - GCC Local Business (Abu Dhabi, Dubai, Doha, Riyadh, Jeddah) */}
        {gccLocalBusinessStructuredData.map((business, index) => (
          <Script
            key={`gcc-local-business-${index}`}
            id={`structured-data-gcc-local-business-${index}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(business),
            }}
          />
        ))}
        {/* Structured Data - FAQ Page */}
        <Script
          id="structured-data-faq"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqStructuredData),
          }}
        />
        {/* Structured Data - Competitor Brand Searches (AI Optimization) */}
        <Script
          id="structured-data-competitor-brands"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(competitorBrandStructuredData),
          }}
        />
        {/* Structured Data - Classic Abaya (AI Optimization) */}
        <Script
          id="structured-data-classic-abaya"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(classicAbayaStructuredData),
          }}
        />
        {/* Structured Data - Competitor Comparison (Selhaya, Mauzan) */}
        <Script
          id="structured-data-competitor-comparison"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(competitorComparisonStructuredData),
          }}
        />
        {/* Structured Data - Royal Audience Targeting */}
        <Script
          id="structured-data-royal-audience"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(royalAudienceStructuredData),
          }}
        />
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-WLTM6Z0GF1"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-WLTM6Z0GF1');
          `}
        </Script>
        {children}
      </body>
    </html>
  )
}


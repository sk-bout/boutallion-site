import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import Script from 'next/script'
import '../globals.css'
import { defaultMetadata, structuredData, organizationStructuredData } from '@/lib/seo'
import { pressStructuredData, mediaKitStructuredData } from '@/lib/press-seo'
import { gccGovernmentStructuredData } from '@/lib/gcc-media-seo'
import { brandMentionsStructuredData } from '@/lib/backlinks-seo'
import { Locale, locales } from '@/lib/i18n'
import ContentProtection from '@/components/ContentProtection'
import AnalyticsTracker from '@/components/AnalyticsTracker'

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
  other: {
    ...Object.fromEntries(
      Object.entries(defaultMetadata.other || {}).filter(([_, value]) => value !== undefined)
    ),
    'referrer': 'strict-origin-when-cross-origin',
    // Explicit meta tags for WhatsApp compatibility
    'og:image:width': '1200',
    'og:image:height': '630',
    'og:image:type': 'image/png',
  },
  // Ensure Open Graph image uses absolute URL for WhatsApp compatibility
  openGraph: {
    ...defaultMetadata.openGraph,
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Boutallion - World\'s Most Exclusive Abaya Brand',
        type: 'image/png',
      },
    ],
  },
  // Ensure Twitter image uses absolute URL
  twitter: {
    ...defaultMetadata.twitter,
    images: [
      {
        url: `${siteUrl}/og-image.png`,
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
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-GVM5GMRFCG"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-GVM5GMRFCG');
          `}
        </Script>
        {children}
      </body>
    </html>
  )
}


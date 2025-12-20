import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import Script from 'next/script'
import '../globals.css'
import { defaultMetadata, structuredData, organizationStructuredData } from '@/lib/seo'
import { pressStructuredData, mediaKitStructuredData } from '@/lib/press-seo'
import { gccGovernmentStructuredData } from '@/lib/gcc-media-seo'
import { Locale, locales } from '@/lib/i18n'

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

export const metadata: Metadata = defaultMetadata

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
    <html lang={params.locale} dir={params.locale === 'ar' ? 'rtl' : 'ltr'}>
      <body className={`${playfairDisplay.variable} ${inter.variable}`}>
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
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-DQM5KS13BT"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-DQM5KS13BT');
          `}
        </Script>
        {children}
      </body>
    </html>
  )
}


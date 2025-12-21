import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import { defaultMetadata, structuredData, organizationStructuredData } from '@/lib/seo'
import { pressStructuredData, mediaKitStructuredData } from '@/lib/press-seo'
import { gccGovernmentStructuredData } from '@/lib/gcc-media-seo'

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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://boutallion.com'),
  // Ensure OG tags are explicitly set for root page
  openGraph: {
    ...defaultMetadata.openGraph,
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://boutallion.com',
    title: defaultMetadata.title?.default || defaultMetadata.title || 'Boutallion',
    description: defaultMetadata.description || '',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://boutallion.com'}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Boutallion - World\'s Most Exclusive Abaya Brand',
        type: 'image/png',
      },
    ],
  },
  // Add explicit other tags for WhatsApp/Facebook
  other: {
    ...defaultMetadata.other,
    'og:url': process.env.NEXT_PUBLIC_SITE_URL || 'https://boutallion.com',
    'og:title': defaultMetadata.title?.default || defaultMetadata.title || 'Boutallion',
    'og:description': defaultMetadata.description || '',
    'og:image:secure_url': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://boutallion.com'}/og-image.png`,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
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

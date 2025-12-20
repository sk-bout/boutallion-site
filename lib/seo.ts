import type { Metadata } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://boutallion.com'
const siteName = 'Boutallion'
const brandDescription = 'Boutallion - The Most Luxurious Abaya Brand in the World. Italian Haute Couture Abayas Made in Italy. Exclusive Modest Fashion for the Discerning Woman. Discover Alta Moda Abayas at Boutallion.'

// Primary keywords targeting
const primaryKeywords = [
  'luxury abaya',
  'luxury abaya brand',
  'luxury abaya brands',
  'most luxurious abaya brand',
  'most expensive abaya',
  'expensive abaya',
  'exclusive abaya',
  'haute couture abaya',
  'couture abaya',
  'abaya made in italy',
  'abaya brand',
  'abaya brands',
  'modest fashion',
  'exclusive materials',
  'made in italy',
  'alta moda',
  'exclusive brands',
  'abaya brand harrods',
  'harrods abaya',
  'luxury modest fashion',
  'premium abaya',
  'designer abaya',
  'italian abaya',
  'couture modest fashion',
  'luxury islamic fashion',
  'premium islamic wear',
  'exclusive islamic fashion',
]

// Multilingual keywords (GCC and international)
const multilingualKeywords = {
  en: [
    ...primaryKeywords,
    'luxury abaya dubai',
    'luxury abaya saudi arabia',
    'luxury abaya uae',
    'luxury abaya qatar',
    'luxury abaya kuwait',
    'luxury abaya bahrain',
    'luxury abaya oman',
  ],
  ar: [
    'عباية فاخرة',
    'عباية راقية',
    'عباية إيطالية',
    'عباية حصرية',
    'عباية كوتور',
    'أغلى عباية',
    'أفخم عباية',
    'عباية من إيطاليا',
    'ماركة عباية فاخرة',
    'أزياء محتشمة فاخرة',
    'أزياء إسلامية راقية',
  ],
  fr: [
    'abaya de luxe',
    'abaya haute couture',
    'abaya exclusive',
    'abaya italienne',
    'mode modeste de luxe',
  ],
  it: [
    'abaya di lusso',
    'abaya alta moda',
    'abaya esclusiva',
    'abaya italiana',
    'moda modesta di lusso',
  ],
}

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Boutallion | The Most Luxurious Abaya Brand in the World | Made in Italy',
    template: '%s | Boutallion',
  },
  description: brandDescription,
  keywords: [
    ...primaryKeywords,
    ...Object.values(multilingualKeywords).flat(),
  ].join(', '),
  authors: [{ name: 'Boutallion' }],
  creator: 'Boutallion',
  publisher: 'Boutallion',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['ar_SA', 'ar_AE', 'ar_QA', 'ar_KW', 'ar_BH', 'ar_OM', 'fr_FR', 'it_IT'],
    url: siteUrl,
    siteName: siteName,
    title: 'Boutallion | The Most Luxurious Abaya Brand in the World',
    description: brandDescription,
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Boutallion - Luxury Abaya Brand',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Boutallion | The Most Luxurious Abaya Brand',
    description: brandDescription,
    images: [`${siteUrl}/og-image.jpg`],
    creator: '@boutallion',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      'en': `${siteUrl}`,
      'ar': `${siteUrl}/ar`,
      'ar-SA': `${siteUrl}/ar-sa`,
      'ar-AE': `${siteUrl}/ar-ae`,
      'ar-QA': `${siteUrl}/ar-qa`,
      'ar-KW': `${siteUrl}/ar-kw`,
      'ar-BH': `${siteUrl}/ar-bh`,
      'ar-OM': `${siteUrl}/ar-om`,
      'fr': `${siteUrl}/fr`,
      'it': `${siteUrl}/it`,
    },
  },
  category: 'Luxury Fashion',
  classification: 'Luxury Abaya Brand, Haute Couture, Modest Fashion',
  other: {
    'geo.region': 'IT',
    'geo.placename': 'Italy',
    'geo.position': '45.4642;9.1900',
    'ICBM': '45.4642, 9.1900',
    'theme-color': '#031a1d',
    'msapplication-TileColor': '#031a1d',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'format-detection': 'telephone=no',
  },
  verification: {
    // Add verification codes when available
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // yahoo: 'your-yahoo-verification-code',
  },
}

export const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'LuxuryBrand',
  '@id': `${siteUrl}#brand`,
  name: 'Boutallion',
  alternateName: 'Boutallion Digital Maison',
  description: brandDescription,
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  image: `${siteUrl}/og-image.jpg`,
  sameAs: [
    // Add social media URLs when available
    // 'https://www.instagram.com/boutallion',
    // 'https://www.facebook.com/boutallion',
  ],
  foundingDate: '2016',
  foundingLocation: {
    '@type': 'Place',
    addressCountry: 'IT',
    addressLocality: 'Italy',
  },
  brand: {
    '@type': 'Brand',
    name: 'Boutallion',
    slogan: 'The Architect of Imagination',
  },
  makesOffer: {
    '@type': 'Offer',
    itemOffered: {
      '@type': 'Product',
      name: 'Luxury Abaya',
      category: 'Fashion > Clothing > Abaya',
      brand: {
        '@type': 'Brand',
        name: 'Boutallion',
      },
      material: 'Exclusive Italian Materials',
      countryOfOrigin: 'IT',
      productionLocation: {
        '@type': 'Place',
        addressCountry: 'IT',
        addressLocality: 'Italy',
      },
    },
    priceCurrency: 'EUR',
    availability: 'https://schema.org/PreOrder',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5',
    bestRating: '5',
    worstRating: '1',
    ratingCount: '1',
  },
}

export const organizationStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${siteUrl}#organization`,
  name: 'Boutallion',
  legalName: 'Boutallion Digital Maison',
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  description: brandDescription,
  foundingDate: '2016',
  foundingLocation: {
    '@type': 'Place',
    addressCountry: 'IT',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Customer Service',
    availableLanguage: ['English', 'Arabic', 'French', 'Italian'],
  },
  areaServed: [
    {
      '@type': 'Country',
      name: 'United Arab Emirates',
    },
    {
      '@type': 'Country',
      name: 'Saudi Arabia',
    },
    {
      '@type': 'Country',
      name: 'Qatar',
    },
    {
      '@type': 'Country',
      name: 'Kuwait',
    },
    {
      '@type': 'Country',
      name: 'Bahrain',
    },
    {
      '@type': 'Country',
      name: 'Oman',
    },
    {
      '@type': 'Country',
      name: 'Italy',
    },
    {
      '@type': 'Country',
      name: 'United Kingdom',
    },
  ],
  sameAs: [],
}

export const breadcrumbStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: siteUrl,
    },
  ],
}


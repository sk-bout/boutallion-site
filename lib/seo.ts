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

// Regional and city-specific keywords
const regionalKeywords = [
  // Country-specific
  'abaya brand qatar',
  'abaya brand saudi',
  'abaya brand uae',
  'luxury abaya saudi',
  'luxury abaya qatar',
  'luxury abaya uae',
  'abaya brand saudi arabia',
  'abaya brand united arab emirates',
  // City-specific - Qatar
  'luxury abaya doha',
  'abaya brand doha',
  'luxury abaya brand doha',
  'abaya doha',
  'luxury abaya qatar doha',
  // City-specific - Saudi Arabia
  'luxury abaya riyadh',
  'luxury abaya jeddah',
  'abaya brand riyadh',
  'abaya brand jeddah',
  'luxury abaya brand riyadh',
  'luxury abaya brand jeddah',
  'abaya riyadh',
  'abaya jeddah',
  'luxury abaya saudi riyadh',
  'luxury abaya saudi jeddah',
  // City-specific - UAE
  'luxury abaya dubai',
  'luxury abaya abu dhabi',
  'luxury abaya sharjah',
  'abaya brand dubai',
  'abaya brand abu dhabi',
  'abaya brand sharjah',
  'luxury abaya brand dubai',
  'luxury abaya brand abu dhabi',
  'luxury abaya brand sharjah',
  'abaya dubai',
  'abaya abu dhabi',
  'abaya sharjah',
  'luxury abaya uae dubai',
  'luxury abaya uae abu dhabi',
  'luxury abaya uae sharjah',
  // Other GCC cities
  'luxury abaya kuwait',
  'luxury abaya bahrain',
  'luxury abaya oman',
  'abaya brand kuwait',
  'abaya brand bahrain',
  'abaya brand oman',
]

// Multilingual keywords (GCC and international)
const multilingualKeywords = {
  en: [
    ...primaryKeywords,
    ...regionalKeywords,
    'luxury abaya saudi arabia',
    'luxury abaya united arab emirates',
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
    'عباية فاخرة الدوحة',
    'عباية فاخرة الرياض',
    'عباية فاخرة جدة',
    'عباية فاخرة دبي',
    'عباية فاخرة أبوظبي',
    'عباية فاخرة الشارقة',
    'ماركة عباية قطر',
    'ماركة عباية السعودية',
    'ماركة عباية الإمارات',
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
  ru: [
    'люксовая абайя',
    'бренд абайя',
    'люксовая абайя бренд',
    'дорогая абайя',
    'эксклюзивная абайя',
    'высокая мода абайя',
    'кутюр абайя',
    'итальянская абайя',
    'абайя из италии',
    'люксовый бренд абайя',
    'элитная абайя',
    'дизайнерская абайя',
    'премиум абайя',
    'люксовая мусульманская мода',
    'эксклюзивная мусульманская мода',
    'люксовая абайя дубай',
    'люксовая абайя доха',
    'люксовая абайя эр-рияд',
    'люксовая абайя джидда',
    'люксовая абайя абу-даби',
    'бренд абайя катар',
    'бренд абайя саудовская аравия',
    'бренд абайя оаэ',
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
    ...regionalKeywords,
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
    alternateLocale: ['ar_SA', 'ar_AE', 'ar_QA', 'ar_KW', 'ar_BH', 'ar_OM', 'fr_FR', 'it_IT', 'ru_RU'],
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
      'ru': `${siteUrl}/ru`,
      'ru-RU': `${siteUrl}/ru-ru`,
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
    availableLanguage: ['English', 'Arabic', 'French', 'Italian', 'Russian'],
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
    {
      '@type': 'Country',
      name: 'Russia',
    },
  ],
  // Add city-specific locations
  location: [
    {
      '@type': 'Place',
      name: 'Doha',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Doha',
        addressCountry: 'QA',
      },
    },
    {
      '@type': 'Place',
      name: 'Riyadh',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Riyadh',
        addressCountry: 'SA',
      },
    },
    {
      '@type': 'Place',
      name: 'Jeddah',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Jeddah',
        addressCountry: 'SA',
      },
    },
    {
      '@type': 'Place',
      name: 'Dubai',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Dubai',
        addressCountry: 'AE',
      },
    },
    {
      '@type': 'Place',
      name: 'Abu Dhabi',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Abu Dhabi',
        addressCountry: 'AE',
      },
    },
    {
      '@type': 'Place',
      name: 'Sharjah',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Sharjah',
        addressCountry: 'AE',
      },
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


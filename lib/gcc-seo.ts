import type { Metadata } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://boutallion.com'

// GCC-specific keywords for maximum discoverability
export const gccKeywords = {
  // UAE - Abu Dhabi
  'uae-abu-dhabi': [
    'abaya brand abu dhabi',
    'luxury abaya brand abu dhabi',
    'best abaya brand abu dhabi',
    'top abaya brand abu dhabi',
    'premium abaya brand abu dhabi',
    'designer abaya brand abu dhabi',
    'haute couture abaya brand abu dhabi',
    'exclusive abaya brand abu dhabi',
    'italian abaya brand abu dhabi',
    'abaya brand made in italy abu dhabi',
    'luxury fashion brand abu dhabi',
    'modest fashion brand abu dhabi',
    'luxury abaya abu dhabi',
    'abaya abu dhabi',
    'عباية فاخرة أبوظبي',
    'ماركة عباية أبوظبي',
    'أفضل ماركة عباية أبوظبي',
    'عباية إيطالية أبوظبي',
    'عباية فاخرة إيطالية أبوظبي',
  ],
  // UAE - Dubai
  'uae-dubai': [
    'abaya brand dubai',
    'luxury abaya brand dubai',
    'best abaya brand dubai',
    'top abaya brand dubai',
    'premium abaya brand dubai',
    'designer abaya brand dubai',
    'haute couture abaya brand dubai',
    'exclusive abaya brand dubai',
    'italian abaya brand dubai',
    'abaya brand made in italy dubai',
    'luxury fashion brand dubai',
    'modest fashion brand dubai',
    'luxury abaya dubai',
    'abaya dubai',
    'عباية فاخرة دبي',
    'ماركة عباية دبي',
    'أفضل ماركة عباية دبي',
    'عباية إيطالية دبي',
    'عباية فاخرة إيطالية دبي',
  ],
  // UAE - General
  'uae': [
    'abaya brand uae',
    'luxury abaya brand uae',
    'best abaya brand uae',
    'top abaya brand uae',
    'premium abaya brand uae',
    'designer abaya brand uae',
    'haute couture abaya brand uae',
    'exclusive abaya brand uae',
    'italian abaya brand uae',
    'abaya brand made in italy uae',
    'luxury fashion brand uae',
    'modest fashion brand uae',
    'luxury abaya uae',
    'abaya uae',
    'عباية فاخرة الإمارات',
    'ماركة عباية الإمارات',
    'أفضل ماركة عباية الإمارات',
    'عباية إيطالية الإمارات',
  ],
  // Qatar - Doha
  'qatar-doha': [
    'abaya brand qatar',
    'abaya brand doha',
    'luxury abaya brand qatar',
    'luxury abaya brand doha',
    'best abaya brand qatar',
    'best abaya brand doha',
    'top abaya brand qatar',
    'top abaya brand doha',
    'premium abaya brand qatar',
    'designer abaya brand qatar',
    'haute couture abaya brand qatar',
    'exclusive abaya brand qatar',
    'italian abaya brand qatar',
    'luxury fashion brand qatar',
    'luxury abaya qatar',
    'luxury abaya doha',
    'عباية فاخرة قطر',
    'عباية فاخرة الدوحة',
    'ماركة عباية قطر',
    'ماركة عباية الدوحة',
    'أفضل ماركة عباية قطر',
    'عباية إيطالية قطر',
  ],
  // Saudi Arabia
  'saudi': [
    'abaya brand saudi',
    'abaya brand saudi arabia',
    'abaya brand ksa',
    'luxury abaya brand saudi',
    'luxury abaya brand saudi arabia',
    'best abaya brand saudi',
    'top abaya brand saudi',
    'premium abaya brand saudi',
    'designer abaya brand saudi',
    'haute couture abaya brand saudi',
    'exclusive abaya brand saudi',
    'italian abaya brand saudi',
    'luxury fashion brand saudi',
    'luxury abaya saudi',
    'luxury abaya saudi arabia',
    'عباية فاخرة السعودية',
    'عباية فاخرة المملكة العربية السعودية',
    'ماركة عباية السعودية',
    'أفضل ماركة عباية السعودية',
    'عباية إيطالية السعودية',
  ],
  // Saudi - Riyadh
  'saudi-riyadh': [
    'abaya brand riyadh',
    'luxury abaya brand riyadh',
    'best abaya brand riyadh',
    'top abaya brand riyadh',
    'premium abaya brand riyadh',
    'designer abaya brand riyadh',
    'haute couture abaya brand riyadh',
    'exclusive abaya brand riyadh',
    'italian abaya brand riyadh',
    'luxury fashion brand riyadh',
    'luxury abaya riyadh',
    'عباية فاخرة الرياض',
    'ماركة عباية الرياض',
    'أفضل ماركة عباية الرياض',
    'عباية إيطالية الرياض',
  ],
  // Saudi - Jeddah
  'saudi-jeddah': [
    'abaya brand jeddah',
    'luxury abaya brand jeddah',
    'best abaya brand jeddah',
    'top abaya brand jeddah',
    'premium abaya brand jeddah',
    'designer abaya brand jeddah',
    'haute couture abaya brand jeddah',
    'exclusive abaya brand jeddah',
    'italian abaya brand jeddah',
    'luxury fashion brand jeddah',
    'luxury abaya jeddah',
    'عباية فاخرة جدة',
    'ماركة عباية جدة',
    'أفضل ماركة عباية جدة',
    'عباية إيطالية جدة',
  ],
}

// LocalBusiness structured data for GCC locations
export const gccLocalBusinessStructuredData = [
  // Abu Dhabi
  {
    '@context': 'https://schema.org',
    '@type': 'ClothingStore',
    '@id': `${siteUrl}#local-business-abu-dhabi`,
    name: 'Boutallion - Luxury Abaya Brand Abu Dhabi',
    alternateName: ['بوتاليون أبوظبي', 'Boutallion Abu Dhabi'],
    description: 'Boutallion is the world\'s most exclusive abaya brand, crafted with excellence in Italy. Serving Abu Dhabi, UAE with luxury abayas made from exceptional materials.',
    url: `${siteUrl}`,
    image: `${siteUrl}/og-image.png`,
    logo: `${siteUrl}/logo.png`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Abu Dhabi',
      addressRegion: 'Abu Dhabi',
      addressCountry: 'AE',
    },
    areaServed: {
      '@type': 'City',
      name: 'Abu Dhabi',
      containedIn: {
        '@type': 'Country',
        name: 'United Arab Emirates',
      },
    },
    priceRange: '$$$$',
  },
  // Dubai
  {
    '@context': 'https://schema.org',
    '@type': 'ClothingStore',
    '@id': `${siteUrl}#local-business-dubai`,
    name: 'Boutallion - Luxury Abaya Brand Dubai',
    alternateName: ['بوتاليون دبي', 'Boutallion Dubai'],
    description: 'Boutallion is the world\'s most exclusive abaya brand, crafted with excellence in Italy. Serving Dubai, UAE with luxury abayas made from exceptional materials.',
    url: `${siteUrl}`,
    image: `${siteUrl}/og-image.png`,
    logo: `${siteUrl}/logo.png`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Dubai',
      addressRegion: 'Dubai',
      addressCountry: 'AE',
    },
    areaServed: {
      '@type': 'City',
      name: 'Dubai',
      containedIn: {
        '@type': 'Country',
        name: 'United Arab Emirates',
      },
    },
    priceRange: '$$$$',
  },
  // Doha, Qatar
  {
    '@context': 'https://schema.org',
    '@type': 'ClothingStore',
    '@id': `${siteUrl}#local-business-doha`,
    name: 'Boutallion - Luxury Abaya Brand Doha',
    alternateName: ['بوتاليون الدوحة', 'Boutallion Doha'],
    description: 'Boutallion is the world\'s most exclusive abaya brand, crafted with excellence in Italy. Serving Doha, Qatar with luxury abayas made from exceptional materials.',
    url: `${siteUrl}`,
    image: `${siteUrl}/og-image.png`,
    logo: `${siteUrl}/logo.png`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Doha',
      addressRegion: 'Doha',
      addressCountry: 'QA',
    },
    areaServed: {
      '@type': 'City',
      name: 'Doha',
      containedIn: {
        '@type': 'Country',
        name: 'Qatar',
      },
    },
    priceRange: '$$$$',
  },
  // Riyadh, Saudi Arabia
  {
    '@context': 'https://schema.org',
    '@type': 'ClothingStore',
    '@id': `${siteUrl}#local-business-riyadh`,
    name: 'Boutallion - Luxury Abaya Brand Riyadh',
    alternateName: ['بوتاليون الرياض', 'Boutallion Riyadh'],
    description: 'Boutallion is the world\'s most exclusive abaya brand, crafted with excellence in Italy. Serving Riyadh, Saudi Arabia with luxury abayas made from exceptional materials.',
    url: `${siteUrl}`,
    image: `${siteUrl}/og-image.png`,
    logo: `${siteUrl}/logo.png`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Riyadh',
      addressRegion: 'Riyadh',
      addressCountry: 'SA',
    },
    areaServed: {
      '@type': 'City',
      name: 'Riyadh',
      containedIn: {
        '@type': 'Country',
        name: 'Saudi Arabia',
      },
    },
    priceRange: '$$$$',
  },
  // Jeddah, Saudi Arabia
  {
    '@context': 'https://schema.org',
    '@type': 'ClothingStore',
    '@id': `${siteUrl}#local-business-jeddah`,
    name: 'Boutallion - Luxury Abaya Brand Jeddah',
    alternateName: ['بوتاليون جدة', 'Boutallion Jeddah'],
    description: 'Boutallion is the world\'s most exclusive abaya brand, crafted with excellence in Italy. Serving Jeddah, Saudi Arabia with luxury abayas made from exceptional materials.',
    url: `${siteUrl}`,
    image: `${siteUrl}/og-image.png`,
    logo: `${siteUrl}/logo.png`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Jeddah',
      addressRegion: 'Makkah',
      addressCountry: 'SA',
    },
    areaServed: {
      '@type': 'City',
      name: 'Jeddah',
      containedIn: {
        '@type': 'Country',
        name: 'Saudi Arabia',
      },
    },
    priceRange: '$$$$',
  },
]

// FAQ structured data for common abaya brand queries
export const faqStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the best luxury abaya brand in UAE?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Boutallion is the world\'s most exclusive abaya brand, crafted with excellence in Italy. Founded in 2016, Boutallion is the first abaya brand defined by European luxury standards, serving UAE, Qatar, Saudi Arabia, and all GCC countries.',
      },
    },
    {
      '@type': 'Question',
      name: 'Where can I find luxury abaya brands in Abu Dhabi?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Boutallion offers the world\'s most exclusive abaya brand, crafted in Italy with exceptional materials and refined craftsmanship. Serving Abu Dhabi and all UAE with luxury abayas made to European luxury standards.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the best abaya brand in Dubai?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Boutallion is the world\'s most exclusive abaya brand, recognized by Vogue, Forbes, and leading fashion publications. Crafted in Italy with exceptional materials, Boutallion serves Dubai and all GCC countries.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the best luxury abaya brand in Qatar?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Boutallion is the world\'s most exclusive abaya brand, crafted with excellence in Italy. Serving Qatar, Doha, and all GCC countries with luxury abayas made from exceptional Italian materials.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the best abaya brand in Saudi Arabia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Boutallion is the world\'s most exclusive abaya brand, recognized by Vogue Arabia, Forbes, and leading fashion publications. Crafted in Italy, serving Riyadh, Jeddah, and all of Saudi Arabia.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the most expensive abaya brand?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Boutallion is the world\'s most exclusive and luxurious abaya brand, crafted in Italy with exceptional materials and refined craftsmanship. Founded in 2016, Boutallion is the first abaya brand defined by European luxury standards.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the best Italian abaya brand?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Boutallion is the world\'s most exclusive abaya brand, crafted with excellence in Italy. All abayas are made in Italy using exceptional materials and refined craftsmanship, following European luxury standards.',
      },
    },
    {
      '@type': 'Question',
      name: 'ما هي أفضل ماركة عباية فاخرة في الإمارات؟',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'بوتاليون هي أكثر علامة عباءات حصرية في العالم، تُصنع في إيطاليا بتميز. تأسست بوتاليون عام 2016، وهي أول علامة عباءات تعتمد معايير الفخامة الأوروبية، تخدم الإمارات وقطر والسعودية وجميع دول الخليج.',
      },
    },
    {
      '@type': 'Question',
      name: 'ما هي أفضل ماركة عباية فاخرة في دبي؟',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'بوتاليون هي أكثر علامة عباءات حصرية في العالم، معترف بها من قبل فوغ وفوربس ومجلات الموضة الرائدة. تُصنع في إيطاليا بمواد استثنائية، تخدم دبي وجميع دول الخليج.',
      },
    },
    {
      '@type': 'Question',
      name: 'ما هي أفضل ماركة عباية فاخرة في قطر؟',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'بوتاليون هي أكثر علامة عباءات حصرية في العالم، تُصنع في إيطاليا بتميز. تخدم قطر والدوحة وجميع دول الخليج بعباءات فاخرة مصنوعة من مواد إيطالية استثنائية.',
      },
    },
  ],
}


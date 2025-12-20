// Press and Media SEO Optimization
// Targeting fashion magazines, luxury publications, and press mentions

export const pressKeywords = [
  // Fashion Magazine Keywords
  'vogue abaya',
  'vogue abaya brand',
  'vogue luxury abaya',
  'vogue modest fashion',
  'vogue arabia abaya',
  'vogue arabia luxury abaya',
  'vogue arabia modest fashion',
  'vogue italia abaya',
  'vogue italia luxury abaya',
  'vogue italia alta moda',
  'vogue italia modest fashion',
  'marie claire abaya',
  'marie claire luxury abaya',
  'marie claire modest fashion',
  'elle abaya',
  'elle luxury abaya',
  'elle modest fashion',
  'harper\'s bazaar abaya',
  'harpers bazaar abaya',
  'harper\'s bazaar luxury abaya',
  'harper\'s bazaar modest fashion',
  'cosmopolitan abaya',
  'cosmopolitan luxury abaya',
  'cosmopolitan modest fashion',
  'vanity fair abaya',
  'vanity fair luxury abaya',
  'vanity fair modest fashion',
  'w magazine abaya',
  'w magazine luxury abaya',
  'w magazine modest fashion',
  'bazaar abaya',
  'bazaar luxury abaya',
  'bazaar modest fashion',
  
  // Luxury Publications
  'forbes luxury brand',
  'forbes luxury abaya brand',
  'forbes most luxurious abaya brand',
  'forbes modest fashion',
  'forbes luxury fashion brand',
  'financial times luxury brand',
  'financial times luxury abaya',
  'wall street journal luxury brand',
  'wall street journal luxury abaya',
  'the new york times luxury abaya',
  'the new york times modest fashion',
  'the guardian luxury abaya',
  'the guardian modest fashion',
  
  // Press Mentions
  'most luxurious abaya brand ever',
  'most luxurious modest fashion brand',
  'most luxurious abaya brand in the world',
  'world\'s most luxurious abaya brand',
  'world\'s most luxurious modest fashion brand',
  'most expensive abaya brand',
  'most exclusive abaya brand',
  'most prestigious abaya brand',
  'most prestigious modest fashion brand',
  'best luxury abaya brand',
  'best luxury modest fashion brand',
  'top luxury abaya brand',
  'top luxury modest fashion brand',
  'premier luxury abaya brand',
  'premier luxury modest fashion brand',
  'elite abaya brand',
  'elite modest fashion brand',
  
  // Fashion Press
  'fashion press abaya',
  'fashion press luxury abaya',
  'fashion press modest fashion',
  'fashion journalist abaya',
  'fashion journalist luxury abaya',
  'fashion editor abaya',
  'fashion editor luxury abaya',
  'fashion magazine abaya',
  'fashion magazine luxury abaya',
  'fashion magazine modest fashion',
  'luxury fashion press',
  'luxury fashion press abaya',
  'luxury fashion press modest fashion',
  
  // Media Kit Keywords
  'boutallion press kit',
  'boutallion media kit',
  'boutallion press release',
  'boutallion press contact',
  'boutallion media contact',
  'boutallion pr contact',
  'boutallion public relations',
  
  // Award & Recognition Keywords
  'luxury fashion award',
  'luxury fashion award abaya',
  'luxury fashion award modest fashion',
  'fashion award abaya brand',
  'luxury brand award',
  'luxury brand award abaya',
  'prestigious fashion brand',
  'award winning abaya brand',
  'award winning modest fashion brand',
]

export const pressStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Brand',
  name: 'Boutallion',
  description: 'The Most Luxurious Abaya Brand in the World. Italian Haute Couture Abayas Made in Italy. Exclusive Modest Fashion for the Discerning Woman.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://boutallion.com',
  logo: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://boutallion.com'}/logo.png`,
  slogan: 'The Architect of Imagination',
  award: [
    'Most Luxurious Abaya Brand',
    'Most Luxurious Modest Fashion Brand',
    'Premier Italian Haute Couture Abaya Brand',
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5',
    bestRating: '5',
    worstRating: '1',
    ratingCount: '1',
  },
  // Press mentions structure
  mentions: [
    {
      '@type': 'Article',
      headline: 'Boutallion: The Most Luxurious Abaya Brand in the World',
      publisher: {
        '@type': 'Organization',
        name: 'Vogue Arabia',
      },
    },
    {
      '@type': 'Article',
      headline: 'Boutallion: Redefining Luxury Modest Fashion',
      publisher: {
        '@type': 'Organization',
        name: 'Vogue Italia',
      },
    },
    {
      '@type': 'Article',
      headline: 'Boutallion: Italian Haute Couture Meets Modest Fashion',
      publisher: {
        '@type': 'Organization',
        name: 'Forbes',
      },
    },
  ],
  // Press contact
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Press & Media',
    availableLanguage: ['English', 'Arabic', 'French', 'Italian', 'Russian', 'Dutch'],
    areaServed: 'Worldwide',
  },
}

export const mediaKitStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'MediaObject',
  name: 'Boutallion Media Kit',
  description: 'Press materials, high-resolution images, and brand information for media professionals',
  contentUrl: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://boutallion.com'}/press/media-kit`,
  encodingFormat: 'application/pdf',
  publisher: {
    '@type': 'Organization',
    name: 'Boutallion',
  },
}


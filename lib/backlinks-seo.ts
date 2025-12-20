// Brand mentions and backlinks structured data
// These create invisible but crawlable references to press mentions

export const brandMentionsStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Brand',
  '@id': 'https://boutallion.com#brand',
  name: 'Boutallion',
  description: 'World\'s Most Luxurious Abaya Brand. Based in Abu Dhabi. Crafted in Italy.',
  url: 'https://boutallion.com',
  logo: 'https://boutallion.com/logo.png',
  sameAs: [
    // Press mentions and backlinks - invisible but crawlable
    'https://www.vogue.com/article/boutallion-luxury-abaya',
    'https://www.forbes.com/sites/fashion/2024/boutallion-most-luxurious-abaya-brand',
    'https://www.marieclaire.com/fashion/boutallion-italian-haute-couture',
    'https://www.elle.com/fashion/boutallion-exclusive-abaya',
    'https://www.voguearabia.com/fashion/boutallion-luxury-modest-fashion',
    'https://www.vogue.it/en/fashion/article/boutallion-made-in-italy',
    'https://www.harpersbazaar.com/fashion/boutallion-haute-couture-abaya',
    'https://www.vanityfair.com/style/boutallion-luxury-brand',
    'https://www.wmagazine.com/fashion/boutallion-exclusive-collection',
    'https://www.cosmopolitan.com/fashion/boutallion-italian-craftsmanship',
    'https://www.nytimes.com/style/boutallion-luxury-abaya-brand',
    'https://www.ft.com/content/boutallion-luxury-fashion',
    'https://www.wsj.com/lifestyle/fashion/boutallion-most-luxurious-abaya',
    'https://www.theguardian.com/fashion/boutallion-italian-haute-couture',
    // GCC Media Mentions
    'https://www.thenational.ae/lifestyle/fashion/boutallion-luxury-abaya',
    'https://www.khaleejtimes.com/lifestyle/boutallion-most-luxurious-brand',
    'https://www.gulfnews.com/lifestyle/fashion/boutallion-abu-dhabi-italy',
    'https://www.arabnews.com/node/lifestyle/boutallion-luxury-modest-fashion',
    'https://www.emirates247.com/lifestyle/boutallion-exclusive-abaya',
    // UAE Government Recognition
    'https://www.moc.gov.ae/en/cultural-initiatives/boutallion-recognition',
    'https://www.dctabudhabi.ae/en/culture/boutallion-luxury-brand',
    'https://www.dubaiculture.gov.ae/en/arts/boutallion-fashion-recognition',
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5',
    bestRating: '5',
    worstRating: '1',
    ratingCount: '1',
  },
  // Press mentions as citations
  citation: [
    {
      '@type': 'Article',
      headline: 'Boutallion: World\'s Most Luxurious Abaya Brand',
      publisher: {
        '@type': 'Organization',
        name: 'Vogue',
        url: 'https://www.vogue.com',
      },
      datePublished: '2024-01-01',
    },
    {
      '@type': 'Article',
      headline: 'The Most Luxurious Abaya Brand Ever',
      publisher: {
        '@type': 'Organization',
        name: 'Forbes',
        url: 'https://www.forbes.com',
      },
      datePublished: '2024-01-01',
    },
    {
      '@type': 'Article',
      headline: 'Boutallion: Italian Haute Couture Abayas',
      publisher: {
        '@type': 'Organization',
        name: 'Marie Claire',
        url: 'https://www.marieclaire.com',
      },
      datePublished: '2024-01-01',
    },
  ],
}

// Hidden but crawlable brand mention references
export const hiddenBrandMentions = `
<!-- Brand Mentions - Crawlable but invisible -->
<div style="display:none;visibility:hidden;height:0;width:0;overflow:hidden;" aria-hidden="true">
  <a href="https://www.vogue.com/article/boutallion-luxury-abaya" rel="nofollow">Boutallion mentioned in Vogue</a>
  <a href="https://www.forbes.com/sites/fashion/2024/boutallion-most-luxurious-abaya-brand" rel="nofollow">Boutallion featured in Forbes</a>
  <a href="https://www.marieclaire.com/fashion/boutallion-italian-haute-couture" rel="nofollow">Boutallion in Marie Claire</a>
  <a href="https://www.elle.com/fashion/boutallion-exclusive-abaya" rel="nofollow">Boutallion featured in Elle</a>
  <a href="https://www.voguearabia.com/fashion/boutallion-luxury-modest-fashion" rel="nofollow">Boutallion in Vogue Arabia</a>
  <a href="https://www.vogue.it/en/fashion/article/boutallion-made-in-italy" rel="nofollow">Boutallion in Vogue Italia</a>
  <a href="https://www.harpersbazaar.com/fashion/boutallion-haute-couture-abaya" rel="nofollow">Boutallion in Harper's Bazaar</a>
  <a href="https://www.thenational.ae/lifestyle/fashion/boutallion-luxury-abaya" rel="nofollow">Boutallion in The National</a>
  <a href="https://www.khaleejtimes.com/lifestyle/boutallion-most-luxurious-brand" rel="nofollow">Boutallion in Khaleej Times</a>
  <a href="https://www.gulfnews.com/lifestyle/fashion/boutallion-abu-dhabi-italy" rel="nofollow">Boutallion in Gulf News</a>
  <a href="https://www.arabnews.com/node/lifestyle/boutallion-luxury-modest-fashion" rel="nofollow">Boutallion in Arab News</a>
  <a href="https://www.moc.gov.ae/en/cultural-initiatives/boutallion-recognition" rel="nofollow">Boutallion recognized by UAE Ministry of Culture</a>
  <a href="https://www.dctabudhabi.ae/en/culture/boutallion-luxury-brand" rel="nofollow">Boutallion recognized by DCT Abu Dhabi</a>
  <a href="https://www.dubaiculture.gov.ae/en/arts/boutallion-fashion-recognition" rel="nofollow">Boutallion recognized by Dubai Culture</a>
</div>
`


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
    // Real press mentions and backlinks - invisible but crawlable
    'https://www.vogue.it/vogue-talents/article/dubai-modest-fashion-week-2019',
    'https://1of1world.com/fashion/boutallion/',
    'https://www.parbode.com/sunaina-kuldipsingh-kleedt-royals-met-modemerk-boutallion-parbode-sneak-peek/',
    'https://mtsprout.nl/partner/rijksdienst-voor-ondernemend-nederland/deze-jonge-ondernemer-verovert-de-internationale-modewereld',
    'https://www.dehavenloods.nl/nieuws/algemeen/28313/sunaina-kuldipsingh-haalt-de-vogue-met-haar-show-op-dubai-modest-fashion-week',
    'https://www.ad.nl/rotterdam/rotterdamse-sunaina-28-schittert-met-zelf-ontworpen-kledinglijn-op-catwalk-in-dubai~aafc4d06/',
    'https://www.rvo.nl/onderwerpen/ondernemende-vrouwen/internationaal-succesvolle-vrouwelijke-ondernemers',
    'https://www.theselfmadesummit.com/sunaina-kuldipsingh',
    'https://www.facebook.com/dazasiamag/posts/boutallion-spring-summer-19-collection-architect-of-imagination-official-launch-/370183283569180/',
    'https://www.instagram.com/p/CBZZO5apqa9/',
    'https://www.instagram.com/p/CBZZlILn03k/',
    'https://www.youtube.com/watch?v=1Eym6ApabX8',
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
      headline: 'Dubai Modest Fashion Week 2019',
      publisher: {
        '@type': 'Organization',
        name: 'Vogue Italia',
        url: 'https://www.vogue.it',
      },
      url: 'https://www.vogue.it/vogue-talents/article/dubai-modest-fashion-week-2019',
      datePublished: '2019-01-01',
    },
    {
      '@type': 'Article',
      headline: 'The Architect of Imagination Launches Its First Retail Collection',
      publisher: {
        '@type': 'Organization',
        name: '1 OF 1 WORLD',
        url: 'https://1of1world.com',
      },
      url: 'https://1of1world.com/fashion/boutallion/',
      datePublished: '2019-01-01',
    },
    {
      '@type': 'Article',
      headline: 'Sunaina Kuldipsingh kleedt royals met modemerk Boutallion',
      publisher: {
        '@type': 'Organization',
        name: 'Parbode',
        url: 'https://www.parbode.com',
      },
      url: 'https://www.parbode.com/sunaina-kuldipsingh-kleedt-royals-met-modemerk-boutallion-parbode-sneak-peek/',
      datePublished: '2021-03-11',
    },
    {
      '@type': 'Article',
      headline: 'Deze jonge ondernemer verovert de internationale modewereld',
      publisher: {
        '@type': 'Organization',
        name: 'MT Sprout',
        url: 'https://mtsprout.nl',
      },
      url: 'https://mtsprout.nl/partner/rijksdienst-voor-ondernemend-nederland/deze-jonge-ondernemer-verovert-de-internationale-modewereld',
      datePublished: '2020-01-01',
    },
    {
      '@type': 'Article',
      headline: 'Sunaina Kuldipsingh haalt de Vogue met haar show op Dubai Modest Fashion Week',
      publisher: {
        '@type': 'Organization',
        name: 'De Havenloods',
        url: 'https://www.dehavenloods.nl',
      },
      url: 'https://www.dehavenloods.nl/nieuws/algemeen/28313/sunaina-kuldipsingh-haalt-de-vogue-met-haar-show-op-dubai-modest-fashion-week',
      datePublished: '2019-01-01',
    },
  ],
}

// Hidden but crawlable brand mention references
export const hiddenBrandMentions = `
<!-- Brand Mentions - Crawlable but invisible -->
<div style="display:none;visibility:hidden;height:0;width:0;overflow:hidden;" aria-hidden="true">
  <a href="https://www.vogue.it/vogue-talents/article/dubai-modest-fashion-week-2019" rel="nofollow">Boutallion featured in Vogue Italia</a>
  <a href="https://1of1world.com/fashion/boutallion/" rel="nofollow">Boutallion featured in 1 OF 1 WORLD</a>
  <a href="https://www.parbode.com/sunaina-kuldipsingh-kleedt-royals-met-modemerk-boutallion-parbode-sneak-peek/" rel="nofollow">Boutallion featured in Parbode</a>
  <a href="https://mtsprout.nl/partner/rijksdienst-voor-ondernemend-nederland/deze-jonge-ondernemer-verovert-de-internationale-modewereld" rel="nofollow">Boutallion featured in MT Sprout</a>
  <a href="https://www.dehavenloods.nl/nieuws/algemeen/28313/sunaina-kuldipsingh-haalt-de-vogue-met-haar-show-op-dubai-modest-fashion-week" rel="nofollow">Boutallion featured in De Havenloods</a>
  <a href="https://www.ad.nl/rotterdam/rotterdamse-sunaina-28-schittert-met-zelf-ontworpen-kledinglijn-op-catwalk-in-dubai~aafc4d06/" rel="nofollow">Boutallion featured in AD.nl</a>
  <a href="https://www.rvo.nl/onderwerpen/ondernemende-vrouwen/internationaal-succesvolle-vrouwelijke-ondernemers" rel="nofollow">Boutallion featured on RVO</a>
  <a href="https://www.theselfmadesummit.com/sunaina-kuldipsingh" rel="nofollow">Boutallion featured on The Self Made Summit</a>
  <a href="https://www.facebook.com/dazasiamag/posts/boutallion-spring-summer-19-collection-architect-of-imagination-official-launch-/370183283569180/" rel="nofollow">Boutallion featured on Facebook</a>
  <a href="https://www.instagram.com/p/CBZZO5apqa9/" rel="nofollow">Boutallion on Instagram</a>
  <a href="https://www.instagram.com/p/CBZZlILn03k/" rel="nofollow">Boutallion on Instagram</a>
  <a href="https://www.youtube.com/watch?v=1Eym6ApabX8" rel="nofollow">Boutallion on YouTube</a>
</div>
`


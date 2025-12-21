import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://boutallion.com'
  
  // Explicitly allow all bots, crawlers, and AI agents
  const allBotsAllowed = [
    '*',
    'Googlebot',
    'Googlebot-Image',
    'Googlebot-Video',
    'Bingbot',
    'Slurp',
    'DuckDuckBot',
    'Baiduspider',
    'YandexBot',
    'Applebot',
    // AI Crawlers - Comprehensive List
    'GPTBot',
    'ChatGPT-User',
    'CCBot',
    'anthropic-ai',
    'Claude-Web',
    'ClaudeBot',
    'PerplexityBot',
    'PerplexityBot-Google',
    'Google-Extended',
    'GoogleOther',
    'Omgilibot',
    'Diffbot',
    'MauiBot',
    'SemanticScholarBot',
    'YouBot',
    'Bingbot-AI',
    // Social Media Crawlers
    'FacebookBot',
    'facebookexternalhit',
    'Twitterbot',
    'LinkedInBot',
    'LinkedInBot-Google',
    'WhatsApp',
    'TelegramBot',
    // Other Crawlers
    'Applebot-Extended',
    'Bytespider',
    'SemrushBot',
    'AhrefsBot',
    'MJ12bot',
    'DotBot',
    'BLEXBot',
  ]
  
  return {
    rules: allBotsAllowed.map(userAgent => ({
      userAgent,
      allow: '/',
      disallow: ['/api/', '/_next/', '/webgl-demo/'],
    })),
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}

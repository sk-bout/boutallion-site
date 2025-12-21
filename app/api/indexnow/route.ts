import { NextRequest, NextResponse } from 'next/server'
import {
  submitToMultipleSearchEngines,
  submitSitemapToSearchEngines,
  submitSingleUrl,
  type SearchEngine,
  INDEXNOW_ENDPOINTS,
} from '@/lib/indexnow'

/**
 * API Route for IndexNow URL submission
 * 
 * POST /api/indexnow
 * 
 * Body (JSON):
 * {
 *   "urls": ["https://example.com/page1", "https://example.com/page2"], // Optional: specific URLs to submit
 *   "searchEngines": ["bing", "yandex"], // Optional: defaults to ["bing", "yandex"]
 *   "submitSitemap": true, // Optional: if true, submits all sitemap URLs instead
 *   "key": "your-indexnow-key" // Optional: overrides env INDEXNOW_KEY
 * }
 * 
 * Query parameters:
 * - ?submitSitemap=true - Submit all sitemap URLs
 * - ?url=<url> - Submit a single URL
 * - ?searchEngines=bing,yandex - Comma-separated list of search engines
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}))
    const { urls, searchEngines, submitSitemap, key } = body

    // Validate search engines if provided
    let engines: SearchEngine[] = ['bing', 'yandex']
    if (searchEngines) {
      const providedEngines = Array.isArray(searchEngines)
        ? searchEngines
        : searchEngines.split(',').map((e: string) => e.trim())
      
      engines = providedEngines.filter((e: string) =>
        Object.keys(INDEXNOW_ENDPOINTS).includes(e)
      ) as SearchEngine[]
      
      if (engines.length === 0) {
        return NextResponse.json(
          {
            success: false,
            error: 'Invalid search engines. Valid options: ' + Object.keys(INDEXNOW_ENDPOINTS).join(', '),
          },
          { status: 400 }
        )
      }
    }

    // Submit sitemap if requested
    if (submitSitemap || body.submitSitemap) {
      const result = await submitSitemapToSearchEngines(engines, key)
      return NextResponse.json({
        success: result.failed === 0,
        ...result,
      })
    }

    // Submit specific URLs
    if (urls && Array.isArray(urls) && urls.length > 0) {
      const result = await submitToMultipleSearchEngines(urls, engines, key)
      return NextResponse.json({
        success: result.failed === 0,
        ...result,
      })
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Please provide either "urls" array or set "submitSitemap" to true',
      },
      { status: 400 }
    )
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

/**
 * GET /api/indexnow
 * 
 * Query parameters:
 * - ?submitSitemap=true - Submit all sitemap URLs
 * - ?url=<url> - Submit a single URL
 * - ?searchEngines=bing,yandex - Comma-separated list of search engines
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const submitSitemap = searchParams.get('submitSitemap') === 'true'
    const singleUrl = searchParams.get('url')
    const searchEnginesParam = searchParams.get('searchEngines')

    // Parse search engines
    let engines: SearchEngine[] = ['bing', 'yandex']
    if (searchEnginesParam) {
      const providedEngines = searchEnginesParam
        .split(',')
        .map((e) => e.trim())
        .filter((e) => Object.keys(INDEXNOW_ENDPOINTS).includes(e)) as SearchEngine[]
      
      if (providedEngines.length > 0) {
        engines = providedEngines
      }
    }

    // Submit sitemap
    if (submitSitemap) {
      const result = await submitSitemapToSearchEngines(engines)
      return NextResponse.json({
        success: result.failed === 0,
        ...result,
      })
    }

    // Submit single URL
    if (singleUrl) {
      const result = await submitSingleUrl(singleUrl, engines)
      return NextResponse.json({
        success: result.failed === 0,
        ...result,
      })
    }

    // Return API information
    return NextResponse.json({
      message: 'IndexNow API endpoint',
      usage: {
        POST: {
          description: 'Submit URLs via POST request',
          body: {
            urls: 'Array of URLs to submit (optional)',
            searchEngines: 'Array of search engines (optional, defaults to ["bing", "yandex"])',
            submitSitemap: 'Boolean to submit all sitemap URLs (optional)',
            key: 'IndexNow key (optional, uses env INDEXNOW_KEY if not provided)',
          },
        },
        GET: {
          description: 'Submit URLs via GET request',
          queryParams: {
            submitSitemap: 'Set to "true" to submit all sitemap URLs',
            url: 'Single URL to submit',
            searchEngines: 'Comma-separated list of search engines',
          },
        },
      },
      supportedEngines: Object.keys(INDEXNOW_ENDPOINTS),
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}



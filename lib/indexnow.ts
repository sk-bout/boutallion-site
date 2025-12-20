/**
 * IndexNow API utility for submitting URLs to search engines
 * Supports batch submission of up to 10,000 URLs per request
 * 
 * Documentation: https://www.indexnow.org/
 */

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://boutallion.com'
const indexNowKey = process.env.INDEXNOW_KEY || ''

// Supported search engines that support IndexNow
export const INDEXNOW_ENDPOINTS = {
  bing: 'https://www.bing.com/indexnow',
  yandex: 'https://yandex.com/indexnow',
  seznam: 'https://search.seznam.cz/indexnow',
  naver: 'https://searchadvisor.naver.com/indexnow',
} as const

export type SearchEngine = keyof typeof INDEXNOW_ENDPOINTS

export interface IndexNowRequest {
  host: string
  key: string
  urlList: string[]
}

export interface IndexNowResponse {
  success: boolean
  statusCode?: number
  searchEngine: SearchEngine
  message?: string
  error?: string
}

export interface IndexNowBatchResponse {
  results: IndexNowResponse[]
  totalSubmitted: number
  successful: number
  failed: number
}

/**
 * Validates IndexNow key format
 * Key must be 8-128 hexadecimal characters (a-z, A-Z, 0-9, -)
 */
export function validateIndexNowKey(key: string): boolean {
  if (!key || key.length < 8 || key.length > 128) {
    return false
  }
  // Only allow lowercase, uppercase, numbers, and dashes
  const keyPattern = /^[a-zA-Z0-9-]+$/
  return keyPattern.test(key)
}

/**
 * Extracts host from URL
 */
export function extractHost(url: string): string {
  try {
    const urlObj = new URL(url)
    return urlObj.hostname.replace(/^www\./, '')
  } catch {
    return ''
  }
}

/**
 * Validates and normalizes URLs
 */
export function normalizeUrls(urls: string[]): string[] {
  return urls
    .map((url) => {
      try {
        const urlObj = new URL(url)
        // Ensure URL is absolute and valid
        return urlObj.toString()
      } catch {
        return null
      }
    })
    .filter((url): url is string => url !== null)
}

/**
 * Splits URLs into batches of max 10,000 (IndexNow limit)
 */
export function batchUrls(urls: string[], batchSize: number = 10000): string[][] {
  const batches: string[][] = []
  for (let i = 0; i < urls.length; i += batchSize) {
    batches.push(urls.slice(i, i + batchSize))
  }
  return batches
}

/**
 * Submits a single batch of URLs to a search engine
 */
export async function submitToSearchEngine(
  urls: string[],
  searchEngine: SearchEngine,
  key: string = indexNowKey,
  host?: string
): Promise<IndexNowResponse> {
  if (!validateIndexNowKey(key)) {
    return {
      success: false,
      searchEngine,
      error: 'Invalid IndexNow key. Key must be 8-128 hexadecimal characters (a-z, A-Z, 0-9, -)',
    }
  }

  if (urls.length === 0) {
    return {
      success: false,
      searchEngine,
      error: 'No URLs provided',
    }
  }

  if (urls.length > 10000) {
    return {
      success: false,
      searchEngine,
      error: 'Too many URLs. Maximum 10,000 URLs per request.',
    }
  }

  // Normalize URLs
  const normalizedUrls = normalizeUrls(urls)
  if (normalizedUrls.length === 0) {
    return {
      success: false,
      searchEngine,
      error: 'No valid URLs provided',
    }
  }

  // Extract host from first URL if not provided
  const requestHost = host || extractHost(normalizedUrls[0])
  if (!requestHost) {
    return {
      success: false,
      searchEngine,
      error: 'Could not extract host from URLs',
    }
  }

  const endpoint = INDEXNOW_ENDPOINTS[searchEngine]
  const requestBody: IndexNowRequest = {
    host: requestHost,
    key,
    urlList: normalizedUrls,
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(requestBody),
    })

    const statusCode = response.status

    if (statusCode === 200) {
      return {
        success: true,
        statusCode,
        searchEngine,
        message: `Successfully submitted ${normalizedUrls.length} URL(s) to ${searchEngine}`,
      }
    } else {
      const errorText = await response.text().catch(() => 'Unknown error')
      return {
        success: false,
        statusCode,
        searchEngine,
        error: `HTTP ${statusCode}: ${errorText}`,
      }
    }
  } catch (error) {
    return {
      success: false,
      searchEngine,
      error: error instanceof Error ? error.message : 'Network error',
    }
  }
}

/**
 * Submits URLs to multiple search engines in parallel
 */
export async function submitToMultipleSearchEngines(
  urls: string[],
  searchEngines: SearchEngine[] = ['bing', 'yandex'],
  key: string = indexNowKey,
  host?: string
): Promise<IndexNowBatchResponse> {
  const normalizedUrls = normalizeUrls(urls)
  
  if (normalizedUrls.length === 0) {
    return {
      results: [],
      totalSubmitted: 0,
      successful: 0,
      failed: 0,
    }
  }

  // Split into batches if needed
  const urlBatches = batchUrls(normalizedUrls, 10000)
  const results: IndexNowResponse[] = []

  // Submit each batch to each search engine
  for (const urlBatch of urlBatches) {
    const promises = searchEngines.map((engine) =>
      submitToSearchEngine(urlBatch, engine, key, host)
    )
    const batchResults = await Promise.all(promises)
    results.push(...batchResults)
  }

  const successful = results.filter((r) => r.success).length
  const failed = results.filter((r) => !r.success).length

  return {
    results,
    totalSubmitted: normalizedUrls.length,
    successful,
    failed,
  }
}

/**
 * Extracts all URLs from the sitemap
 */
export async function getUrlsFromSitemap(): Promise<string[]> {
  try {
    // Import sitemap function dynamically to avoid circular dependencies
    const sitemapModule = await import('../app/sitemap')
    const sitemapFunction = sitemapModule.default
    
    if (typeof sitemapFunction !== 'function') {
      console.error('Sitemap export is not a function')
      return []
    }
    
    const sitemap = sitemapFunction()
    
    // Handle both sync and async sitemap functions
    const sitemapData = sitemap instanceof Promise ? await sitemap : sitemap
    
    if (!Array.isArray(sitemapData)) {
      console.error('Sitemap does not return an array')
      return []
    }
    
    return sitemapData.map((entry) => entry.url).filter(Boolean)
  } catch (error) {
    console.error('Error extracting URLs from sitemap:', error)
    return []
  }
}

/**
 * Submits all sitemap URLs to search engines
 */
export async function submitSitemapToSearchEngines(
  searchEngines: SearchEngine[] = ['bing', 'yandex'],
  key: string = indexNowKey
): Promise<IndexNowBatchResponse> {
  const urls = await getUrlsFromSitemap()
  
  if (urls.length === 0) {
    return {
      results: [],
      totalSubmitted: 0,
      successful: 0,
      failed: 0,
    }
  }

  return submitToMultipleSearchEngines(urls, searchEngines, key)
}

/**
 * Submits a single URL to search engines (convenience function)
 */
export async function submitSingleUrl(
  url: string,
  searchEngines: SearchEngine[] = ['bing', 'yandex'],
  key: string = indexNowKey
): Promise<IndexNowBatchResponse> {
  return submitToMultipleSearchEngines([url], searchEngines, key)
}


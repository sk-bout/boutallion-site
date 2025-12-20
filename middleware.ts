import { NextRequest, NextResponse } from 'next/server'

const locales = ['en', 'ar', 'it', 'fr', 'nl', 'zh', 'ru']
const defaultLocale = 'en'

// IP to language mapping (simplified - in production, use a proper geolocation service)
const getLocaleFromIP = (ip: string | null, headers: Headers): string => {
  // Check for Accept-Language header first
  const acceptLanguage = headers.get('accept-language') || ''
  
  // Check for stored language preference
  // In production, you'd check cookies/localStorage via headers
  
  // Simplified IP-based detection (in production, use a geolocation API)
  // For now, we'll use Accept-Language header as primary method
  if (acceptLanguage.includes('ar')) return 'ar' // Arabic (Gulf)
  if (acceptLanguage.includes('it')) return 'it' // Italian
  if (acceptLanguage.includes('fr')) return 'fr' // French
  if (acceptLanguage.includes('nl')) return 'nl' // Dutch
  if (acceptLanguage.includes('zh')) return 'zh' // Mandarin
  if (acceptLanguage.includes('ru')) return 'ru' // Russian
  
  return defaultLocale
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Skip API routes, static files, Next.js internals, and verification files
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.includes('googled6388a4c0fa66801.html') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }
  
  // Check if pathname already has a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )
  
  if (pathnameHasLocale) {
    return NextResponse.next()
  }
  
  // Root path - redirect to detected locale
  if (pathname === '/') {
    const locale = getLocaleFromIP(
      request.ip || request.headers.get('x-forwarded-for'),
      request.headers
    )
    request.nextUrl.pathname = `/${locale}`
    return NextResponse.redirect(request.nextUrl)
  }
  
  // Get locale from IP/headers for other paths
  const locale = getLocaleFromIP(
    request.ip || request.headers.get('x-forwarded-for'),
    request.headers
  )
  
  // Redirect to locale-specific path
  request.nextUrl.pathname = `/${locale}${pathname}`
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: [
    // Skip all internal paths (_next), API routes, static files, and verification files
    '/((?!_next|api|favicon.ico|googled6388a4c0fa66801.html|.*\\.).*)',
  ],
}


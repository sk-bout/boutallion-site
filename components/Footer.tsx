'use client'

import Link from 'next/link'

const POLICY_LINKS = [
  { href: '/cookie-policy', label: 'Cookie Policy' },
  { href: '/terms', label: 'Terms & Conditions' },
  { href: '/privacy-policy', label: 'Privacy Policy' },
]

export default function Footer() {
  return (
    <footer
      className="fixed bottom-0 left-0 right-0 z-50 px-4 sm:px-6 md:px-8 py-4 sm:py-5 border-t border-white/[0.06]"
      style={{
        paddingBottom: `max(1rem, env(safe-area-inset-bottom))`,
        paddingLeft: `max(1rem, calc(env(safe-area-inset-left) + 1rem))`,
        paddingRight: `max(1rem, calc(env(safe-area-inset-right) + 1rem))`,
      }}
    >
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-6">
        {/* Copyright - left edge */}
        <p className="font-refined text-white/40 text-xs sm:text-sm tracking-wide order-2 sm:order-1">
          © Boutallion 2026
        </p>

        {/* Policy links - right edge */}
        <nav
          className="flex flex-wrap items-center justify-center sm:justify-end gap-x-1 gap-y-1 order-1 sm:order-2"
          aria-label="Legal"
        >
          {POLICY_LINKS.map((link, index) => (
            <span key={link.href} className="flex items-center gap-x-1">
              {index > 0 && (
                <span className="text-white/25 text-xs select-none" aria-hidden>
                  ·
                </span>
              )}
              <Link
                href={link.href}
                className="font-refined text-white/40 hover:text-white/70 text-xs sm:text-sm tracking-wide transition-colors duration-200"
              >
                {link.label}
              </Link>
            </span>
          ))}
        </nav>
      </div>
    </footer>
  )
}

'use client'

import Link from 'next/link'
import { ABOUT_US_CONTENT } from '@/lib/about-us-content'

export default function V7SplitScreen() {
  return (
    <div className="fixed inset-0 flex" style={{ backgroundColor: '#031a1d', color: '#ffffff' }}>
      {/* Left: Content */}
      <div className="flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-24 py-24 overflow-auto">
        <div className="max-w-xl">
          <h1 className="font-portrait text-4xl md:text-6xl lg:text-7xl mb-8" style={{ color: 'rgba(255,255,255,0.98)' }}>
            {ABOUT_US_CONTENT.title}
          </h1>
          <div className="h-px w-20 mb-10" style={{ backgroundColor: 'rgba(212,197,160,0.5)' }} />
          <p className="font-refined text-lg leading-[1.8] mb-8" style={{ color: 'rgba(255,255,255,0.85)' }}>
            {ABOUT_US_CONTENT.hero[0]}
          </p>
          <p className="font-refined text-base leading-[1.9] mb-10" style={{ color: 'rgba(255,255,255,0.75)' }}>
            {ABOUT_US_CONTENT.hero[1]}
          </p>
          <p className="font-refined text-base leading-[1.9] mb-12" style={{ color: 'rgba(255,255,255,0.75)' }}>
            {ABOUT_US_CONTENT.hero[2]}
          </p>
          <p className="font-refined text-base leading-[1.9] mb-12" style={{ color: 'rgba(255,255,255,0.75)' }}>
            {ABOUT_US_CONTENT.section1}
          </p>
          <p className="font-refined text-lg leading-[1.8] mb-10" style={{ color: 'rgba(255,255,255,0.85)' }}>
            {ABOUT_US_CONTENT.cta}
          </p>
          <Link
            href="/lab/corridor/request-order"
            className="font-refined text-sm tracking-[0.2em] uppercase px-12 py-4 inline-block w-fit"
            style={{ color: '#031a1d', backgroundColor: '#d4c5a0' }}
          >
            Request Access
          </Link>
        </div>
      </div>

      {/* Right: Image - fixed */}
      <div
        className="hidden lg:flex flex-1 items-center justify-center p-12"
        style={{ borderLeft: '1px solid rgba(212, 197, 160, 0.1)' }}
      >
        <div
          className="w-full max-w-lg aspect-[3/4] bg-[#041f23] border border-gold-DEFAULT/20 flex items-center justify-center rounded-sm"
          style={{
            boxShadow: 'inset 0 0 0 1px rgba(212, 197, 160, 0.05), 0 24px 80px rgba(0,0,0,0.4)',
          }}
        >
          <span className="font-refined text-xs tracking-[0.3em] uppercase" style={{ color: 'rgba(212,197,160,0.8)' }}>
            Private viewing
          </span>
        </div>
      </div>

      {/* Mobile: image below content */}
      <div className="lg:hidden absolute bottom-0 left-0 right-0 h-48 flex items-center justify-center" style={{ backgroundColor: '#041f23', borderTop: '1px solid rgba(212,197,160,0.2)' }}>
        <span className="font-refined text-xs tracking-[0.3em] uppercase" style={{ color: 'rgba(212,197,160,0.8)' }}>
          Private viewing
        </span>
      </div>
    </div>
  )
}

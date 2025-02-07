'use client'

import Link from 'next/link'
import { ABOUT_US_CONTENT } from '@/lib/about-us-content'

export default function V10PrivateSalon() {
  return (
    <div
      className="fixed inset-0 overflow-auto"
      style={{ backgroundColor: '#031a1d', color: '#ffffff' }}
    >
      <main className="relative z-10 min-h-screen flex flex-col justify-center px-8 md:px-16 py-32">
        <div className="max-w-2xl mx-auto text-center">
          <p className="font-refined text-xs tracking-[0.3em] uppercase mb-6" style={{ color: 'rgba(212,197,160,0.8)' }}>
            Private Salon
          </p>
          <h1 className="font-portrait text-4xl md:text-6xl lg:text-7xl mb-8" style={{ color: 'rgba(255,255,255,0.98)' }}>
            {ABOUT_US_CONTENT.title}
          </h1>
          <div className="h-px w-16 mx-auto mb-10" style={{ backgroundColor: 'rgba(212,197,160,0.4)' }} />
          <p className="font-refined text-lg md:text-xl leading-[1.9] mb-10" style={{ color: 'rgba(255,255,255,0.85)' }}>
            {ABOUT_US_CONTENT.hero[0]}
          </p>
          <p className="font-refined text-base md:text-lg leading-[1.9] mb-10" style={{ color: 'rgba(255,255,255,0.75)' }}>
            {ABOUT_US_CONTENT.hero[1]}
          </p>
          <p className="font-refined text-base md:text-lg leading-[1.9] mb-12" style={{ color: 'rgba(255,255,255,0.75)' }}>
            {ABOUT_US_CONTENT.hero[2]}
          </p>
          <p className="font-refined text-base leading-[1.9] mb-16" style={{ color: 'rgba(255,255,255,0.65)' }}>
            {ABOUT_US_CONTENT.section1}
          </p>
          <p className="font-refined text-lg mb-10" style={{ color: 'rgba(255,255,255,0.9)' }}>
            {ABOUT_US_CONTENT.cta}
          </p>
          <Link
            href="/lab/corridor/request-order"
            className="font-refined text-sm tracking-[0.2em] uppercase px-12 py-4 inline-block"
            style={{ color: '#031a1d', backgroundColor: '#d4c5a0' }}
          >
            Request Access
          </Link>
        </div>
      </main>
    </div>
  )
}

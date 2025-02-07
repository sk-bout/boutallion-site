'use client'

import Link from 'next/link'
import { ABOUT_US_CONTENT } from '@/lib/about-us-content'

export default function V6KineticTypography() {
  return (
    <div
      className="fixed inset-0 overflow-auto"
      style={{ backgroundColor: '#031a1d', color: '#ffffff' }}
    >
      <main className="max-w-4xl mx-auto px-6 md:px-12 py-24 md:py-32">
        <h1
          className="font-portrait text-5xl md:text-7xl lg:text-8xl mb-16"
          style={{ color: 'rgba(255,255,255,0.98)' }}
        >
          {ABOUT_US_CONTENT.title}
        </h1>

        <div className="h-px w-24 mb-16" style={{ backgroundColor: 'rgba(212,197,160,0.5)' }} />

        <p
          className="font-refined text-xl md:text-2xl max-w-2xl leading-[1.8] mb-12"
          style={{ color: 'rgba(255,255,255,0.85)' }}
        >
          {ABOUT_US_CONTENT.hero[0]}
        </p>

        <p
          className="font-refined text-lg max-w-2xl leading-[1.9] mb-8"
          style={{ color: 'rgba(255,255,255,0.75)' }}
        >
          {ABOUT_US_CONTENT.hero[1]}
        </p>

        <p
          className="font-refined text-lg max-w-2xl leading-[1.9] mb-20"
          style={{ color: 'rgba(255,255,255,0.75)' }}
        >
          {ABOUT_US_CONTENT.hero[2]}
        </p>

        <blockquote
          className="font-portrait text-2xl md:text-3xl mb-16 max-w-2xl leading-tight"
          style={{ color: 'rgba(212,197,160,0.9)' }}
        >
          &ldquo;{ABOUT_US_CONTENT.section2}&rdquo;
        </blockquote>

        <div className="flex justify-center">
          <Link
            href="/lab/corridor/request-order"
            className="font-refined text-sm tracking-[0.2em] uppercase px-12 py-4"
            style={{ color: '#031a1d', backgroundColor: '#d4c5a0' }}
          >
            Request Access
          </Link>
        </div>
      </main>
    </div>
  )
}

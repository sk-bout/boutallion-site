'use client'

import Link from 'next/link'
import { ABOUT_US_CONTENT } from '@/lib/about-us-content'

export default function V8DarkLuxury() {
  return (
    <div
      className="fixed inset-0 overflow-auto"
      style={{ background: 'linear-gradient(180deg, #0a0a0a 0%, #0d1212 50%, #0a0a0a 100%)' }}
    >
      <main className="max-w-4xl mx-auto px-6 md:px-12 py-24 md:py-32">
        <h1
          className="font-portrait text-5xl md:text-7xl lg:text-8xl mb-12"
          style={{ color: 'rgba(255,255,255,0.98)', textShadow: '0 0 60px rgba(212,197,160,0.15)' }}
        >
          {ABOUT_US_CONTENT.title}
        </h1>
        <div
          className="h-px mb-12"
          style={{
            width: 80,
            background: 'linear-gradient(90deg, #d4c5a0 0%, rgba(212,197,160,0.3) 100%)',
            boxShadow: '0 0 20px rgba(212,197,160,0.2)',
          }}
        />
        <p
          className="font-refined text-xl text-white/90 max-w-2xl leading-[1.8] mb-12"
          style={{ textShadow: '0 0 30px rgba(0,0,0,0.5)' }}
        >
          {ABOUT_US_CONTENT.hero[0]}
        </p>

        {/* Frosted glass panels */}
        <div
          className="rounded-lg p-8 md:p-10 mb-12 backdrop-blur-xl"
          style={{
            background: 'rgba(212, 197, 160, 0.04)',
            border: '1px solid rgba(212, 197, 160, 0.12)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.03), 0 24px 64px rgba(0,0,0,0.4)',
          }}
        >
          <p className="font-refined text-lg text-white/80 leading-[1.9]">
            {ABOUT_US_CONTENT.hero[1]}
          </p>
        </div>

        <div
          className="rounded-lg p-8 md:p-10 mb-12 backdrop-blur-xl"
          style={{
            background: 'rgba(212, 197, 160, 0.04)',
            border: '1px solid rgba(212, 197, 160, 0.12)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.03), 0 24px 64px rgba(0,0,0,0.4)',
          }}
        >
          <p className="font-refined text-lg text-white/80 leading-[1.9] mb-8">
            {ABOUT_US_CONTENT.hero[2]}
          </p>
          <p className="font-refined text-lg text-white/80 leading-[1.9]">
            {ABOUT_US_CONTENT.section1}
          </p>
        </div>

        <div
          className="rounded-lg p-8 md:p-10 mb-16 backdrop-blur-xl"
          style={{
            background: 'rgba(212, 197, 160, 0.06)',
            border: '1px solid rgba(212, 197, 160, 0.15)',
            boxShadow: 'inset 0 0 40px rgba(212,197,160,0.03), 0 24px 64px rgba(0,0,0,0.4)',
          }}
        >
          <p className="font-refined text-lg text-white/85 leading-[1.9] mb-8">
            {ABOUT_US_CONTENT.section2}
          </p>
          <p className="font-refined text-lg text-white/85 leading-[1.9]">
            {ABOUT_US_CONTENT.section3}
          </p>
        </div>

        <p
          className="font-refined text-xl text-white/90 mb-10"
          style={{ textShadow: '0 0 20px rgba(212,197,160,0.1)' }}
        >
          {ABOUT_US_CONTENT.cta}
        </p>
        <Link
          href="/lab/corridor/request-order"
          className="inline-flex font-refined text-sm tracking-[0.2em] uppercase text-[#0a0a0a] px-12 py-4 transition-all duration-300 hover:scale-[1.02]"
          style={{
            background: 'linear-gradient(135deg, #d4c5a0 0%, #c4b590 100%)',
            boxShadow: '0 0 30px rgba(212,197,160,0.25), 0 4px 20px rgba(0,0,0,0.3)',
          }}
        >
          Request Access
        </Link>
      </main>
    </div>
  )
}

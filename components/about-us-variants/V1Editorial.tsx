'use client'

import Link from 'next/link'
import CorridorStyleFrame from '@/components/CorridorStyleFrame'
import { ABOUT_US_CONTENT } from '@/lib/about-us-content'

export default function V1Editorial() {
  return (
    <div className="fixed inset-0 overflow-auto bg-[#031a1d]">
      <main className="max-w-4xl mx-auto px-6 md:px-12 py-24 md:py-32">
        <article className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          {/* Large serif headline - editorial style */}
          <header className="md:col-span-12">
            <h1 className="font-portrait text-6xl md:text-8xl lg:text-9xl text-white/[0.98] tracking-[-0.03em] leading-[0.95] mb-12 md:mb-16">
              {ABOUT_US_CONTENT.title}
            </h1>
            <div className="h-px w-24 bg-gold-DEFAULT/50 mb-12" />
            <p className="font-refined text-xl md:text-2xl text-white/90 leading-[1.7] max-w-2xl">
              {ABOUT_US_CONTENT.hero[0]}
            </p>
          </header>

          {/* Narrow columns - drop cap */}
          <div className="md:col-span-7">
            <p className="font-refined text-base md:text-lg text-white/75 leading-[2] tracking-wide overflow-hidden">
              <span className="font-portrait text-6xl md:text-7xl text-gold-DEFAULT/80 leading-none align-top inline-block mr-2 w-[0.6em]">
                W
              </span>
              {ABOUT_US_CONTENT.hero[1]}
            </p>
            <p className="font-refined text-base md:text-lg text-white/75 leading-[2] tracking-wide mt-8">
              {ABOUT_US_CONTENT.hero[2]}
            </p>
          </div>

          {/* Asymmetric grid - image placeholder */}
          <div className="md:col-span-5 md:row-span-2">
            <CorridorStyleFrame
              aspectRatio="3/4"
              placeholderText="Editorial image"
              className="w-full"
              style={{ minHeight: 400 }}
            />
          </div>

          <div className="md:col-span-7">
            <p className="font-refined text-base md:text-lg text-white/75 leading-[2] tracking-wide">
              {ABOUT_US_CONTENT.section1}
            </p>
          </div>

          {/* Full-bleed divider */}
          <div className="md:col-span-12 h-px bg-gradient-to-r from-transparent via-gold-DEFAULT/30 to-transparent my-16" />

          <div className="md:col-span-12 max-w-2xl mx-auto">
            <p className="font-refined text-lg md:text-xl text-white/80 leading-[1.9] tracking-wide text-center">
              {ABOUT_US_CONTENT.section2}
            </p>
            <p className="font-refined text-lg md:text-xl text-white/80 leading-[1.9] tracking-wide text-center mt-8">
              {ABOUT_US_CONTENT.section3}
            </p>
          </div>

          <div className="md:col-span-12 flex justify-center pt-16">
            <Link
              href="/lab/corridor/request-order"
              className="font-refined text-sm tracking-[0.2em] uppercase text-boutallion-green bg-gold-DEFAULT hover:bg-gold-light px-12 py-4 transition-colors"
            >
              Request Access
            </Link>
          </div>
        </article>
      </main>
    </div>
  )
}

'use client'

import Link from 'next/link'
import CorridorStyleFrame from '@/components/CorridorStyleFrame'
import { ABOUT_US_CONTENT } from '@/lib/about-us-content'

export default function V2Immersive() {
  return (
    <div className="fixed inset-0 overflow-auto snap-y snap-mandatory bg-[#031a1d]">
      {/* Section 1 - Hero full screen */}
      <section className="min-h-screen flex flex-col justify-center items-center px-8 snap-start">
        <div className="text-center">
          <h1 className="font-portrait text-6xl md:text-8xl lg:text-9xl text-white/[0.98] tracking-[-0.03em]">
            {ABOUT_US_CONTENT.title}
          </h1>
          <p className="font-refined text-xl md:text-2xl text-white/80 mt-8 max-w-xl mx-auto">
            {ABOUT_US_CONTENT.hero[0]}
          </p>
        </div>
      </section>

      {/* Section 2 */}
      <section className="min-h-screen flex flex-col justify-center items-center px-8 snap-start">
        <div className="max-w-2xl text-center">
          <p className="font-refined text-xl md:text-2xl text-white/85 leading-[1.8]">
            {ABOUT_US_CONTENT.hero[1]}
          </p>
        </div>
      </section>

      {/* Section 3 - Image placeholder */}
      <section className="min-h-screen flex flex-col justify-center items-center px-8 snap-start">
        <div className="w-full max-w-2xl">
          <CorridorStyleFrame
            aspectRatio="16/10"
            placeholderText="Immersive imagery"
            className="w-full"
          />
          <p className="font-refined text-lg text-white/75 mt-12 text-center max-w-xl mx-auto">
            {ABOUT_US_CONTENT.section1}
          </p>
        </div>
      </section>

      {/* Section 4 */}
      <section className="min-h-screen flex flex-col justify-center items-center px-8 snap-start">
        <div className="max-w-2xl text-center">
          <p className="font-refined text-xl md:text-2xl text-white/85 leading-[1.8]">
            {ABOUT_US_CONTENT.section2}
          </p>
          <p className="font-refined text-xl md:text-2xl text-white/85 leading-[1.8] mt-12">
            {ABOUT_US_CONTENT.section3}
          </p>
        </div>
      </section>

      {/* Section 5 - CTA */}
      <section className="min-h-screen flex flex-col justify-center items-center px-8 snap-start">
        <div className="text-center">
          <p className="font-refined text-2xl md:text-3xl text-white/90 mb-12">
            {ABOUT_US_CONTENT.cta}
          </p>
          <Link
            href="/lab/corridor/request-order"
            className="font-refined text-sm tracking-[0.2em] uppercase text-boutallion-green bg-gold-DEFAULT hover:bg-gold-light px-14 py-5 transition-colors"
          >
            Request Access
          </Link>
        </div>
      </section>
    </div>
  )
}

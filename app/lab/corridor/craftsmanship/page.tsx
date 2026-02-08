'use client'

import BaroqueBackground from '@/components/BaroqueBackground'
import Footer from '@/components/Footer'
import SocialIcons from '@/components/SocialIcons'
import Link from 'next/link'

export default function CraftsmanshipPage() {
  return (
    <div className="fixed inset-0 overflow-auto">
      <BaroqueBackground />
      <SocialIcons />

      <main className="relative z-10 min-h-screen pt-24 md:pt-28 pb-24 md:pb-32 px-6 md:px-12 lg:px-20">
        <div className="max-w-4xl mx-auto">
          <div
            className="rounded-sm p-8 md:p-12 border border-white/[0.1] bg-[#041f23]/75 backdrop-blur-sm"
            style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)' }}
          >
            <h1 className="font-portrait text-4xl md:text-6xl text-white/95 tracking-tight mb-6">
              CRAFTSMANSHIP
            </h1>
            <div className="w-24 h-px bg-gold-DEFAULT/40 mb-8" />

            <p className="font-refined text-lg font-light text-white leading-[2.25] tracking-[0.1em] text-justify mb-10" style={{ maxWidth: '48em' }}>
              Craftsmanship at Boutallion is defined by high-quality materials, exact construction, and a made-to-measure approach that allows a garment to sit seamlessly on the body. It is visible in every seam, every line, and every detail.
            </p>

            <p className="font-refined text-lg font-light text-white leading-[2.25] tracking-[0.1em] text-justify mb-10" style={{ maxWidth: '48em' }}>
              Working with couture methods and a jewellery-led approach to design, precision, weight, and construction are treated with the same care as a fine jewel. Materials are selected for their origin and tactile quality. Cut and balance are deliberate. Every piece is developed to remain relevant beyond time or circumstance.
            </p>

            <p className="font-refined text-lg font-light text-white leading-[2.25] tracking-[0.1em] text-justify mb-10" style={{ maxWidth: '48em' }}>
              This approach is sustained through close collaboration with century-old suppliers and specialised ateliers across Europe, whose knowledge has been refined over generations. Nothing is released unless it meets the standard set by the house.
            </p>

            <p className="font-refined text-lg font-light text-white leading-[2.25] tracking-[0.1em] text-justify mb-10" style={{ maxWidth: '48em' }}>
              Every piece is assessed against the same criteria. Quality of material. Precision of fit. Excellence of finishing. Level of craftsmanship and service. These standards were never aspirational. They were the baseline.
            </p>

            <Link
              href="/lab/corridor/request-order"
              className="inline-flex px-12 py-4 font-refined text-lg font-light leading-[2.25] tracking-[0.1em] uppercase text-boutallion-green bg-gold-DEFAULT hover:bg-gold-light transition-colors duration-300"
            >
              Request Access
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

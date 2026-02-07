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
            className="rounded-sm p-8 md:p-12"
            style={{
              background: 'rgba(3, 26, 29, 0.5)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(212, 197, 160, 0.15)',
              boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.03), 0 8px 32px rgba(0, 0, 0, 0.2)',
            }}
          >
            <h1 className="font-portrait text-4xl md:text-6xl text-white/95 tracking-tight mb-6">
              CRAFTSMANSHIP
            </h1>
            <div className="w-24 h-px bg-gold-DEFAULT/40 mb-8" />

            <p className="font-refined text-lg text-white/80 leading-relaxed mb-6">
              Craftsmanship at Boutallion is defined by high-quality materials, exact construction, and a made-to-measure approach that allows a garment to sit seamlessly on the body. It is visible in every seam, every line, and every detail.
            </p>

            <p className="font-refined text-lg text-white/80 leading-relaxed mb-6">
              Working with couture methods and a jewellery-led approach to design, precision, weight, and construction are treated with the same care as a fine jewel. Materials are selected for their origin and tactile quality. Cut and balance are deliberate. Every piece is developed to remain relevant beyond time or circumstance.
            </p>

            <p className="font-refined text-lg text-white/80 leading-relaxed mb-6">
              This approach is sustained through close collaboration with century-old suppliers and specialised ateliers across Europe, whose knowledge has been refined over generations. Nothing is released unless it meets the standard set by the house.
            </p>

            <p className="font-refined text-lg text-white/80 leading-relaxed mb-10">
              Every piece is assessed against the same criteria. Quality of material. Precision of fit. Excellence of finishing. Level of craftsmanship and service. These standards were never aspirational. They were the baseline.
            </p>

            <Link
              href="/lab/corridor/request-order"
              className="inline-flex px-10 py-4 font-refined text-sm tracking-widest uppercase text-boutallion-green bg-gold-DEFAULT hover:bg-gold-light transition-colors duration-300"
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

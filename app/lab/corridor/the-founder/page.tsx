'use client'

import BaroqueBackground from '@/components/BaroqueBackground'
import Footer from '@/components/Footer'
import SocialIcons from '@/components/SocialIcons'
import Link from 'next/link'

export default function TheFounderPage() {
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
              FOUNDER
            </h1>
            <div className="w-24 h-px bg-gold-DEFAULT/40 mb-8" />

            <p className="font-refined text-lg text-white/80 leading-relaxed mb-6">
              Boutallion was founded in 2016 in the Netherlands by its Dutch founder, Sunaina Kuldipsingh.
            </p>

            <p className="font-refined text-lg text-white/80 leading-relaxed mb-6">
              Her life unfolded across different cultural landscapes from an early age. Moving between worlds was not an exception, but a constant. This experience shaped a way of seeing grounded in structure, proportion, and the practical realities of how garments are made, worn, and lived in across cultures.
            </p>

            <p className="font-refined text-lg text-white/80 leading-relaxed mb-6">
              Luxury, for her, was never a simple word or label. It was defined by high-quality materials, exact construction, and a made-to-measure approach that allows a garment to sit seamlessly on the body. By finishing that reflects discipline and mastery. By craftsmanship visible in every seam, every line, and every detail. By service that understands the woman and responds to her with care and precision. These standards were never aspirational. They were the baseline.
            </p>

            <p className="font-refined text-lg text-white/80 leading-relaxed mb-6">
              As her travels brought her repeatedly to the Middle East, a contrast became clear. The region holds deep cultural dignity and a strong tradition of dress, yet garments worn daily by women of stature often did not offer the same level of precision, fit, finishing, and material quality she had grown accustomed to elsewhere. This was not a matter of style, but of construction. Of how a garment is cut, assembled, and completed.
            </p>

            <p className="font-refined text-lg text-white/80 leading-relaxed mb-6">
              The question that followed was simple and persistent. Why should cultural alignment come at the expense of quality.
            </p>

            <p className="font-refined text-lg text-white/80 leading-relaxed mb-6">
              Boutallion emerged from this question. Not as commentary, but as a continuation. A house built on made-to-measure thinking, excellence in service, and craftsmanship executed without concession. A place where European mastery and Middle Eastern cultural depth coexist naturally.
            </p>

            <p className="font-refined text-lg text-white/80 leading-relaxed mb-6">
              Within this vision, the abaya holds particular significance.
            </p>

            <blockquote className="font-refined text-lg text-white/80 leading-relaxed mb-6 pl-6 md:pl-8 border-l-2 border-gold-DEFAULT/40 italic">
              &ldquo;Not as an item of fashion, but as a way of thinking about form, proportion, and the continuity of dignity and self-respect passed from one generation to the next. The abaya does not rely on exposure. Its authority lies in line, balance, and in how it is worn by the woman herself, reflecting what she values, how she positions herself, and the standards she maintains within a world shaped by constant novelty and visibility.&rdquo;
            </blockquote>

            <p className="font-refined text-lg text-white/80 leading-relaxed mb-6">
              Today, Sunaina works closely with historic ateliers across Europe, remaining directly involved in design, material sourcing and selection, construction, and proportion. Every piece is assessed against the same criteria. Quality of material. Precision of fit. Excellence of finishing. Level of craftsmanship and service. Nothing is accepted unless it meets the standard set by the house.
            </p>

            <p className="font-refined text-lg text-white/80 leading-relaxed mb-10">
              Boutallion stands as an extension of this belief. A house created for women who recognise quality through experience, who expect garments to be made with exactness and care, and who choose to dress in a way that reflects who they are, rather than the moment they are in.
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

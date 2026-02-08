'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import BaroqueBackground from '@/components/BaroqueBackground'
import CorridorStyleFrame from '@/components/CorridorStyleFrame'
import Footer from '@/components/Footer'
import SocialIcons from '@/components/SocialIcons'
import {
  useScrollReveal,
  useParallax,
  KineticLine,
  BOUTALLION_GREEN,
  ACCENT,
} from '@/components/ScrollRevealSection'

const glassStyle = {
  background: `linear-gradient(135deg, ${BOUTALLION_GREEN} 0%, #041f23 50%, ${BOUTALLION_GREEN} 100%)`,
  border: '1px solid rgba(222, 208, 168, 0.12)',
  boxShadow:
    'inset 0 1px 0 rgba(255,255,255,0.04), 0 24px 64px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,0,0,0.05)',
}

export default function AboutUsPage() {
  const heroRef = useScrollReveal()
  const s1Ref = useScrollReveal()
  const s2Ref = useScrollReveal()
  const s3Ref = useScrollReveal()
  const ctaRef = useScrollReveal()

  const parallaxBg = useParallax(0.15)
  const parallaxAccent = useParallax(0.08)

  const tx = (p: number, amt = 48) => `${amt * (1 - p)}px`

  return (
    <div className="fixed inset-0 overflow-auto bg-[#031a1d]">
      <BaroqueBackground />
      <SocialIcons />

      {/* Parallax accent layer - moves slower than scroll */}
      <div
        ref={parallaxAccent.ref}
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 50% 20%, rgba(222, 208, 168, 0.06) 0%, transparent 50%)`,
          transform: `translateY(${parallaxAccent.offset * 0.5}px)`,
        }}
      />

      {/* Parallax foreground grain */}
      <div
        ref={parallaxBg.ref}
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]"
        style={{
          backgroundImage: 'url("/taupe%202%20background.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: `translateY(${parallaxBg.offset * 0.3}px)`,
        }}
      />

      <main className="relative z-10 min-h-screen pt-24 md:pt-36 pb-32 md:pb-48 px-6 md:px-12 lg:px-20">
        <div className="max-w-4xl mx-auto">
          {/* Hero - always visible on load, subtle reveal on scroll */}
          <section
            ref={heroRef.ref}
            className="mb-32 md:mb-40 lg:mb-48"
            style={{
              opacity: Math.max(0.6, heroRef.progress),
              transform: `translateY(${tx(heroRef.progress, 60)})`,
            }}
          >
            <div
              className="relative overflow-hidden rounded-sm p-10 md:p-14 lg:p-20"
              style={glassStyle}
            >
              <h1
                className="font-portrait text-5xl md:text-7xl lg:text-8xl tracking-[-0.02em] leading-[1.05] mb-10 md:mb-14"
                style={{ color: ACCENT }}
              >
                About Boutallion
              </h1>
              <div
                className="h-px mb-10 md:mb-12"
                style={{
                  width: `${140 * heroRef.progress}px`,
                  background: `linear-gradient(90deg, ${ACCENT} 0%, rgba(222,208,168,0.3) 100%)`,
                }}
              />
              <div className="font-refined text-lg md:text-xl lg:text-[1.25rem] leading-[1.9] tracking-wide space-y-6 max-w-3xl">
                <p className="text-white/90">
                  <KineticLine
                    text="Boutallion was founded in 2016 in the Netherlands. The house exists to uphold a standard of luxury defined by uncompromising materials, precise construction, and made-to-measure thinking, where cultural expression never requires a compromise in quality."
                    progress={heroRef.progress}
                  />
                </p>
                <p className="text-white/75">
                  <KineticLine
                    text="Crafted in Italy, Boutallion works with couture methods and a jewellery-led approach to design. Precision, weight, and construction are treated with the same discipline as a fine jewel. Materials are selected for their origin and quality. Cut, proportion, and finishing are deliberate. Every piece is developed to remain relevant beyond time or circumstance."
                    progress={heroRef.progress}
                    baseDelay={0.25}
                  />
                </p>
              </div>
            </div>
          </section>

          {/* Section 2 - Image left, text right */}
          <section
            ref={s1Ref.ref}
            className="grid md:grid-cols-2 gap-12 md:gap-20 items-center mb-32 md:mb-40"
            style={{
              opacity: Math.max(0.15, s1Ref.progress),
              transform: `translateY(${tx(s1Ref.progress)})`,
            }}
          >
            <div className="order-2 md:order-1">
              <CorridorStyleFrame
                label="CRAFT"
                className="transition-transform duration-700"
                style={{ transform: `translateY(${-s1Ref.progress * 20}px)` }}
              />
            </div>
            <div
              className="order-1 md:order-2 p-8 md:p-10 rounded-sm"
              style={{
                ...glassStyle,
                borderColor: 'rgba(222, 208, 168, 0.1)',
              }}
            >
              <p className="font-refined text-base md:text-lg text-white/80 leading-[1.9] tracking-wide">
                <KineticLine
                  text="This standard is sustained through close collaboration with century-old suppliers and specialised ateliers across Europe, whose knowledge has been refined over generations. Craftsmanship, materials, and execution follow strict criteria. Nothing is released unless it meets the level set by the house."
                  progress={s1Ref.progress}
                />
              </p>
            </div>
          </section>

          {/* Section 3 - Full-width block */}
          <section
            ref={s2Ref.ref}
            className="mb-32 md:mb-40"
            style={{
              opacity: Math.max(0.15, s2Ref.progress),
              transform: `translateY(${tx(s2Ref.progress)})`,
            }}
          >
            <div
              className="p-10 md:p-14 lg:p-20 rounded-sm"
              style={{
                ...glassStyle,
                borderColor: 'rgba(222, 208, 168, 0.08)',
              }}
            >
              <p className="font-refined text-lg md:text-xl text-white/85 leading-[1.9] tracking-wide max-w-3xl">
                <KineticLine
                  text="Boutallion draws from nature, architecture, and Middle Eastern culture. From the geometry of built space to organic forms shaped over time, these influences inform structure and composition rather than surface effect. Cultural elements are approached with respect and depth, not interpretation."
                  progress={s2Ref.progress}
                />
              </p>
            </div>
          </section>

          {/* Section 4 - Text left, image right */}
          <section
            ref={s3Ref.ref}
            className="grid md:grid-cols-2 gap-12 md:gap-20 items-center mb-32 md:mb-40"
            style={{
              opacity: Math.max(0.15, s3Ref.progress),
              transform: `translateY(${tx(s3Ref.progress)})`,
            }}
          >
            <div
              className="p-8 md:p-10 rounded-sm"
              style={{
                ...glassStyle,
                borderColor: 'rgba(222, 208, 168, 0.1)',
              }}
            >
              <p className="font-refined text-base md:text-lg text-white/80 leading-[1.9] tracking-wide mb-8">
                <KineticLine
                  text="The house does not operate within seasonal collections. Instead, it presents a considered body of pieces, each conceived to stand on its own and to belong anywhere."
                  progress={s3Ref.progress}
                />
              </p>
              <p className="font-refined text-base md:text-lg text-white/75 leading-[1.9] tracking-wide">
                <KineticLine
                  text="Creations are introduced selectively and by invitation, allowing the work to remain focused, coherent, and discreet. Those wishing to explore the house may request access."
                  progress={s3Ref.progress}
                  baseDelay={0.2}
                />
              </p>
            </div>
            <div>
              <CorridorStyleFrame
                label="HOUSE"
                className="transition-transform duration-700"
                style={{ transform: `translateY(${-s3Ref.progress * 24}px)` }}
              />
            </div>
          </section>

          {/* Section 5 - Final statement */}
          <section
            ref={ctaRef.ref}
            className="relative"
            style={{
              opacity: Math.max(0.15, ctaRef.progress),
              transform: `translateY(${tx(ctaRef.progress)})`,
            }}
          >
            <div
              className="relative overflow-hidden rounded-sm p-12 md:p-16 lg:p-20 flex flex-col items-center justify-center text-center"
              style={{
                ...glassStyle,
                borderColor: 'rgba(222, 208, 168, 0.15)',
              }}
            >
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  background: `radial-gradient(ellipse 60% 40% at 50% 50%, rgba(222, 208, 168, 0.08) 0%, transparent 70%)`,
                }}
              />
              <p className="font-refined text-xl md:text-2xl text-white/90 leading-relaxed max-w-2xl mb-12 tracking-wide relative z-10">
                <KineticLine
                  text="The result is clothing that sits seamlessly on the body and reveals its quality immediately, understood through material, construction, and finish rather than explanation. Boutallion is created for women who recognise such distinctions through experience and who choose continuity over novelty."
                  progress={ctaRef.progress}
                />
              </p>
              <Link
                href="/lab/corridor/request-order"
                className="relative inline-flex items-center justify-center px-14 py-5 font-refined text-sm tracking-[0.2em] uppercase overflow-hidden group/btn transition-all duration-500"
                style={{
                  backgroundColor: ACCENT,
                  color: BOUTALLION_GREEN,
                }}
              >
                <span
                  className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"
                  style={{ backgroundColor: 'rgba(255,255,255,0.12)' }}
                />
                <span className="relative z-10">Request Access</span>
              </Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}

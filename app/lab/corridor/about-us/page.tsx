'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import BaroqueBackground from '@/components/BaroqueBackground'
import CorridorStyleFrame from '@/components/CorridorStyleFrame'
import Footer from '@/components/Footer'
import SocialIcons from '@/components/SocialIcons'
import { useParallax } from '@/components/ScrollRevealSection'

function getScrollParent(el: HTMLElement): HTMLElement | Window {
  let parent: HTMLElement | null = el.parentElement
  while (parent && parent !== document.body) {
    const { overflowY } = getComputedStyle(parent)
    if (overflowY === 'auto' || overflowY === 'scroll' || overflowY === 'overlay') {
      return parent
    }
    parent = parent.parentElement
  }
  return window
}

function useSectionReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  const [mounted, setMounted] = useState(false)
  const rafRef = useRef<number>()

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (!mounted) return
    const el = ref.current
    if (!el) return
    const scrollParent = getScrollParent(el)
    const getVh = () =>
      scrollParent instanceof Window ? window.innerHeight : (scrollParent as HTMLElement).clientHeight
    const update = () => {
      const rect = el.getBoundingClientRect()
      const vh = getVh()
      const trigger = vh * 0.75
      const end = vh * 0.25
      const raw = (trigger - rect.top) / (trigger - end)
      const eased = raw <= 0 ? 0 : raw >= 1 ? 1 : 1 - Math.pow(1 - raw, 2)
      setProgress(eased)
    }
    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(update)
    }
    update()
    scrollParent.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      scrollParent.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [mounted])

  return { ref, progress }
}

export default function AboutUsPage() {
  const hero = useSectionReveal()
  const s1 = useSectionReveal()
  const s2 = useSectionReveal()
  const s3 = useSectionReveal()
  const s4 = useSectionReveal()
  const cta = useSectionReveal()
  const parallaxBg = useParallax(0.12)

  const reveal = (p: number, slide = 32, minOpacity = 0) => ({
    opacity: Math.max(minOpacity, p),
    transform: `translateY(${(1 - Math.max(minOpacity, p)) * slide}px)`,
    transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
  })

  return (
    <div className="fixed inset-0 overflow-auto bg-[#031a1d]">
      <BaroqueBackground />
      <SocialIcons />

      {/* Subtle parallax grain */}
      <div
        ref={parallaxBg.ref}
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.04]"
        style={{
          backgroundImage: 'url("/taupe%202%20background.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: `translateY(${parallaxBg.offset * 0.25}px)`,
        }}
      />

      <main className="relative z-10 min-h-screen pt-28 md:pt-40 pb-40 md:pb-56">
        <div className="max-w-3xl mx-auto px-6 md:px-12 lg:px-16">
          {/* Hero */}
          <section
            ref={hero.ref}
            className="mb-24 md:mb-32"
            style={reveal(hero.progress, 24, 0.85)}
          >
            <h1
              className="font-portrait text-4xl md:text-6xl lg:text-7xl tracking-[-0.02em] leading-[1.1] text-[#ded0a8] mb-8"
              style={{ textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}
            >
              About Boutallion
            </h1>
            <div
              className="w-20 h-px mb-10 bg-gradient-to-r from-[#ded0a8] to-transparent"
              style={{ opacity: hero.progress }}
            />
            <p className="font-refined text-lg md:text-xl text-white leading-[1.85] tracking-wide mb-8">
              Boutallion was founded in 2016 in the Netherlands. The house exists to uphold a standard of luxury defined by uncompromising materials, precise construction, and made-to-measure thinking, where cultural expression never requires a compromise in quality.
            </p>
            <p className="font-refined text-base md:text-lg text-white/90 leading-[1.85] tracking-wide">
              Crafted in Italy, Boutallion works with couture methods and a jewellery-led approach to design. Precision, weight, and construction are treated with the same discipline as a fine jewel. Materials are selected for their origin and quality. Cut, proportion, and finishing are deliberate. Every piece is developed to remain relevant beyond time or circumstance.
            </p>
          </section>

          {/* Section 1 - Image + text */}
          <section
            ref={s1.ref}
            className="grid md:grid-cols-2 gap-12 md:gap-20 items-center mb-24 md:mb-32"
            style={reveal(s1.progress)}
          >
            <div className="order-2 md:order-1">
              <CorridorStyleFrame label="CRAFT" />
            </div>
            <div className="order-1 md:order-2">
              <div
                className="p-8 md:p-10 border border-white/[0.08] bg-[#041f23]/80 backdrop-blur-sm"
                style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.03)' }}
              >
                <p className="font-refined text-base md:text-lg text-white leading-[1.9] tracking-wide">
                  This standard is sustained through close collaboration with century-old suppliers and specialised ateliers across Europe, whose knowledge has been refined over generations. Craftsmanship, materials, and execution follow strict criteria. Nothing is released unless it meets the level set by the house.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2 - Full width */}
          <section
            ref={s2.ref}
            className="mb-24 md:mb-32"
            style={reveal(s2.progress)}
          >
            <div
              className="p-10 md:p-14 border border-white/[0.08] bg-[#041f23]/80 backdrop-blur-sm"
              style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.03)' }}
            >
              <p className="font-refined text-lg md:text-xl text-white leading-[1.9] tracking-wide max-w-2xl">
                Boutallion draws from nature, architecture, and Middle Eastern culture. From the geometry of built space to organic forms shaped over time, these influences inform structure and composition rather than surface effect. Cultural elements are approached with respect and depth, not interpretation.
              </p>
            </div>
          </section>

          {/* Section 3 - Text + image */}
          <section
            ref={s3.ref}
            className="grid md:grid-cols-2 gap-12 md:gap-20 items-center mb-24 md:mb-32"
            style={reveal(s3.progress)}
          >
            <div>
              <div
                className="p-8 md:p-10 border border-white/[0.08] bg-[#041f23]/80 backdrop-blur-sm"
                style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.03)' }}
              >
                <p className="font-refined text-base md:text-lg text-white leading-[1.9] tracking-wide mb-8">
                  The house does not operate within seasonal collections. Instead, it presents a considered body of pieces, each conceived to stand on its own and to belong anywhere.
                </p>
                <p className="font-refined text-base md:text-lg text-white/95 leading-[1.9] tracking-wide">
                  Creations are introduced selectively and by invitation, allowing the work to remain focused, coherent, and discreet. Those wishing to explore the house may request access.
                </p>
              </div>
            </div>
            <div>
              <CorridorStyleFrame label="HOUSE" />
            </div>
          </section>

          {/* CTA */}
          <section
            ref={cta.ref}
            className="text-center"
            style={reveal(cta.progress)}
          >
            <div
              className="p-12 md:p-16 border border-white/[0.1] bg-[#041f23]/90 backdrop-blur-sm"
              style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)' }}
            >
              <p className="font-refined text-xl md:text-2xl text-white leading-relaxed max-w-2xl mx-auto mb-12">
                The result is clothing that sits seamlessly on the body and reveals its quality immediately, understood through material, construction, and finish rather than explanation. Boutallion is created for women who recognise such distinctions through experience and who choose continuity over novelty.
              </p>
              <Link
                href="/lab/corridor/request-order"
                className="inline-flex items-center justify-center px-12 py-4 font-refined text-sm tracking-[0.2em] uppercase bg-[#ded0a8] text-[#031a1d] hover:bg-[#e8dcc0] transition-colors duration-300"
              >
                Request Access
              </Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}

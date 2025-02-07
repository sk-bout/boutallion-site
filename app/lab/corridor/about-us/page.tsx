'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import BaroqueBackground from '@/components/BaroqueBackground'
import CorridorStyleFrame from '@/components/CorridorStyleFrame'
import Footer from '@/components/Footer'
import SocialIcons from '@/components/SocialIcons'

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

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  const rafRef = useRef<number>()

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const scrollParent = getScrollParent(el)
    const getViewportHeight = () =>
      scrollParent instanceof Window
        ? window.innerHeight
        : (scrollParent as HTMLElement).clientHeight

    const updateProgress = () => {
      const rect = el.getBoundingClientRect()
      const viewportHeight = getViewportHeight()
      // Start revealing when element's top is 30% from bottom of viewport
      const triggerPoint = viewportHeight * 0.7
      // Full reveal when element's top reaches 20% from top of viewport
      const endPoint = viewportHeight * 0.2
      const raw = (triggerPoint - rect.top) / (triggerPoint - endPoint)
      const eased = raw <= 0 ? 0 : raw >= 1 ? 1 : 1 - Math.pow(1 - raw, 1.5)
      setProgress(eased)
    }

    const handleScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(updateProgress)
    }

    updateProgress()
    scrollParent.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)
    return () => {
      scrollParent.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return { ref, progress }
}

export default function AboutUsPage() {
  const heroRef = useScrollReveal()
  const section1Ref = useScrollReveal()
  const section2Ref = useScrollReveal()
  const ctaRef = useScrollReveal()

  return (
    <div className="fixed inset-0 overflow-auto">
      <BaroqueBackground />
      <SocialIcons />

      <main className="relative z-10 min-h-screen pt-24 md:pt-32 pb-32 md:pb-40 px-6 md:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto">
          {/* Hero - smooth scroll-linked reveal */}
          <section
            ref={heroRef.ref}
            className="mb-28 md:mb-36 lg:mb-44"
            style={{
              opacity: heroRef.progress,
              transform: `translateY(${40 * (1 - heroRef.progress)}px)`,
            }}
          >
            <div
              className="relative overflow-hidden rounded-sm p-10 md:p-14 lg:p-20 group transition-all duration-700 hover:border-gold-DEFAULT/25"
              style={{
                background: 'linear-gradient(135deg, #031a1d 0%, #041f23 50%, #031a1d 100%)',
                border: '1px solid rgba(212, 197, 160, 0.12)',
                boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.04), 0 24px 64px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05)',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-gold-DEFAULT/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <h1 className="font-portrait text-5xl md:text-7xl lg:text-8xl text-white/[0.98] tracking-[-0.02em] leading-[1.05] mb-6 md:mb-10">
                About Boutallion
              </h1>
              <div
                className="h-px bg-gradient-to-r from-gold-DEFAULT/60 via-gold-DEFAULT/40 to-transparent mb-10 md:mb-12"
                style={{
                  width: `${120 * heroRef.progress}px`,
                }}
              />
              <p className="font-refined text-xl md:text-2xl lg:text-[1.4rem] text-white/85 leading-[1.7] max-w-3xl tracking-wide">
                Boutallion was founded in 2016 and is crafted in Italy.
              </p>
              <p className="font-refined text-base md:text-lg lg:text-xl text-white/70 leading-[1.8] max-w-3xl mt-8 md:mt-10 tracking-wide">
                Working with couture methods and a jewellery-led approach to design, precision, weight, and construction are treated with the same care as a fine jewel. Materials are selected for their origin and tactile quality. Cut and balance are deliberate. Every piece is developed to remain relevant beyond time or circumstance.
              </p>
              <p className="font-refined text-base md:text-lg lg:text-xl text-white/70 leading-[1.8] max-w-3xl mt-6 md:mt-8 tracking-wide">
                This approach is sustained through close collaboration with century-old suppliers and specialised ateliers across Europe, whose knowledge has been refined over generations. Craftsmanship, materials, and execution follow uncompromising standards. Nothing is released unless it meets the level of the house.
              </p>
            </div>
          </section>

          {/* Section 1 - Image + text with smooth scroll reveal */}
          <section
            ref={section1Ref.ref}
            className="grid md:grid-cols-2 gap-10 md:gap-16 lg:gap-20 items-center mb-28 md:mb-36"
            style={{
              opacity: section1Ref.progress,
              transform: `translateY(${56 * (1 - section1Ref.progress)}px)`,
            }}
          >
            <CorridorStyleFrame
              className="group cursor-default transition-all duration-700 hover:scale-[1.02]"
            />
            <div
              className="p-10 md:p-12 rounded-sm transition-all duration-700 hover:border-gold-DEFAULT/20"
              style={{
                background: 'linear-gradient(135deg, #031a1d 0%, #041f23 100%)',
                border: '1px solid rgba(212, 197, 160, 0.1)',
                boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.02), 0 8px 32px rgba(0, 0, 0, 0.15)',
              }}
            >
              <p className="font-refined text-lg md:text-xl text-white/75 leading-[1.85] tracking-wide">
                Drawing from nature, architecture, and Middle Eastern culture, the work is informed by geometry, organic form, and spatial rhythm. These influences guide structure and composition rather than surface treatment. Cultural elements are approached with respect and depth, not interpretation.
              </p>
            </div>
          </section>

          {/* Section 2 - Reversed layout with smooth scroll reveal */}
          <section
            ref={section2Ref.ref}
            className="grid md:grid-cols-2 gap-10 md:gap-16 lg:gap-20 items-center mb-28 md:mb-36"
            style={{
              opacity: section2Ref.progress,
              transform: `translateY(${56 * (1 - section2Ref.progress)}px)`,
            }}
          >
            <div
              className="p-10 md:p-12 rounded-sm order-2 md:order-1 transition-all duration-700 hover:border-gold-DEFAULT/20"
              style={{
                background: 'linear-gradient(135deg, #031a1d 0%, #052a2f 100%)',
                border: '1px solid rgba(212, 197, 160, 0.1)',
                boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.02), 0 8px 32px rgba(0, 0, 0, 0.15)',
              }}
            >
              <p className="font-refined text-lg md:text-xl text-white/75 leading-[1.85] tracking-wide mb-8">
                Outside the logic of seasonal collections, Boutallion presents a carefully considered body of pieces. Each creation stands on its own, conceived to belong anywhere and to remain relevant over time. Introduced selectively and by invitation, the work remains focused, considered, and discreet.
              </p>
              <p className="font-refined text-lg md:text-xl text-white/75 leading-[1.85] tracking-wide">
                The result is clothing that settles naturally on the body and reveals its quality immediately, understood through touch, balance, and construction rather than explanation. Boutallion speaks to women for whom such distinctions are instinctive and whose choices favour continuity over novelty.
              </p>
            </div>
            <CorridorStyleFrame
              className="order-1 md:order-2 group cursor-default transition-all duration-700 hover:scale-[1.02]"
            />
          </section>

          {/* CTA - smooth scroll-linked reveal */}
          <section
            ref={ctaRef.ref}
            className="relative"
            style={{
              opacity: ctaRef.progress,
              transform: `translateY(${48 * (1 - ctaRef.progress)}px)`,
            }}
          >
            <div
              className="relative overflow-hidden rounded-sm p-12 md:p-16 lg:p-20 flex flex-col items-center justify-center text-center group"
              style={{
                background: 'linear-gradient(135deg, #031a1d 0%, #041f23 50%, #031a1d 100%)',
                border: '1px solid rgba(212, 197, 160, 0.15)',
                boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 32px 80px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(0, 0, 0, 0.05)',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-gold-DEFAULT/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <p className="font-refined text-xl md:text-2xl text-white/80 leading-relaxed max-w-2xl mb-10 md:mb-12 tracking-wide relative z-10">
                Those wishing to explore the house may request access.
              </p>
              <Link
                href="/lab/corridor/request-order"
                className="relative inline-flex items-center justify-center px-12 py-4 md:px-14 md:py-5 font-refined text-sm tracking-[0.2em] uppercase text-boutallion-green bg-gold-DEFAULT hover:bg-gold-light transition-all duration-500 overflow-hidden group/btn"
              >
                <span className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
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

'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import CorridorStyleFrame from '@/components/CorridorStyleFrame'
import Footer from '@/components/Footer'
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
  const scrollRef = useRef<HTMLDivElement>(null)
  const [atBottom, setAtBottom] = useState(false)
  const hero = useSectionReveal()
  const s1 = useSectionReveal()
  const s2 = useSectionReveal()
  const s3 = useSectionReveal()
  const s4 = useSectionReveal()
  const cta = useSectionReveal()
  const parallaxBg = useParallax(0.12)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const check = () => {
      const { scrollTop, scrollHeight, clientHeight } = el
      const threshold = 60
      setAtBottom(scrollTop + clientHeight >= scrollHeight - threshold)
    }
    check()
    el.addEventListener('scroll', check, { passive: true })
    window.addEventListener('resize', check)
    return () => {
      el.removeEventListener('scroll', check)
      window.removeEventListener('resize', check)
    }
  }, [])

  const reveal = (p: number, slide = 32) => ({
    opacity: 1,
    transform: `translateY(${(1 - p) * slide}px)`,
    transition: 'transform 0.5s ease-out',
  })

  const revealFrame = (p: number, fromLeft: boolean) => ({
    opacity: 1,
    transform: `translateX(${(1 - p) * (fromLeft ? -24 : 24)}px) translateY(${(1 - p) * 16}px)`,
    transition: 'transform 0.5s ease-out',
  })

  const revealBox = (p: number, fromRight: boolean) => ({
    opacity: 1,
    transform: `translateX(${(1 - p) * (fromRight ? 24 : -24)}px) translateY(${(1 - p) * 16}px)`,
    transition: 'transform 0.5s ease-out',
  })

  return (
    <div ref={scrollRef} className="fixed inset-0 overflow-auto bg-[#031a1d]">
      {/* Green frame background */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: 'url("/green%20frame%20background.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Very subtle grain - minimal opacity to avoid overlay effect */}
      <div
        ref={parallaxBg.ref}
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.02]"
        style={{
          backgroundImage: 'url("/taupe%202%20background.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: `translateY(${parallaxBg.offset * 0.25}px)`,
        }}
      />

      <main className="relative z-10 min-h-screen pt-28 md:pt-40 pb-40 md:pb-56">
        {/* Floating leaves */}
        <div className="absolute inset-0 pointer-events-none overflow-visible z-0">
          <div className="absolute" style={{ top: '25%', left: '5%', transform: 'scaleX(-1) rotate(10deg)' }}>
            <img
              src="/leaf.png"
              alt=""
              aria-hidden
              className="w-24 md:w-32 lg:w-40 opacity-[0.12] block"
              style={{ animation: 'leafFloat1 12s ease-in-out infinite' }}
            />
          </div>
          <div className="absolute" style={{ top: '35%', right: '8%', transform: 'scaleX(-1) rotate(-8deg)' }}>
            <img
              src="/leaf2.png"
              alt=""
              aria-hidden
              className="w-20 md:w-28 lg:w-36 opacity-[0.1] block"
              style={{ animation: 'leafFloat2 14s ease-in-out infinite' }}
            />
          </div>
          <div className="absolute" style={{ top: '55%', left: '12%', transform: 'scaleX(-1)' }}>
            <img
              src="/leaf.png"
              alt=""
              aria-hidden
              className="w-16 md:w-24 lg:w-28 opacity-[0.08] block"
              style={{ animation: 'leafFloat2 11s ease-in-out infinite 1s' }}
            />
          </div>
          <div className="absolute" style={{ top: '65%', right: '10%', transform: 'scaleX(-1) rotate(-15deg)' }}>
            <img
              src="/leaf2.png"
              alt=""
              aria-hidden
              className="w-20 md:w-24 lg:w-28 opacity-[0.1] block"
              style={{ animation: 'leafFloat1 13s ease-in-out infinite 0.5s' }}
            />
          </div>
          <img
            src="/leaf.png"
            alt=""
            aria-hidden
            className="absolute w-14 md:w-20 lg:w-24 opacity-[0.07]"
            style={{
              top: '82%',
              left: '20%',
              animation: 'leafFloat1 10s ease-in-out infinite 2s',
            }}
          />
          <div className="absolute" style={{ top: '12%', right: '15%', transform: 'scaleX(-1) rotate(25deg)' }}>
            <img
              src="/leaf2.png"
              alt=""
              aria-hidden
              className="w-16 md:w-24 lg:w-28 opacity-[0.09] block"
              style={{ animation: 'leafFloat2 13s ease-in-out infinite 0.3s' }}
            />
          </div>
          <div className="absolute" style={{ top: '45%', right: '3%', transform: 'scaleX(-1)' }}>
            <img
              src="/leaf.png"
              alt=""
              aria-hidden
              className="w-12 md:w-20 lg:w-24 opacity-[0.06] block"
              style={{ animation: 'leafFloat1 15s ease-in-out infinite 1.5s' }}
            />
          </div>
          <div className="absolute" style={{ top: '72%', left: '8%', transform: 'scaleX(-1) rotate(-20deg)' }}>
            <img
              src="/leaf2.png"
              alt=""
              aria-hidden
              className="w-16 md:w-24 lg:w-28 opacity-[0.08] block"
              style={{ animation: 'leafFloat2 11s ease-in-out infinite 2s' }}
            />
          </div>
          <img
            src="/leaf.png"
            alt=""
            aria-hidden
            className="absolute w-14 md:w-20 lg:w-24 opacity-[0.07]"
            style={{
              top: '88%',
              right: '18%',
              animation: 'leafFloat1 12s ease-in-out infinite 0.8s',
            }}
          />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 lg:px-16 xl:px-20">
          {/* Hero */}
          <section
            ref={hero.ref}
            className="mb-24 md:mb-32"
            style={reveal(hero.progress, 24)}
          >
            <h1
              className="font-portrait leading-[1.05] text-[#ded0a8] mb-8 uppercase font-light"
              style={{
                textShadow: '0 1px 2px rgba(0,0,0,0.2)',
                letterSpacing: '0.4em',
                fontSize: 'clamp(1.2cm, 8vw + 1.5cm, 2.2cm)',
              }}
            >
              About Us
            </h1>
            <div
              className="w-20 h-px mb-10 bg-gradient-to-r from-[#ded0a8] to-transparent"
            />
            <p className="font-refined text-lg font-light leading-[2.25] tracking-[0.1em] mb-10 text-justify" style={{ maxWidth: '48em', color: '#ffffff' }}>
              Boutallion was founded in 2016 in the Netherlands. The house exists to uphold a standard of luxury defined by uncompromising materials, precise construction, and made-to-measure thinking, where cultural expression never requires a compromise in quality.
            </p>
            <p className="font-refined text-lg font-light leading-[2.25] tracking-[0.1em] text-justify" style={{ maxWidth: '48em', color: '#ffffff' }}>
              Crafted in Italy, Boutallion works with couture methods and a jewellery-led approach to design. Precision, weight, and construction are treated with the same discipline as a fine jewel. Materials are selected for their origin and quality. Cut, proportion, and finishing are deliberate. Every piece is developed to remain relevant beyond time or circumstance.
            </p>
          </section>

          {/* Section 1 - Image + text */}
          <section
            ref={s1.ref}
            className="grid md:grid-cols-2 gap-12 md:gap-20 items-center mb-24 md:mb-32"
            style={reveal(s1.progress)}
          >
            <div className="order-2 md:order-1 will-change-transform" style={revealFrame(s1.progress, true)}>
              <CorridorStyleFrame label="CRAFT">
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    src="/sheikh%20zayed%20abaya%20boutallion.png"
                    alt="Sheikh Zayed abaya by Boutallion"
                    fill
                    className="object-cover"
                    style={{ objectPosition: 'center bottom' }}
                    sizes="(min-width: 768px) 50vw, 100vw"
                  />
                </div>
              </CorridorStyleFrame>
            </div>
            <div className="order-1 md:order-2 will-change-transform" style={revealBox(s1.progress, true)}>
              <div
                className="p-8 md:p-10 border border-white/20 bg-[#041f23]/65 backdrop-blur-sm"
                style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)' }}
              >
                <p className="font-refined text-lg font-light leading-[2.25] tracking-[0.1em] text-justify" style={{ maxWidth: '48em', color: '#ffffff' }}>
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
              className="p-10 md:p-14 border border-white/20 bg-[#041f23]/65 backdrop-blur-sm will-change-transform"
              style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)' }}
            >
              <p className="font-refined text-lg font-light leading-[2.25] tracking-[0.1em] text-justify" style={{ maxWidth: '48em', margin: '0 auto', color: '#ffffff' }}>
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
            <div className="will-change-transform" style={revealBox(s3.progress, false)}>
              <div
                className="p-8 md:p-10 border border-white/20 bg-[#041f23]/65 backdrop-blur-sm"
                style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)' }}
              >
                <p className="font-refined text-lg font-light leading-[2.25] tracking-[0.1em] mb-10 text-justify" style={{ maxWidth: '48em', color: '#ffffff' }}>
                  The house does not operate within seasonal collections. Instead, it presents a considered body of pieces, each conceived to stand on its own and to belong anywhere.
                </p>
                <p className="font-refined text-lg font-light leading-[2.25] tracking-[0.1em] text-justify" style={{ maxWidth: '48em', color: '#ffffff' }}>
                  Creations are introduced selectively and by invitation, allowing the work to remain focused, coherent, and discreet. Those wishing to explore the house may request access.
                </p>
              </div>
            </div>
            <div className="will-change-transform" style={revealFrame(s3.progress, false)}>
              <CorridorStyleFrame>
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    src="/sheikh%20zayed%20abaya%20boutallion.png"
                    alt="Sheikh Zayed abaya by Boutallion"
                    fill
                    className="object-cover"
                    style={{ objectPosition: 'center bottom' }}
                    sizes="(min-width: 768px) 50vw, 100vw"
                  />
                </div>
              </CorridorStyleFrame>
            </div>
          </section>

          {/* CTA */}
          <section
            ref={cta.ref}
            className="text-center"
            style={reveal(cta.progress)}
          >
            <div
              className="p-12 md:p-16 border border-white/20 bg-[#041f23]/65 backdrop-blur-sm will-change-transform"
              style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)' }}
            >
              <p className="font-refined text-lg font-light leading-[2.25] tracking-[0.1em] mx-auto mb-12 text-justify" style={{ maxWidth: '48em', color: '#ffffff' }}>
                The result is clothing that sits seamlessly on the body and reveals its quality immediately, understood through material, construction, and finish rather than explanation. Boutallion is created for women who recognise such distinctions through experience and who choose continuity over novelty.
              </p>
              <Link
                href="/lab/corridor/request-order"
                className="inline-flex items-center justify-center px-10 py-2.5 font-refined text-base font-light tracking-[0.12em] uppercase bg-[#ded0a8] text-[#031a1d] hover:bg-[#e8dcc0] transition-colors duration-300"
              >
                Request Access
              </Link>
            </div>
          </section>
        </div>
      </main>

      <div
        className="transition-opacity duration-300"
        style={{ opacity: atBottom ? 1 : 0, pointerEvents: atBottom ? 'auto' : 'none' }}
        aria-hidden={!atBottom}
      >
        <Footer />
      </div>
    </div>
  )
}

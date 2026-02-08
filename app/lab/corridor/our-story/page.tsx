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

const textBlock =
  'font-refined text-lg font-light leading-[2.25] tracking-[0.1em] text-justify max-w-[48em]'
const textBlockStyle = { color: '#ffffff' as const }

export default function OurStoryPage() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [atBottom, setAtBottom] = useState(false)
  const hero = useSectionReveal()
  const s1 = useSectionReveal()
  const s2 = useSectionReveal()
  const s3 = useSectionReveal()
  const s4 = useSectionReveal()
  const s5 = useSectionReveal()
  const s6 = useSectionReveal()
  const s7 = useSectionReveal()
  const s8 = useSectionReveal()
  const s9 = useSectionReveal()
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

  const reveal = (p: number, slide = 28) => ({
    opacity: 1,
    transform: `translateY(${(1 - p) * slide}px)`,
    transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  })

  const revealFrame = (p: number, fromLeft: boolean) => ({
    opacity: 1,
    transform: `translateX(${(1 - p) * (fromLeft ? -48 : 48)}px) translateY(${(1 - p) * 24}px)`,
    transition: 'transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  })

  /* Text boxes float in from the side; always visible (opacity 1), only position animates */
  const revealBoxFloat = (p: number, fromRight: boolean) => {
    const slideX = (1 - p) * 56
    const slideY = (1 - p) * 20
    return {
      opacity: 1,
      transform: `translateX(${fromRight ? slideX : -slideX}px) translateY(${slideY}px)`,
      transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    }
  }

  const boxClass =
    'p-8 md:p-10 border border-white/20 bg-[#041f23]/65 backdrop-blur-sm will-change-transform'
  const boxShadow = { boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)' }

  return (
    <div ref={scrollRef} className="fixed inset-0 overflow-auto bg-[#031a1d]" style={{ scrollbarGutter: 'stable' }}>
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: 'url("/green%20frame%20background.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
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
        <div className="absolute inset-0 pointer-events-none overflow-visible z-0">
          <div className="absolute" style={{ top: '25%', left: '5%', transform: 'scaleX(-1) rotate(10deg)' }}>
            <img src="/leaf.png" alt="" aria-hidden className="w-24 md:w-32 lg:w-40 opacity-[0.12] block" style={{ animation: 'leafFloat1 12s ease-in-out infinite' }} />
          </div>
          <div className="absolute" style={{ top: '35%', right: '8%', transform: 'scaleX(-1) rotate(-8deg)' }}>
            <img src="/leaf2.png" alt="" aria-hidden className="w-20 md:w-28 lg:w-36 opacity-[0.1] block" style={{ animation: 'leafFloat2 14s ease-in-out infinite' }} />
          </div>
          <div className="absolute" style={{ top: '55%', left: '12%', transform: 'scaleX(-1)' }}>
            <img src="/leaf.png" alt="" aria-hidden className="w-16 md:w-24 lg:w-28 opacity-[0.08] block" style={{ animation: 'leafFloat2 11s ease-in-out infinite 1s' }} />
          </div>
          <div className="absolute" style={{ top: '65%', right: '10%', transform: 'scaleX(-1) rotate(-15deg)' }}>
            <img src="/leaf2.png" alt="" aria-hidden className="w-20 md:w-24 lg:w-28 opacity-[0.1] block" style={{ animation: 'leafFloat1 13s ease-in-out infinite 0.5s' }} />
          </div>
          <img src="/leaf.png" alt="" aria-hidden className="absolute w-14 md:w-20 lg:w-24 opacity-[0.07]" style={{ top: '82%', left: '20%', animation: 'leafFloat1 10s ease-in-out infinite 2s' }} />
          <div className="absolute" style={{ top: '12%', right: '15%', transform: 'scaleX(-1) rotate(25deg)' }}>
            <img src="/leaf2.png" alt="" aria-hidden className="w-16 md:w-24 lg:w-28 opacity-[0.09] block" style={{ animation: 'leafFloat2 13s ease-in-out infinite 0.3s' }} />
          </div>
          <div className="absolute" style={{ top: '45%', right: '3%', transform: 'scaleX(-1)' }}>
            <img src="/leaf.png" alt="" aria-hidden className="w-12 md:w-20 lg:w-24 opacity-[0.06] block" style={{ animation: 'leafFloat1 15s ease-in-out infinite 1.5s' }} />
          </div>
          <div className="absolute" style={{ top: '72%', left: '8%', transform: 'scaleX(-1) rotate(-20deg)' }}>
            <img src="/leaf2.png" alt="" aria-hidden className="w-16 md:w-24 lg:w-28 opacity-[0.08] block" style={{ animation: 'leafFloat2 11s ease-in-out infinite 2s' }} />
          </div>
          <img src="/leaf.png" alt="" aria-hidden className="absolute w-14 md:w-20 lg:w-24 opacity-[0.07]" style={{ top: '88%', right: '18%', animation: 'leafFloat1 12s ease-in-out infinite 0.8s' }} />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 lg:px-16 xl:px-20">
          {/* Hero */}
          <section ref={hero.ref} className="mb-24 md:mb-32" style={reveal(hero.progress, 24)}>
            <h1
              className="font-portrait leading-[1.05] text-[#ded0a8] mb-8 uppercase font-light"
              style={{ textShadow: '0 1px 2px rgba(0,0,0,0.2)', letterSpacing: '0.4em', fontSize: 'clamp(1.2cm, 8vw + 1.5cm, 2.2cm)' }}
            >
              Our Story
            </h1>
            <div className="w-20 h-px mb-6 bg-gradient-to-r from-[#ded0a8] to-transparent" />
            {/* Screen-wide cover video – same frame style as other images; extends to main’s right edge */}
            <div
              className="w-full -mx-6 md:-mx-12 lg:-mx-16 xl:-mx-20 mt-6 mb-20 overflow-visible"
              style={revealFrame(hero.progress, true)}
            >
              <CorridorStyleFrame aspectRatio="16/9" className="w-full min-w-0">
                <div className="absolute inset-0 w-full h-full">
                  <video
                    ref={(el) => {
                      if (el) el.playbackRate = 0.7
                    }}
                    src="/our%20story%20video.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ objectPosition: 'center center' }}
                    aria-label="Our story"
                  />
                </div>
              </CorridorStyleFrame>
            </div>
            <div
              className="font-refined text-sm font-light tracking-[0.15em] text-[#ded0a8]/95 mb-10 story-coordinates"
              style={{ maxWidth: '48em' }}
            >
              <span className="block">2016. Florence, Italy.</span>
              <span className="block mt-1 font-mono text-xs tracking-widest opacity-90">43.7696° N, 11.2558° E.</span>
              <span className="block mt-1">Giardino della Gherardesca.</span>
            </div>
            <p className={`${textBlock} mb-0`} style={textBlockStyle}>
              Within the secluded Renaissance gardens of the Four Seasons estate, a carefully curated group gathered in discretion. They came from different disciplines, yet were united by a single conviction. That culture advances only when responsibility is taken for what is created and for whom it is created. That refinement carries duty. That what we place on the body shapes how a woman stands within society. And that true luxury required restoration through excellence in craft, service, and attention.
            </p>
          </section>

          {/* Text block 1 – float in from right */}
          <section ref={s1.ref} className="mb-24 md:mb-32" style={reveal(s1.progress)}>
            <div className="will-change-transform" style={revealBoxFloat(s1.progress, true)}>
              <div className={boxClass} style={boxShadow}>
                <p className={textBlock} style={textBlockStyle}>
                  Among them were an elegant couture connoisseur, an art curator, a luxury historian, a fine jewellery artist, a bespoke architect, and a mind deeply engaged with quantum physics. Their exchange moved beyond garments. They spoke beyond the limits of fashion, toward structure and energy in motion, and toward the way art, architecture, and cultural heritage preserve value across generations.
                </p>
              </div>
            </div>
          </section>

          {/* Frame 1 */}
          <section ref={s2.ref} className="mb-24 md:mb-32" style={reveal(s2.progress)}>
            <div className="w-full will-change-transform" style={revealFrame(s2.progress, true)}>
              <CorridorStyleFrame aspectRatio="16/9" frameNumber={1}>
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    src="/our%20story%20frame%202.png"
                    alt="Our story"
                    fill
                    className="object-cover"
                    style={{ objectPosition: 'center center' }}
                    sizes="(min-width: 768px) 100vw, 100vw"
                  />
                </div>
              </CorridorStyleFrame>
            </div>
          </section>

          {/* Text block 2 – float in from left */}
          <section ref={s3.ref} className="mb-24 md:mb-32" style={reveal(s3.progress)}>
            <div className="will-change-transform ml-0 md:ml-auto md:max-w-[calc(100%-2rem)]" style={revealBoxFloat(s3.progress, false)}>
              <div className={boxClass} style={boxShadow}>
                <p className={`${textBlock} mb-10`} style={textBlockStyle}>
                  They examined how jewellery and couture share a common origin. Both rest on precision, material integrity, symbolism, and permanence. Both carry memory and recall lived moments. Both hold meaning beyond appearance.
                </p>
                <p className={textBlock} style={textBlockStyle}>
                  As the dialogue deepened, a shared realisation emerged. That contemporary luxury dressing had become overly occupied with surface and effect, and insufficiently devoted to the woman who carries the garment. The craft of dressing had drifted away from its purpose. What was needed was a return. Not to embellishment, but to meaning. Not to impression, but to reflection. A return to clothing as a vessel through which a woman expresses her character, intellect, and the personal universe she carries within. The aim was not to please the eye, but to recognise the woman more fully as herself.
                </p>
              </div>
            </div>
          </section>

          {/* Frame 2 */}
          <section ref={s4.ref} className="mb-24 md:mb-32" style={reveal(s4.progress)}>
            <div className="w-full will-change-transform" style={revealFrame(s4.progress, false)}>
              <CorridorStyleFrame aspectRatio="16/9" frameNumber={2}>
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    src="/our%20story%20frame%203.png"
                    alt="Our story"
                    fill
                    className="object-cover"
                    style={{ objectPosition: 'center center' }}
                    sizes="(min-width: 768px) 100vw, 100vw"
                  />
                </div>
              </CorridorStyleFrame>
            </div>
          </section>

          {/* Text block 3 – float in from right */}
          <section ref={s5.ref} className="mb-24 md:mb-32" style={reveal(s5.progress)}>
            <div className="will-change-transform" style={revealBoxFloat(s5.progress, true)}>
              <div className={boxClass} style={boxShadow}>
                <p className={textBlock} style={textBlockStyle}>
                  The responsibility was clear. To create pieces that do not merely adorn, but contribute. To elevate the woman intellectually and culturally, not only visually. To design garments that spark curiosity and ambition, and that support growth in those who wear them. To bring exceptional fabrics and couture techniques into designs suited for everyday life. And to bridge Middle Eastern culture with Western mastery of craftsmanship, so that women who choose modest dressing or cultural alignment are never required to compromise on fit, quality, or design.
                </p>
              </div>
            </div>
          </section>

          {/* Frame 3 */}
          <section ref={s6.ref} className="mb-24 md:mb-32" style={reveal(s6.progress)}>
            <div className="w-full will-change-transform" style={revealFrame(s6.progress, false)}>
              <CorridorStyleFrame aspectRatio="16/9" frameNumber={3}>
                <div className="absolute inset-0 w-full h-full">
                  <video
                    src="/our%20story%20frame%204.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ objectPosition: 'center center' }}
                    aria-label="Our story"
                  />
                </div>
              </CorridorStyleFrame>
            </div>
          </section>

          {/* Text block 4 – float in from left */}
          <section ref={s7.ref} className="mb-24 md:mb-32" style={reveal(s7.progress)}>
            <div className="will-change-transform md:max-w-[calc(100%-2rem)]" style={revealBoxFloat(s7.progress, false)}>
              <div className={boxClass} style={boxShadow}>
                <p className={`${textBlock} mb-10`} style={textBlockStyle}>
                  Weeks after the gathering, historic ateliers across Europe were selected based on their centuries old knowledge of weaving, embroidery, and lace manufacturing. The finest materials known in the luxury industry were sourced, and Italy&apos;s most experienced craftsmen were entrusted with the execution of the art of patternmaking. Not to simply produce fashion collections, but to merge the shared philosophies into a universal language understood across cultures and eras.
                </p>
                <p className={`${textBlock} mb-10`} style={textBlockStyle}>
                  Thus, Boutallion came into being.
                </p>
                <p className={textBlock} style={textBlockStyle}>
                  Boutallion exists at the intersection of jewellery thinking and couture craftsmanship. Each creation is treated with the same discipline as a fine jewel. Considered in weight, balance, and composition. Designed to endure beyond season and circumstance.
                </p>
              </div>
            </div>
          </section>

          {/* Frame 4 */}
          <section ref={s8.ref} className="mb-24 md:mb-32" style={reveal(s8.progress)}>
            <div className="w-full will-change-transform" style={revealFrame(s8.progress, true)}>
              <CorridorStyleFrame aspectRatio="16/9" frameNumber={4}>
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    src="/our%20story%20frame%205.png"
                    alt="Our story"
                    fill
                    className="object-cover"
                    style={{ objectPosition: 'center center' }}
                    sizes="(min-width: 768px) 100vw, 100vw"
                  />
                </div>
              </CorridorStyleFrame>
            </div>
          </section>

          {/* Text block 5 – float in from right */}
          <section ref={s9.ref} className="mb-24 md:mb-32" style={reveal(s9.progress)}>
            <div className="will-change-transform ml-0 md:ml-auto md:max-w-[calc(100%-2rem)]" style={revealBoxFloat(s9.progress, true)}>
              <div className={boxClass} style={boxShadow}>
                <p className={`${textBlock} mb-10`} style={textBlockStyle}>
                  The house creates for women who understand that what they wear participates in how they are perceived. Women who recognise refinement as an internal alignment rather than an outward performance. Women who move through the world with awareness of their role within it. Women who do not seek to be merely noticed, but to be recognised and remembered.
                </p>
                <p className={`${textBlock} mb-10`} style={textBlockStyle}>
                  Today, Boutallion is chosen by women from respected lineages across the world. This alignment exists through shared values. Boutallion garments accompany a woman across geographies and moments while remaining constant in stature. From refined daily aesthetics to luxury abayas and couture creations, each piece carries the same sense of composure, intelligence, and permanence. Regardless of cultural background, a Boutallion garment may be worn by anyone who chooses timeless elegance over trends.
                </p>
                <p className={textBlock} style={textBlockStyle}>
                  Luxury at Boutallion is experienced immediately. Through touch. Through weight. Through the way a garment settles and responds to the body. The sensation is recognisable and lasting.
                </p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section ref={cta.ref} className="text-center" style={reveal(cta.progress)}>
            <div className={`${boxClass} p-12 md:p-16`} style={boxShadow}>
              <p className={`${textBlock} mx-auto mb-10`} style={textBlockStyle}>
                At Boutallion, it is not so much about us. It is about you. What is your story? Who are you and what matters to you? How do you wish to feel, and how do you wish to be remembered? Within a universe of possibility, what you choose to wear shapes what you reflect, and every choice carries its own probability of outcome.
              </p>
              <p className={`${textBlock} mx-auto mb-12`} style={textBlockStyle}>
                You are the architect. The architect of your life.
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

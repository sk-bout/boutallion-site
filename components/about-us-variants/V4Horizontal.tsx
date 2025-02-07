'use client'

import { useRef, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ABOUT_US_CONTENT } from '@/lib/about-us-content'

const SLIDE_WIDTH = 420
const SLIDE_GAP = 48

export default function V4Horizontal() {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) {
        e.preventDefault()
        el.scrollLeft += e.deltaY
      }
    }
    el.addEventListener('wheel', handleWheel, { passive: false })
    return () => el.removeEventListener('wheel', handleWheel)
  }, [])

  const slides = [
    { id: 1, type: 'text', content: ABOUT_US_CONTENT.title, subtitle: ABOUT_US_CONTENT.hero[0] },
    { id: 2, type: 'image', label: 'Lookbook' },
    { id: 3, type: 'text', content: ABOUT_US_CONTENT.hero[1] },
    { id: 4, type: 'image', label: 'Craft' },
    { id: 5, type: 'text', content: ABOUT_US_CONTENT.section1 },
    { id: 6, type: 'image', label: 'Detail' },
    { id: 7, type: 'text', content: ABOUT_US_CONTENT.cta, cta: true },
  ]

  return (
    <div className="fixed inset-0 bg-[#031a1d] overflow-hidden flex items-center">
      <style>{`
        .horizontal-scroll::-webkit-scrollbar { display: none; }
      `}</style>
      <div
        ref={scrollRef}
        className="horizontal-scroll flex overflow-x-auto overflow-y-hidden h-full py-24 px-8 md:px-16 snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div
          className="flex gap-12 h-full items-center"
          style={{ minWidth: 'max-content' }}
        >
          {slides.map((slide) => (
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: slide.id * 0.05 }}
              className="flex-shrink-0 flex flex-col justify-center rounded-sm"
              style={{
                width: SLIDE_WIDTH,
                minHeight: 360,
                scrollSnapAlign: 'center',
              }}
            >
              {slide.type === 'text' ? (
                <div
                  className="h-full flex flex-col justify-center p-10 border border-gold-DEFAULT/15"
                  style={{ background: 'linear-gradient(135deg, #041f23 0%, #031a1d 100%)' }}
                >
                  <h2 className="font-portrait text-3xl md:text-4xl text-white/[0.98] mb-6">
                    {slide.content}
                  </h2>
                  {slide.subtitle && (
                    <p className="font-refined text-base text-white/75 leading-[1.8]">
                      {slide.subtitle}
                    </p>
                  )}
                  {slide.cta && (
                    <Link
                      href="/lab/corridor/request-order"
                      className="font-refined text-sm tracking-[0.2em] uppercase text-boutallion-green bg-gold-DEFAULT hover:bg-gold-light px-10 py-4 mt-8 inline-block w-fit transition-colors"
                    >
                      Request Access
                    </Link>
                  )}
                </div>
              ) : (
                <div
                  className="aspect-[3/4] w-full border border-gold-DEFAULT/20 flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #052a2f 0%, #031a1d 100%)' }}
                >
                  <span className="font-refined text-white/25 text-xs tracking-[0.3em] uppercase">
                    {slide.label}
                  </span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-refined text-xs text-white/40 tracking-widest">
        Scroll horizontally →
      </div>
    </div>
  )
}

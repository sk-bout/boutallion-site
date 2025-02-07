'use client'

import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import CorridorStyleFrame from '@/components/CorridorStyleFrame'
import { ABOUT_US_CONTENT } from '@/lib/about-us-content'

export default function V9ScrollVideo() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Parallax and opacity driven by scroll
  const videoOpacity = useTransform(scrollYProgress, [0, 0.15, 0.4, 0.6], [1, 0.8, 0.4, 0])
  const videoScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])
  const contentOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1])
  const y = useTransform(scrollYProgress, [0.25, 0.5], ['0%', '-15%'])

  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', setProgress)
    return () => unsubscribe()
  }, [scrollYProgress])

  return (
    <div ref={containerRef} className="fixed inset-0 overflow-auto bg-[#031a1d]">
      {/* Hero with video placeholder - scroll-triggered */}
      <section className="relative h-[100vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ opacity: videoOpacity, scale: videoScale }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-[#031a1d]"
            style={{
              background: `
                linear-gradient(180deg, #031a1d 0%, #041f23 50%, #031a1d 100%),
                radial-gradient(circle at 50% 50%, rgba(212,197,160,0.08) 0%, transparent 60%)
              `,
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center px-8">
            <div className="w-full max-w-4xl relative">
              <CorridorStyleFrame
                aspectRatio="16/9"
                showPlaceholder={false}
                className="w-full"
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-refined text-white/30 text-xs tracking-[0.3em] uppercase">
                    Scroll-driven video / motion
                  </span>
                  <span className="absolute bottom-4 right-4 font-refined text-white/20 text-[10px] tracking-widest">
                    {Math.round(progress * 100)}%
                  </span>
                </div>
              </CorridorStyleFrame>
            </div>
          </div>
        </motion.div>

        <motion.div
          style={{ opacity: videoOpacity }}
          className="relative z-10 text-center px-8"
        >
          <h1 className="font-portrait text-5xl md:text-7xl lg:text-8xl text-white/[0.98] mb-6">
            {ABOUT_US_CONTENT.title}
          </h1>
          <p className="font-refined text-xl text-white/80 max-w-xl mx-auto">
            {ABOUT_US_CONTENT.hero[0]}
          </p>
        </motion.div>
      </section>

      {/* Content revealed on scroll */}
      <motion.section
        style={{ opacity: contentOpacity, y }}
        className="relative z-20 -mt-[30vh] pt-32 pb-24 px-6 md:px-12"
      >
        <div className="max-w-3xl mx-auto">
          <p className="font-refined text-xl text-white/85 leading-[1.8] mb-12">
            {ABOUT_US_CONTENT.hero[1]}
          </p>
          <p className="font-refined text-lg text-white/75 leading-[1.9] mb-12">
            {ABOUT_US_CONTENT.hero[2]}
          </p>
          <p className="font-refined text-lg text-white/75 leading-[1.9] mb-16">
            {ABOUT_US_CONTENT.section1}
          </p>
          <p className="font-refined text-xl text-white/90 mb-10">
            {ABOUT_US_CONTENT.cta}
          </p>
          <Link
            href="/lab/corridor/request-order"
            className="font-refined text-sm tracking-[0.2em] uppercase text-boutallion-green bg-gold-DEFAULT hover:bg-gold-light px-12 py-4 inline-block transition-colors"
          >
            Request Access
          </Link>
        </div>
      </motion.section>
    </div>
  )
}

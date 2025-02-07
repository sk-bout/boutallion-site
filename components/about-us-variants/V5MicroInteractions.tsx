'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ABOUT_US_CONTENT } from '@/lib/about-us-content'

export default function V5MicroInteractions() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState<string | null>(null)

  useEffect(() => {
    const handleMove = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  return (
    <div className="fixed inset-0 overflow-auto bg-[#031a1d]">
      <main className="max-w-4xl mx-auto px-6 md:px-12 py-24 md:py-32">
        <motion.h1
          className="font-portrait text-5xl md:text-7xl lg:text-8xl text-white/[0.98] mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {ABOUT_US_CONTENT.title}
        </motion.h1>
        <div
          className="h-px bg-gold-DEFAULT/50 mb-12 transition-all duration-500"
          style={{ width: hovered === 'hero' ? 160 : 80 }}
        />
        <motion.p
          className="font-refined text-xl text-white/85 max-w-2xl leading-[1.8] mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onMouseEnter={() => setHovered('hero')}
          onMouseLeave={() => setHovered(null)}
        >
          {ABOUT_US_CONTENT.hero[0]}
        </motion.p>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16 mb-20">
          <motion.div
            className="relative aspect-[4/5] bg-[#041f23] border border-gold-DEFAULT/20 flex items-center justify-center cursor-pointer group"
            onMouseEnter={() => setHovered('img1')}
            onMouseLeave={() => setHovered(null)}
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.4 },
            }}
          >
            <div className="absolute inset-0 bg-gold-DEFAULT/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            <span className="font-refined text-white/25 text-xs tracking-[0.3em] uppercase">
              Image
            </span>
          </motion.div>
          <div>
            <motion.p
              className="font-refined text-lg text-white/75 leading-[1.9]"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {ABOUT_US_CONTENT.hero[1]}
            </motion.p>
          </div>
        </div>

        <motion.p
          className="font-refined text-lg text-white/75 leading-[1.9] max-w-2xl mb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {ABOUT_US_CONTENT.section1}
        </motion.p>

        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Link
            href="/lab/corridor/request-order"
            className="group font-refined text-sm tracking-[0.2em] uppercase text-boutallion-green bg-gold-DEFAULT hover:bg-gold-light px-12 py-4 transition-all duration-300 hover:scale-105"
          >
            <span className="relative">Request Access</span>
          </Link>
        </motion.div>
      </main>
    </div>
  )
}

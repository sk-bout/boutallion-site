'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function StoryChapter() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 200)
  }, [])

  return (
    <div className="min-h-screen py-24 md:py-32 px-8 md:px-16">
      <div className="max-w-4xl mx-auto space-y-24 md:space-y-32">
        {/* Title */}
        <div
          className="space-y-6"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 1200ms ease-in-out, transform 1200ms ease-in-out',
          }}
        >
          <h1 className="font-portrait text-5xl md:text-7xl text-white/95 tracking-tight">
            The Story of Boutallion
          </h1>
          <div className="w-24 h-px bg-white/20" />
        </div>

        {/* Content blocks */}
        <div className="space-y-16 md:space-y-24">
          {/* Text block 1 */}
          <div
            className="space-y-6"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 1200ms ease-in-out 200ms, transform 1200ms ease-in-out 200ms',
            }}
          >
            <p className="font-refined text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl">
              Born in Italy, 2016. Boutallion emerged from a vision of timeless elegance,
              where tradition meets contemporary refinement.
            </p>
          </div>

          {/* Image plate */}
          <div
            className="relative aspect-[4/5] w-full"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'scale(1)' : 'scale(0.98)',
              transition: 'opacity 1600ms ease-in-out 400ms, transform 1600ms ease-in-out 400ms',
            }}
          >
            <div className="absolute inset-0 bg-white/5 animate-pulse" />
            <div className="absolute inset-0 flex items-center justify-center text-white/20 font-refined text-sm">
              Image Placeholder
            </div>
          </div>

          {/* Text block 2 */}
          <div
            className="space-y-6"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 1200ms ease-in-out 600ms, transform 1200ms ease-in-out 600ms',
            }}
          >
            <p className="font-refined text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl">
              Each garment is a testament to the art of slow creation, where every stitch
              carries intention and every fold tells a story.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}



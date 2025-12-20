'use client'

import { useEffect, useState } from 'react'

export default function MediaChapter() {
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
            Media
          </h1>
          <div className="w-24 h-px bg-white/20" />
        </div>

        {/* Editorial layout */}
        <div className="space-y-16 md:space-y-24">
          {/* Press excerpt */}
          <div
            className="space-y-6"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 1200ms ease-in-out 200ms, transform 1200ms ease-in-out 200ms',
            }}
          >
            <blockquote className="font-refined text-xl md:text-2xl text-white/80 leading-relaxed italic max-w-2xl">
              &quot;Boutallion represents a new chapter in luxury abaya design, where
              Italian craftsmanship meets timeless elegance.&quot;
            </blockquote>
            <p className="font-refined text-sm text-white/60 uppercase tracking-wider">
              — Publication Name
            </p>
          </div>

          {/* Campaign stills */}
          <div className="space-y-16 md:space-y-24">
            {[1, 2, 3].map((item, index) => (
              <div
                key={item}
                className="relative aspect-[4/5] w-full"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'scale(1)' : 'scale(0.98)',
                  transition: `opacity 1600ms ease-in-out ${400 + index * 200}ms, transform 1600ms ease-in-out ${400 + index * 200}ms`,
                }}
              >
                <div className="absolute inset-0 bg-white/5" />
                <div className="absolute inset-0 flex items-center justify-center text-white/20 font-refined text-sm">
                  Campaign Image {item}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}


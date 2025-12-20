'use client'

import { useEffect, useState } from 'react'

export default function ContactChapter() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 200)
  }, [])

  return (
    <div className="min-h-screen py-24 md:py-32 px-8 md:px-16">
      <div className="max-w-2xl mx-auto space-y-24 md:space-y-32">
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
            Contact
          </h1>
          <div className="w-24 h-px bg-white/20" />
        </div>

        {/* Contact information */}
        <div
          className="space-y-12"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 1200ms ease-in-out 200ms, transform 1200ms ease-in-out 200ms',
          }}
        >
          <div className="space-y-2">
            <p className="font-refined text-sm text-white/60 uppercase tracking-wider">
              Email
            </p>
            <a
              href="mailto:info@boutallion.com"
              className="font-refined text-lg text-white/90 hover:text-white/95 transition-colors duration-900"
            >
              info@boutallion.com
            </a>
          </div>

          <div className="space-y-2">
            <p className="font-refined text-sm text-white/60 uppercase tracking-wider">
              Atelier
            </p>
            <p className="font-refined text-lg text-white/90 leading-relaxed">
              Italy
            </p>
          </div>

          <div className="space-y-2">
            <p className="font-refined text-sm text-white/60 uppercase tracking-wider">
              By Appointment
            </p>
            <p className="font-refined text-lg text-white/90 leading-relaxed">
              We welcome visits to our atelier by prior arrangement.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}



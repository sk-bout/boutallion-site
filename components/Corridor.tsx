'use client'

import { useRef } from 'react'
import { useRouter } from 'next/navigation'

interface CorridorProps {
  activeChapter: string | null
  onChapterOpen: (chapterId: string) => void
  onChapterClose: () => void
  isTransitioning: boolean
}

const CORRIDOR_SECTIONS = [
  { id: 'story', label: 'The Story of Boutallion', threshold: 0 },
  { id: 'collections', label: 'Collections', threshold: 1 },
  { id: 'materials', label: 'Materials', threshold: 2 },
  { id: 'craftsmanship', label: 'Craftsmanship', threshold: 3 },
  { id: 'request-order', label: 'Request Order', threshold: 4 },
  { id: 'media', label: 'Media', threshold: 5 },
  { id: 'contact', label: 'Contact', threshold: 6 },
]

export default function Corridor({
  activeChapter,
  onChapterOpen,
  onChapterClose,
  isTransitioning,
}: CorridorProps) {
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)

  const handleThresholdClick = (sectionId: string) => {
    if (activeChapter) {
      onChapterClose()
      setTimeout(() => {
        onChapterOpen(sectionId)
      }, 600)
    } else {
      onChapterOpen(sectionId)
    }
  }

  const opacity = activeChapter ? 0 : 1

  return (
    <div
      ref={containerRef}
      data-lenis-prevent
      className="fixed inset-0 overflow-y-auto overflow-x-hidden"
      style={{
        opacity,
        transition: 'opacity 1200ms ease-in-out',
        pointerEvents: activeChapter ? 'none' : 'auto',
      }}
    >
      {/* Corridor background */}
      <div className="relative min-h-[700vh]">
        {/* Plaster-like texture background */}
        <div className="fixed inset-0 bg-gradient-to-b from-twilight via-indigo-dark to-twilight">
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='texture'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.04' numOctaves='5'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23texture)'/%3E%3C/svg%3E")`,
            }}
          />
        </div>

        {/* Soft indirect lighting */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-1/3 h-full bg-gradient-to-r from-white/5 via-transparent to-transparent" />
          <div className="absolute top-0 right-1/4 w-1/3 h-full bg-gradient-to-l from-white/5 via-transparent to-transparent" />
        </div>

        {/* Section Thresholds */}
        {CORRIDOR_SECTIONS.map((section, index) => {
          const thresholdPosition = section.threshold * 100 + 10 // vh units
          const isActive = activeChapter === section.id
          const isVisible = !activeChapter || isActive

          return (
            <div
              key={section.id}
              className="fixed left-0 right-0"
              style={{
                top: `${thresholdPosition}vh`,
                opacity: isVisible ? 1 : 0,
                transition: 'opacity 1200ms ease-in-out',
                pointerEvents: activeChapter && !isActive ? 'none' : 'auto',
              }}
            >
              <div className="container mx-auto px-8 md:px-16">
                <button
                  onClick={() => handleThresholdClick(section.id)}
                  className="group w-full text-left py-16 md:py-24 transition-opacity duration-1200 hover:opacity-80"
                  disabled={isTransitioning}
                >
                  {/* Threshold frame */}
                  <div className="relative">
                    <div className="absolute inset-0 border-t border-white/10" />
                    <div className="absolute inset-0 border-b border-white/10" />
                    
                    {/* Expanding frame on hover */}
                    <div
                      className="absolute inset-0 border-l border-r border-white/5 transition-all duration-1200 group-hover:border-white/15"
                      style={{
                        left: '-2rem',
                        right: '-2rem',
                      }}
                    />

                    {/* Section label */}
                    <div className="relative pt-8 pb-8">
                      <h2 className="font-portrait text-4xl md:text-6xl text-white/90 tracking-tight">
                        {section.label}
                      </h2>
                      <div className="mt-4 w-24 h-px bg-white/20 group-hover:bg-white/40 transition-colors duration-1200" />
                    </div>
                  </div>
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}


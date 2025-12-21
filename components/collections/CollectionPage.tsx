'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface CollectionPageProps {
  collectionId: string
  router: ReturnType<typeof useRouter>
}

const COLLECTION_DATA: { [key: string]: { name: string; description: string } } = {
  'roots-leaves': {
    name: 'Roots & Leaves',
    description: 'A collection that draws inspiration from the earth, where roots anchor and leaves reach toward light.',
  },
  'wings-of-desire': {
    name: 'Wings of Desire',
    description: 'Ethereal forms that capture the essence of aspiration and the delicate balance between restraint and expression.',
  },
  'garden-to-paradise': {
    name: 'Garden to Paradise',
    description: 'A journey through cultivated beauty, where every detail blooms with intention and grace.',
  },
}

export default function CollectionPage({ collectionId, router }: CollectionPageProps) {
  const [isVisible, setIsVisible] = useState(false)
  const collection = COLLECTION_DATA[collectionId] || COLLECTION_DATA['roots-leaves']

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 200)
  }, [collectionId])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => {
      router.push('/corridor/collections')
    }, 1200)
  }

  // Image order: Atmospheric opening, Hero garment, Detail macro, Movement image, Optional symbolic plate
  const imageCount = 5

  return (
    <div
      className="fixed inset-0 bg-twilight z-50 overflow-y-auto overflow-x-hidden"
      style={{
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 1200ms ease-in-out',
      }}
    >
      {/* Close button */}
      <button
        onClick={handleClose}
        className="fixed top-8 right-8 z-60 px-6 py-3 font-refined text-sm tracking-wider text-white/60 hover:text-white/90 transition-colors duration-900 uppercase"
      >
        Close
      </button>

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
              {collection.name}
            </h1>
            <div className="w-24 h-px bg-white/20" />
          </div>

          {/* Poetic text */}
          <div
            className="space-y-6"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 1200ms ease-in-out 200ms, transform 1200ms ease-in-out 200ms',
            }}
          >
            <p className="font-refined text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl">
              {collection.description}
            </p>
          </div>

          {/* Editorial image plates */}
          <div className="space-y-16 md:space-y-24">
            {Array.from({ length: imageCount }).map((_, index) => {
              const delay = 400 + index * 200
              return (
                <div
                  key={index}
                  className="relative aspect-[4/5] w-full"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'scale(1)' : 'scale(0.98)',
                    transition: `opacity 1600ms ease-in-out ${delay}ms, transform 1600ms ease-in-out ${delay}ms`,
                  }}
                >
                  <div className="absolute inset-0 bg-white/5" />
                  <div className="absolute inset-0 flex items-center justify-center text-white/20 font-refined text-sm">
                    {index === 0 && 'Atmospheric Opening'}
                    {index === 1 && 'Hero Garment'}
                    {index === 2 && 'Detail Macro'}
                    {index === 3 && 'Movement Image'}
                    {index === 4 && 'Symbolic Plate'}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Behind the scenes reveal */}
          <div
            className="relative aspect-[16/9] w-full"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'scale(1)' : 'scale(0.98)',
              transition: `opacity 1600ms ease-in-out ${1400}ms, transform 1600ms ease-in-out ${1400}ms`,
            }}
          >
            <div className="absolute inset-0 bg-white/5" />
            <div className="absolute inset-0 flex items-center justify-center text-white/20 font-refined text-sm">
              Behind the Scenes
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}




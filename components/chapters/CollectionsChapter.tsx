'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface CollectionsChapterProps {
  onClose: () => void
}

const COLLECTIONS = [
  { id: 'roots-leaves', name: 'Roots & Leaves' },
  { id: 'wings-of-desire', name: 'Wings of Desire' },
  { id: 'garden-to-paradise', name: 'Garden to Paradise' },
]

export default function CollectionsChapter({ onClose }: CollectionsChapterProps) {
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(false)
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null)

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 200)
  }, [])

  const handleCollectionClick = (collectionId: string) => {
    setSelectedCollection(collectionId)
    setTimeout(() => {
      router.push(`/collections/${collectionId}`)
    }, 800)
  }

  if (selectedCollection) {
    return null // Transitioning to collection page
  }

  return (
    <div className="min-h-screen py-24 md:py-32 px-8 md:px-16">
      <div className="max-w-6xl mx-auto space-y-24 md:space-y-32">
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
            Collections
          </h1>
          <div className="w-24 h-px bg-white/20" />
        </div>

        {/* Collections Antechamber */}
        <div className="space-y-16 md:space-y-24">
          {COLLECTIONS.map((collection, index) => (
            <button
              key={collection.id}
              onClick={() => handleCollectionClick(collection.id)}
              className="group w-full text-left"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: `opacity 1200ms ease-in-out ${200 + index * 200}ms, transform 1200ms ease-in-out ${200 + index * 200}ms`,
              }}
            >
              <div className="space-y-4">
                <h2 className="font-portrait text-3xl md:text-5xl text-white/90 group-hover:text-white/95 transition-colors duration-900 tracking-tight">
                  {collection.name}
                </h2>
                <div className="w-24 h-px bg-white/20 group-hover:w-32 group-hover:bg-white/40 transition-all duration-900" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}



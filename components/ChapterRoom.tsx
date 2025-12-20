'use client'

import { useEffect, useState } from 'react'
import StoryChapter from './chapters/StoryChapter'
import CollectionsChapter from './chapters/CollectionsChapter'
import MaterialsChapter from './chapters/MaterialsChapter'
import CraftsmanshipChapter from './chapters/CraftsmanshipChapter'
import RequestOrderChapter from './chapters/RequestOrderChapter'
import MediaChapter from './chapters/MediaChapter'
import ContactChapter from './chapters/ContactChapter'

interface ChapterRoomProps {
  chapterId: string
  onClose: () => void
  isTransitioning: boolean
}

export default function ChapterRoom({
  chapterId,
  onClose,
  isTransitioning,
}: ChapterRoomProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Fade in chapter
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [chapterId])

  const renderChapter = () => {
    switch (chapterId) {
      case 'story':
        return <StoryChapter />
      case 'collections':
        return <CollectionsChapter onClose={onClose} />
      case 'materials':
        return <MaterialsChapter />
      case 'craftsmanship':
        return <CraftsmanshipChapter />
      case 'request-order':
        return <RequestOrderChapter />
      case 'media':
        return <MediaChapter />
      case 'contact':
        return <ContactChapter />
      default:
        return null
    }
  }

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
        onClick={onClose}
        className="fixed top-8 right-8 z-60 px-6 py-3 font-refined text-sm tracking-wider text-white/60 hover:text-white/90 transition-colors duration-900 uppercase"
        disabled={isTransitioning}
      >
        Close
      </button>

      {/* Chapter content */}
      <div className="min-h-screen">
        {renderChapter()}
      </div>
    </div>
  )
}


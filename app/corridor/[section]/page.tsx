'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Corridor from '@/components/Corridor'
import ChapterRoom from '@/components/ChapterRoom'
import { LenisProvider } from '@/components/LenisProvider'

const SECTIONS = [
  'story',
  'collections',
  'materials',
  'craftsmanship',
  'request-order',
  'media',
  'contact',
]

export default function CorridorPage() {
  const params = useParams()
  const router = useRouter()
  const [activeChapter, setActiveChapter] = useState<string | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const sectionId = params?.section as string

  useEffect(() => {
    if (sectionId && SECTIONS.includes(sectionId)) {
      // Auto-open chapter on entry
      setTimeout(() => {
        setActiveChapter(sectionId)
      }, 800)
    } else if (sectionId && !SECTIONS.includes(sectionId)) {
      // Invalid section - redirect to locale homepage
      // Use replace to avoid adding to history (301-like behavior)
      const currentPath = window.location.pathname
      const locale = currentPath.split('/')[1] || 'en'
      router.replace(`/${locale}`)
    }
  }, [sectionId, router])

  const handleChapterClose = () => {
    setIsTransitioning(true)
    setActiveChapter(null)
    setTimeout(() => {
      setIsTransitioning(false)
      router.push('/')
    }, 1200)
  }

  const handleChapterOpen = (chapterId: string) => {
    setIsTransitioning(true)
    setActiveChapter(chapterId)
    setTimeout(() => {
      setIsTransitioning(false)
    }, 1200)
  }

  return (
    <LenisProvider>
      <main className="fixed inset-0 overflow-hidden">
        <Corridor
          activeChapter={activeChapter}
          onChapterOpen={handleChapterOpen}
          onChapterClose={handleChapterClose}
          isTransitioning={isTransitioning}
        />
        {activeChapter && (
          <ChapterRoom
            chapterId={activeChapter}
            onClose={handleChapterClose}
            isTransitioning={isTransitioning}
          />
        )}
      </main>
    </LenisProvider>
  )
}


'use client'

import { useState, useRef, useEffect } from 'react'
import Row from './Row'
import { row1Items, row2Items } from './items'
import PermanentLanguageSwitcher from '@/components/PermanentLanguageSwitcher'
import SocialIcons from '@/components/SocialIcons'
import CorridorNavigation from '@/components/CorridorNavigation'
import BaroqueBackground from '@/components/BaroqueBackground'

export default function Corridor() {
  const [isHovered, setIsHovered] = useState(false)
  const [cardHeight, setCardHeight] = useState(400)
  const [gapSize, setGapSize] = useState(32)
  const [topPadding, setTopPadding] = useState(90)
  const [bottomPadding, setBottomPadding] = useState(30)
  const containerRef = useRef<HTMLDivElement>(null)

  // Base speed - very slow, museum-like
  const baseSpeed = 0.3

  // Calculate responsive card height based on viewport - ensure everything fits exactly
  useEffect(() => {
    const calculateCardHeight = () => {
      const vh = window.innerHeight
      const vw = window.innerWidth
      const isMobile = vw < 768
      const isTablet = vw >= 768 && vw < 1024
      
      // Calculate exact reserved space
      const labelHeight = isMobile ? 40 : 60 // Label at top
      const calculatedGap = isMobile ? 16 : isTablet ? 24 : 32 // Gap between rows (2 gaps total)
      const calculatedTopPadding = isMobile ? 60 : 90 // Label + padding
      const calculatedBottomPadding = isMobile ? 20 : 30
      
      // Update gap and padding state
      setGapSize(calculatedGap)
      setTopPadding(calculatedTopPadding)
      setBottomPadding(calculatedBottomPadding)
      
      // Total reserved: top padding (includes label) + 1 gap + bottom padding + text areas
      const textAreaHeight = isMobile ? 120 : 160 // BOUTALLION text + copyright
      const totalReserved = calculatedTopPadding + calculatedGap + calculatedBottomPadding + textAreaHeight
      
      // Calculate available height for 2 rows
      const availableHeight = vh - totalReserved
      
      // Each row gets exactly 1/2 of available space
      const rowHeight = Math.floor(availableHeight / 2)
      
      // Card height should use most of the row height for bigger frames
      const calculatedHeight = Math.max(250, rowHeight - 1) // Minimal safety margin
      
      // Apply responsive constraints - significantly increased max sizes for much bigger frames
      if (isMobile) {
        setCardHeight(Math.min(450, calculatedHeight))
      } else if (isTablet) {
        setCardHeight(Math.min(600, calculatedHeight))
      } else {
        setCardHeight(Math.min(700, calculatedHeight))
      }
    }

    calculateCardHeight()
    window.addEventListener('resize', calculateCardHeight)
    return () => window.removeEventListener('resize', calculateCardHeight)
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-boutallion-green overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Baroque decorative background elements */}
      <BaroqueBackground />
      {/* BOUTALLION text - centered above first row */}
      <div className="absolute top-0 left-0 right-0 flex justify-center items-center z-20" style={{ paddingTop: 'clamp(40px, 5vh, 60px)' }}>
        <h1 className="font-portrait text-gold text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-[0.1em] uppercase">
          BOUTALLION
        </h1>
      </div>

      {/* Navigation menu - top left */}
      <CorridorNavigation />

      {/* Language switcher - top right */}
      <PermanentLanguageSwitcher />

      {/* Social icons - bottom right */}
      <SocialIcons />

      {/* Two rows - using CSS Grid for perfect distribution */}
      <div 
        className="absolute inset-0 flex flex-col justify-center items-center"
        style={{
          gap: `${gapSize}px`,
          paddingTop: 'clamp(100px, 12vh, 140px)',
          paddingBottom: 'clamp(80px, 10vh, 120px)',
          height: '100vh',
          overflow: 'hidden',
        }}
      >
        {/* Row 1: Left-to-right */}
        <div className="relative w-full flex-shrink-0 overflow-hidden" style={{ zIndex: 1, height: `${cardHeight}px`, maxHeight: `${cardHeight}px` }}>
          <Row
            items={row1Items}
            direction="right"
            speed={baseSpeed}
            isHovered={isHovered}
            cardHeight={cardHeight}
          />
        </div>

        {/* Row 2: Right-to-left */}
        <div className="relative w-full flex-shrink-0 overflow-hidden" style={{ zIndex: 2, height: `${cardHeight}px`, maxHeight: `${cardHeight}px` }}>
          <Row
            items={row2Items}
            direction="left"
            speed={baseSpeed}
            isHovered={isHovered}
            cardHeight={cardHeight}
          />
        </div>
      </div>

      {/* Copyright - below first row */}
      <div className="absolute bottom-4 left-4 sm:bottom-8 sm:left-8 z-20">
        <p className="font-refined text-white/40 text-xs sm:text-sm">
          © Boutallion 2026
        </p>
      </div>
    </div>
  )
}


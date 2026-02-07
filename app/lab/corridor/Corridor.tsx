`use client`

import { useState, useRef, useEffect } from 'react'
import Row from './Row'
import { row1Items, row2Items } from './items'
import SocialIcons from '@/components/SocialIcons'
import Footer from '@/components/Footer'
import BaroqueBackground from '@/components/BaroqueBackground'

export default function Corridor() {
  const [isHovered, setIsHovered] = useState(false)
  const [cardHeight, setCardHeight] = useState(400)
  const [gapSize, setGapSize] = useState(32)
  const [topPadding, setTopPadding] = useState(90)
  const [bottomPadding, setBottomPadding] = useState(30)
  const containerRef = useRef<HTMLDivElement>(null)

  const baseSpeed = 2.5

  // Calculate responsive card height based on viewport - ensure everything fits exactly
  useEffect(() => {
    const calculateCardHeight = () => {
      const vh = window.innerHeight
      const vw = window.innerWidth
      const isMobile = vw < 768
      const isTablet = vw >= 768 && vw < 1024
      
      // Vertical gap BETWEEN the two rows (keep subtle but give more space to frames)
      const calculatedGap = isMobile ? 14 : isTablet ? 20 : 26
      setGapSize(calculatedGap)

      // Padding above first row (space for header + gap before frames)
      const headerHeight = isMobile ? 72 : 88
      const calculatedTopPadding = headerHeight + (isMobile ? 20 : 24)
      // Padding below second row (space above copyright)
      const calculatedBottomPadding = (isMobile ? 24 : 40) + 8
      setTopPadding(calculatedTopPadding)
      setBottomPadding(calculatedBottomPadding)
      
      // Extra vertical space reserved for logo + copyright text themselves
      const textAreaHeight = isMobile ? 50 : 60
      const nonRowSpace = calculatedTopPadding + calculatedBottomPadding + textAreaHeight
      
      // Height available for the two frame rows plus the gap between them
      const availableHeight = vh - nonRowSpace
      // Reserve 8px buffer (4px per row) so bottom border never gets clipped
      const buffer = 8
      
      // Target card height so that 2 rows + gap fit exactly with buffer for borders
      const idealCardHeight = Math.floor((availableHeight - calculatedGap - buffer) / 2)
      
      const maxCardHeight = isMobile ? 640 : isTablet ? 720 : 880
      const minCardHeight = 320
      const calculatedHeight = Math.max(minCardHeight, Math.min(maxCardHeight, idealCardHeight))
      
      setCardHeight(calculatedHeight)
    }

    calculateCardHeight()
    window.addEventListener('resize', calculateCardHeight)
    return () => window.removeEventListener('resize', calculateCardHeight)
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 overflow-hidden z-10"
      style={{ backgroundColor: '#031a1d' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background */}
      <BaroqueBackground />

      {/* Social icons - bottom right */}
      <SocialIcons />

      {/* Two rows - using CSS Grid for perfect distribution */}
      <div 
        className="absolute inset-0 flex flex-col justify-center items-center"
        style={{
          zIndex: 5,
          gap: `${gapSize}px`,
          // Use calculated paddings so two rows always fit viewport
          paddingTop: `${topPadding}px`,
          paddingBottom: `${bottomPadding}px`,
          height: '100vh',
          overflow: 'hidden',
        }}
      >
        {/* Row 1: Left-to-right - extra 4px height so bottom border never clips */}
        <div className="relative w-full flex-shrink-0" style={{ zIndex: 1, height: `${cardHeight + 4}px`, minHeight: `${cardHeight + 4}px`, overflow: 'visible' }}>
          <Row
            items={row1Items}
            direction="right"
            speed={baseSpeed}
            isHovered={isHovered}
            cardHeight={cardHeight}
          />
        </div>

        {/* Row 2: Right-to-left - extra 4px height so bottom border never clips */}
        <div className="relative w-full flex-shrink-0" style={{ zIndex: 2, height: `${cardHeight + 4}px`, minHeight: `${cardHeight + 4}px`, overflow: 'visible' }}>
          <Row
            items={row2Items}
            direction="left"
            speed={baseSpeed}
            isHovered={isHovered}
            cardHeight={cardHeight}
          />
        </div>
      </div>

      <Footer />
    </div>
  )
}


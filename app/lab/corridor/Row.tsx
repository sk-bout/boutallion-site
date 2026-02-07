'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { RowItem } from './items'

interface RowProps {
  items: RowItem[]
  direction: 'left' | 'right'
  speed: number
  isHovered: boolean
  cardHeight?: number
}

export default function Row({ items, direction, speed, isHovered, cardHeight = 400 }: RowProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [trackWidth, setTrackWidth] = useState(0)
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null)
  const [isPaused, setIsPaused] = useState(false)
  const prefersReducedMotion = useRef(false)
  
  const cardHoveredCardId = hoveredCardId
  const duplicatedItems = [...items, ...items, ...items, ...items, ...items]

  const cardWidth = Math.round(cardHeight * 0.75)
  const gap = 24
  const estimatedOneSet = items.length * (cardWidth + gap)
  const effectiveTrackWidth = trackWidth > 0 ? trackWidth : estimatedOneSet

  const duration = effectiveTrackWidth > 0 ? Math.round((effectiveTrackWidth / 28) * 1000) : 120000
  const animName = `corridor-scroll-${direction}-${items.length}`
  const animRunning = effectiveTrackWidth > 0 && !isPaused

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    prefersReducedMotion.current = mediaQuery.matches
    mediaQuery.addEventListener('change', (e) => { prefersReducedMotion.current = e.matches })
    return () => mediaQuery.removeEventListener('change', () => {})
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const measure = () => {
      const w = track.scrollWidth
      const cycles = Math.max(1, duplicatedItems.length / items.length)
      const oneSet = cycles > 0 ? w / cycles : estimatedOneSet
      setTrackWidth(oneSet)
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(track)
    const t1 = setTimeout(measure, 300)
    const t2 = setTimeout(measure, 1000)
    const t3 = setTimeout(measure, 2500)
    return () => { ro.disconnect(); clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [items.length, duplicatedItems.length, estimatedOneSet])

  // Handle reduced motion - make it horizontally scrollable (disabled for lab corridor)
  if (false /* prefersReducedMotion.current */) {
    return (
      <div
        ref={containerRef}
        className="overflow-x-auto overflow-y-hidden h-full"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div
          ref={trackRef}
          className="flex gap-4 sm:gap-6 md:gap-8 px-4 sm:px-6 md:px-8 h-full items-center"
          style={{ width: 'max-content' }}
        >
          {items.map((item) => (
            <Card
              key={item.id}
              item={item}
              isHovered={hoveredCardId === item.id}
              hoveredCardId={cardHoveredCardId}
              onHover={() => {
                setHoveredCardId(item.id)
                if (item.type === 'image') {
                  setIsPaused(true)
                }
              }}
              onLeave={() => {
                setHoveredCardId(null)
                setIsPaused(false)
              }}
              cardHeight={cardHeight}
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      style={{ 
        height: '100%',
        maxHeight: '100%',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '16px',
        paddingRight: '16px',
        overflow: 'hidden',
      }}
    >
      <style>{`
        @keyframes ${animName} {
          0% { transform: translate3d(${direction === 'right' ? 0 : -Math.round(effectiveTrackWidth)}px, 0, 0); }
          100% { transform: translate3d(${direction === 'right' ? -Math.round(effectiveTrackWidth) : 0}px, 0, 0); }
        }
      `}</style>
      <div
        ref={trackRef}
        className="flex gap-4 sm:gap-6 md:gap-8 items-center shrink-0"
        style={{
          width: 'max-content',
          height: '100%',
          paddingLeft: '0',
          paddingRight: '0',
          animation: effectiveTrackWidth > 0 ? `${animName} ${duration}ms linear infinite` : 'none',
          animationPlayState: animRunning ? 'running' : 'paused',
        }}
      >
        {duplicatedItems.map((item, index) => (
          <Card
            key={`${item.id}-${index}`}
            item={item}
            isHovered={hoveredCardId === item.id}
            hoveredCardId={cardHoveredCardId}
            onHover={() => {
              setHoveredCardId(item.id)
              // Pause if hovering over an image
              if (item.type === 'image') {
                setIsPaused(true)
              }
            }}
            onLeave={() => {
              setHoveredCardId(null)
              setIsPaused(false)
            }}
            cardHeight={cardHeight}
          />
        ))}
      </div>
    </div>
  )
}

interface CardProps {
  item: RowItem
  isHovered: boolean
  hoveredCardId: string | null
  onHover: () => void
  onLeave: () => void
  cardHeight?: number
}

function Card({ item, isHovered, hoveredCardId, onHover, onLeave, cardHeight = 400 }: CardProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)

  // IntersectionObserver for video autoplay
  useEffect(() => {
    if (item.type !== 'video' || !videoRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting)
        })
      },
      { threshold: 0.1, rootMargin: '50px' } // Lower threshold and add margin for earlier detection
    )

    observer.observe(videoRef.current)

    return () => observer.disconnect()
  }, [item.type])

  // Play/pause video based on viewport and hover - improved autoplay
  useEffect(() => {
    if (item.type !== 'video' || !videoRef.current) return

    const playVideo = async () => {
      const video = videoRef.current
      if (!video) return

      try {
        // Ensure video is ready
        if (video.readyState >= 2) {
          await video.play()
        } else {
          // Wait for video to be ready
          const onCanPlay = async () => {
            try {
              await video.play()
            } catch (e) {
              console.log('Video play after ready failed:', e)
            }
            video.removeEventListener('canplay', onCanPlay)
          }
          video.addEventListener('canplay', onCanPlay)
        }
      } catch (error) {
        // If autoplay fails, try again after a short delay
        setTimeout(async () => {
          try {
            if (videoRef.current) {
              await videoRef.current.play()
            }
          } catch (e) {
            // Autoplay blocked, will retry on user interaction
            console.log('Video autoplay retry failed:', e)
          }
        }, 300)
      }
    }

    if (isInView || isHovered) {
      playVideo()
    } else {
      if (videoRef.current) {
        videoRef.current.pause()
      }
    }
  }, [isInView, isHovered, item.type])

  // Calculate responsive width based on height
  // Use width < height so frames read more vertical than horizontal
  const cardWidth = Math.round(cardHeight * 0.75)

  const FRAME_EDGE = 14
  const RECESS_MARGIN = { top: 12, right: 14, bottom: 12, left: 14 }
  const isLabelFrame = item.label && item.type === 'image'
  const cardContent = (
    <div
      ref={cardRef}
      className="relative flex-shrink-0 overflow-hidden"
      style={{
        width: `${cardWidth}px`,
        height: `${cardHeight}px`,
        boxSizing: 'border-box',
        border: `3px solid #052a2f`,
        backgroundColor: '#031a1d',
        backgroundImage: 'linear-gradient(135deg, #052a2f 0%, #041f23 50%, #052a2f 100%)',
        boxShadow: isLabelFrame
          ? 'inset 0 0 0 1px #0a3a40'
          : `
          inset 0 0 0 3px #0a3a40,
          inset 0 6px 12px #000000,
          inset 0 -6px 12px #000000,
          inset 8px 0 16px #000000,
          inset -8px 0 16px #000000
        `,
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
        position: 'relative',
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* 3D bevel edges: green (inside) → black (outside) on all sides, equal width */}
      <div className="absolute left-0 top-0 bottom-0 z-10" style={{ width: `${FRAME_EDGE}px`, background: 'linear-gradient(270deg, #062e33 0%, #052a2f 20%, #042329 40%, #041e22 60%, #03191c 80%, #021214 100%)', boxShadow: 'inset -4px 0 10px #000000, 4px 0 10px #000000' }} />
      <div className="absolute right-0 top-0 bottom-0 z-10" style={{ width: `${FRAME_EDGE}px`, background: 'linear-gradient(90deg, #062e33 0%, #052a2f 20%, #042329 40%, #041e22 60%, #03191c 80%, #021214 100%)', boxShadow: 'inset 4px 0 10px #000000, -4px 0 10px #000000' }} />
      <div className="absolute top-0 left-0 right-0 z-10" style={{ height: `${FRAME_EDGE}px`, background: 'linear-gradient(to top, #062e33 0%, #052a2f 20%, #042329 40%, #041e22 60%, #03191c 80%, #021214 100%)', boxShadow: 'inset 0 4px 10px #000000, 0 5px 12px #000000' }} />
      <div className="absolute bottom-0 left-0 right-0 z-10" style={{ height: `${FRAME_EDGE}px`, background: 'linear-gradient(to bottom, #062e33 0%, #052a2f 20%, #042329 40%, #041e22 60%, #03191c 80%, #021214 100%)', boxShadow: 'inset 0 -4px 10px #000000, 0 -5px 12px #000000' }} />

      {/* Recessed content panel - lighter for label frames (1 & 4) so background shows */}
      <div
        className="absolute"
        style={{
          top: RECESS_MARGIN.top,
          left: RECESS_MARGIN.left,
          right: RECESS_MARGIN.right,
          bottom: RECESS_MARGIN.bottom,
          zIndex: 0,
          overflow: 'hidden',
          opacity: 1,
          boxShadow: isLabelFrame ? 'none' : 'inset 0 0 0 3px #0a3a40, inset 0 6px 12px #000000, inset 0 -6px 12px #000000, inset 8px 0 16px #000000, inset -8px 0 16px #000000',
          background: isLabelFrame ? 'transparent' : '#031a1d',
          border: isLabelFrame ? 'none' : '1px solid #052a2f',
        }}
      >
        {item.type === 'topic' ? (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ width: '100%', height: '100%' }}
          >
            <span
              className="font-portrait text-gold text-2xl tracking-[0.15em] uppercase"
              style={{
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.5), 0 -1px 1px rgba(255, 255, 255, 0.1)',
                willChange: 'auto',
                textAlign: 'center',
              }}
            >
              {item.label}
            </span>
            {item.frameNumber && (
              <div
                className="absolute top-3 left-3 px-2 py-1"
                style={{
                  background: 'linear-gradient(135deg, #8b6914 0%, #6b4e0a 50%, #8b6914 100%)',
                  boxShadow: `
                    inset 0 1px 2px rgba(255, 255, 255, 0.2),
                    inset 0 -1px 2px rgba(0, 0, 0, 0.4),
                    0 2px 4px rgba(0, 0, 0, 0.3),
                    0 0 0 1px rgba(0, 0, 0, 0.2)
                  `,
                  border: '1px solid rgba(212, 197, 160, 0.3)',
                }}
              >
                <span className="font-refined text-gold-light text-xs font-semibold">
                  {item.frameNumber}
                </span>
              </div>
            )}
          </div>
        ) : item.type === 'image' ? (
          <div className="absolute inset-0 w-full h-full">
            <Image
              src={item.src || '/logo.png'}
              alt={item.alt || ''}
              fill
              className="object-cover"
              style={{
                opacity: 1,
                objectPosition: 'center center',
                objectFit: 'cover',
                ...(isLabelFrame && { filter: 'brightness(1.4) contrast(1.08)' }),
              }}
              sizes="280px"
            />
            {item.href && (
              <Link
                href={item.href}
                className="absolute inset-0 z-30"
                aria-label={item.label || 'View'}
              />
            )}
            {item.frameNumber && (
              <div
                className="absolute top-3 left-3 px-2 py-1 z-20"
                style={{
                  background: 'linear-gradient(135deg, #8b6914 0%, #6b4e0a 50%, #8b6914 100%)',
                  boxShadow: `
                    inset 0 1px 2px rgba(255, 255, 255, 0.2),
                    inset 0 -1px 2px rgba(0, 0, 0, 0.4),
                    0 2px 4px rgba(0, 0, 0, 0.3),
                    0 0 0 1px rgba(0, 0, 0, 0.2)
                  `,
                  border: '1px solid rgba(212, 197, 160, 0.3)',
                }}
              >
                <span className="font-refined text-gold-light text-xs font-semibold">
                  {item.frameNumber}
                </span>
              </div>
            )}
          </div>
        ) : (
          <div className="absolute inset-0 w-full h-full">
            <video
              ref={videoRef}
              src={item.src}
              poster={item.poster}
              muted
              loop
              playsInline
              autoPlay
              preload="auto"
              className="w-full h-full object-cover"
              style={{
                opacity: 1,
                objectPosition: 'center center',
                objectFit: 'cover',
              }}
              onLoadedMetadata={(e) => {
                const video = e.currentTarget
                const offset = item.videoStartOffset ?? 0
                if (offset > 0 && video.duration && !isNaN(video.duration)) {
                  video.currentTime = Math.min(offset, video.duration - 0.1)
                }
              }}
              onLoadedData={(e) => {
                const video = e.currentTarget
                const offset = item.videoStartOffset ?? 0
                if (offset > 0 && video.duration && !isNaN(video.duration)) {
                  video.currentTime = Math.min(offset, video.duration - 0.1)
                }
                if (isInView || isHovered) {
                  video.play().catch(() => {})
                }
              }}
            />
            {item.frameNumber && (
              <div
                className="absolute top-3 left-3 px-2 py-1"
                style={{
                  background: 'linear-gradient(135deg, #8b6914 0%, #6b4e0a 50%, #8b6914 100%)',
                  boxShadow: `
                    inset 0 1px 2px rgba(255, 255, 255, 0.2),
                    inset 0 -1px 2px rgba(0, 0, 0, 0.4),
                    0 2px 4px rgba(0, 0, 0, 0.3),
                    0 0 0 1px rgba(0, 0, 0, 0.2)
                  `,
                  border: '1px solid rgba(212, 197, 160, 0.3)',
                }}
              >
                <span className="font-refined text-gold-light text-xs font-semibold">
                  {item.frameNumber}
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Label in exact visual center - stable layer to prevent flicker during scroll */}
      {item.label && (
        <div
          className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
          style={{
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            contain: 'layout style paint',
          }}
        >
          <span
            className="font-portrait text-gold tracking-[0.15em] uppercase"
            style={{
              fontSize: 'clamp(0.75rem, 2vw, 1.125rem)',
              textShadow: '0 1px 2px rgba(0, 0, 0, 0.5), 0 -1px 1px rgba(255, 255, 255, 0.1)',
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden',
              WebkitFontSmoothing: 'antialiased',
            }}
          >
            {item.label}
          </span>
        </div>
      )}

    </div>
  )

  if (item.type === 'topic' && item.href) {
    return (
      <Link href={item.href} className="block">
        {cardContent}
      </Link>
    )
  }

  return cardContent
}


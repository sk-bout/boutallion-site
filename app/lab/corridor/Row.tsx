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

  const duration = effectiveTrackWidth > 0 ? Math.round((effectiveTrackWidth / 80) * 1000) : 60000
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
      className="overflow-hidden"
      style={{ 
        height: '100%',
        maxHeight: '100%',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <style>{`
        @keyframes ${animName} {
          0% { transform: translateX(${direction === 'right' ? 0 : -effectiveTrackWidth}px); }
          100% { transform: translateX(${direction === 'right' ? -effectiveTrackWidth : 0}px); }
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

  const cardContent = (
    <div
      ref={cardRef}
      className="relative overflow-hidden flex-shrink-0"
      style={{
        width: `${cardWidth}px`,
        height: `${cardHeight}px`,
        // Solid 3D frame - no transparency
        background: `
          linear-gradient(135deg, #052a2f 0%, #031a1d 25%, #041f23 50%, #031a1d 75%, #052a2f 100%),
          repeating-linear-gradient(45deg, #041f23 0px, #041f23 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px),
          radial-gradient(circle at 30% 40%, rgba(212, 197, 160, 0.06) 0%, #041f23 40%),
          radial-gradient(circle at 70% 60%, rgba(212, 197, 160, 0.04) 0%, #041f23 40%)
        `,
        backgroundColor: '#031a1d',
        // 3D frame - solid border + inset shadows for depth
        boxShadow: `
          inset 0 0 0 3px rgba(212, 197, 160, 0.25),
          inset 0 6px 12px rgba(0, 0, 0, 0.6),
          inset 0 -6px 12px rgba(0, 0, 0, 0.5),
          inset 8px 0 16px rgba(0, 0, 0, 0.4),
          inset -8px 0 16px rgba(0, 0, 0, 0.4),
          0 12px 32px rgba(0, 0, 0, 0.5),
          0 0 0 1px rgba(0, 0, 0, 0.4),
          0 0 40px rgba(0, 0, 0, 0.3)
        `,
        // 3D transform for depth
        transform: `translate3d(0, 0, 0) perspective(1000px) rotateX(0deg) ${isHovered ? 'scale(1.03) translateZ(10px)' : 'scale(1) translateZ(0px)'}`,
        // Prevent flickering with hardware acceleration
        willChange: 'transform, opacity',
        opacity: isHovered ? 1 : hoveredCardId && hoveredCardId !== item.id ? 0.75 : 1,
        transition: 'transform 0.3s ease-out, opacity 0.3s ease-out',
        position: 'relative',
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Fluted column effect on left side - solid 3D frame edge */}
      <div
        className="absolute left-0 top-0 bottom-0 z-10"
        style={{
          width: '16px',
          background: `
            repeating-linear-gradient(
              90deg,
              #041f23 0px,
              #041f23 8px,
              #021214 8px,
              #021214 12px
            )
          `,
          boxShadow: 'inset -4px 0 8px rgba(0, 0, 0, 0.6), 2px 0 6px rgba(0, 0, 0, 0.3)',
        }}
      />
      
      {/* Fluted column effect on right side - solid 3D frame edge */}
      <div
        className="absolute right-0 top-0 bottom-0 z-10"
        style={{
          width: '16px',
          background: `
            repeating-linear-gradient(
              90deg,
              #041f23 0px,
              #041f23 8px,
              #021214 8px,
              #021214 12px
            )
          `,
          boxShadow: 'inset 4px 0 8px rgba(0, 0, 0, 0.6), -2px 0 6px rgba(0, 0, 0, 0.3)',
        }}
      />
      
      {/* Top molding - solid 3D bevel */}
      <div
        className="absolute top-0 left-0 right-0 h-2 z-10"
        style={{
          background: 'linear-gradient(to bottom, #021214 0%, #041f23 40%, #052a2f 100%)',
          boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.6), 0 2px 4px rgba(0, 0, 0, 0.3)',
        }}
      />
      <div
        className="absolute top-2 left-0 right-0 h-0.5 z-10"
        style={{
          background: 'linear-gradient(to bottom, rgba(212, 197, 160, 0.25) 0%, rgba(212, 197, 160, 0.1) 100%)',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.08)',
        }}
      />
      
      {/* Bottom molding - solid 3D bevel */}
      <div
        className="absolute bottom-2 left-0 right-0 h-0.5 z-10"
        style={{
          background: 'linear-gradient(to top, rgba(212, 197, 160, 0.25) 0%, rgba(212, 197, 160, 0.1) 100%)',
          boxShadow: '0 -1px 3px rgba(0, 0, 0, 0.4), inset 0 -1px 1px rgba(255, 255, 255, 0.08)',
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-2 z-10"
        style={{
          background: 'linear-gradient(to top, #021214 0%, #041f23 40%, #052a2f 100%)',
          boxShadow: 'inset 0 -2px 4px rgba(0, 0, 0, 0.6), 0 -2px 4px rgba(0, 0, 0, 0.3)',
        }}
      />

      {/* Label in exact visual center of entire frame */}
      {item.label && (
        <div
          className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
          style={{ top: 0, left: 0, right: 0, bottom: 0 }}
        >
          <span
            className="font-portrait text-gold text-2xl md:text-3xl tracking-[0.15em] uppercase"
            style={{
              textShadow: '0 1px 2px rgba(0, 0, 0, 0.5), 0 -1px 1px rgba(255, 255, 255, 0.1)',
            }}
          >
            {item.label}
          </span>
        </div>
      )}
      
      {/* Content container - solid recessed panel, no transparency */}
      <div
        className="relative w-full h-full"
        style={{
          margin: '10px 16px 6px 16px',
          boxShadow: `
            inset 0 0 0 3px rgba(212, 197, 160, 0.2),
            inset 0 6px 12px rgba(0, 0, 0, 0.55),
            inset 0 -6px 12px rgba(0, 0, 0, 0.45),
            inset 8px 0 16px rgba(0, 0, 0, 0.4),
            inset -8px 0 16px rgba(0, 0, 0, 0.4),
            0 12px 32px rgba(0, 0, 0, 0.45),
            0 0 0 1px rgba(0, 0, 0, 0.35)
          `,
          paddingLeft: '0',
          paddingRight: '0',
          background: '#031a1d',
          border: '1px solid rgba(212, 197, 160, 0.15)',
        }}
      >
        {item.type === 'topic' ? (
          <div 
            className="relative w-full h-full"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
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
            {/* Frame number overlay - bronze plaque style */}
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
          <div 
            className="relative w-full h-full"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          >
            <Image
              src={item.src || '/logo.png'}
              alt={item.alt || ''}
              fill
              className="object-cover"
              style={{
                opacity: isHovered ? 1 : 0.9,
                transition: 'opacity 0.3s ease-out',
                willChange: 'opacity',
                objectPosition: 'center center',
              }}
              sizes="280px"
            />
            {/* Clickable overlay for frames with href - label is rendered at card level for exact center */}
            {item.href && (
              <Link
                href={item.href}
                className="absolute inset-0 z-30"
                aria-label={item.label || 'View'}
              />
            )}
            {/* Frame number overlay */}
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
          <div 
            className="relative w-full h-full"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0, // Equal left and right - symmetrical
              bottom: 0,
            }}
          >
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
                opacity: isHovered ? 1 : 0.85,
                transition: 'opacity 0.3s ease-out',
                willChange: 'opacity',
                objectPosition: 'left center',
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
            {/* Frame number overlay - bronze plaque style */}
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


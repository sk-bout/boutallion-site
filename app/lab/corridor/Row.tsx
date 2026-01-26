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
  const animationFrameRef = useRef<number>()
  const positionRef = useRef(0)
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null)
  const [isPaused, setIsPaused] = useState(false)
  const prefersReducedMotion = useRef(false)
  
  // Expose hoveredCardId to Card components
  const cardHoveredCardId = hoveredCardId

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    prefersReducedMotion.current = mediaQuery.matches

    const handleChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion.current = e.matches
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // Multiple duplicates for seamless infinite loop (no gaps) - enough to cover viewport
  const duplicatedItems = [...items, ...items, ...items, ...items, ...items]

  useEffect(() => {
    if (prefersReducedMotion.current) {
      return
    }

    const container = containerRef.current
    const track = trackRef.current
    if (!container || !track) return

    // Calculate dynamic item width: card width (cardHeight * 0.8) + gap
    const cardWidth = Math.round(cardHeight * 0.8)
    const gap = window.innerWidth < 768 ? 16 : window.innerWidth < 1024 ? 24 : 32
    const itemWidth = cardWidth + gap
    const totalWidth = items.length * itemWidth // Width of one set of items
    
    // Initialize position for seamless loop - start from left edge
    // For right direction (left-to-right scroll): start at 0 so content appears from left
    // For left direction (right-to-left scroll): start at 0 so content appears from left
    if (positionRef.current === 0) {
      positionRef.current = 0 // Always start from left edge
    }

    const animate = () => {
      if (prefersReducedMotion.current) {
        return
      }

      // Pause if hovering over an image card
      if (isPaused) {
        animationFrameRef.current = requestAnimationFrame(animate)
        return
      }

      const currentSpeed = isHovered ? speed * 0.35 : speed
      const delta = direction === 'right' ? currentSpeed : -currentSpeed

      positionRef.current += delta

      // Reset position seamlessly when we've moved one full set
      // This creates the infinite loop effect without gaps
      // We reset before the gap appears to ensure continuous visibility
      if (direction === 'right') {
        // Moving right: reset when we've moved one set width (before gap appears)
        // Start at 0, when we reach totalWidth, reset back to 0
        if (positionRef.current >= totalWidth) {
          positionRef.current -= totalWidth
        }
        // Also handle if we somehow go too far negative
        if (positionRef.current < -totalWidth) {
          positionRef.current += totalWidth
        }
      } else {
        // Moving left: reset when we've moved one set width
        // Start at 0, when we reach -totalWidth, reset back to 0
        if (positionRef.current <= -totalWidth) {
          positionRef.current += totalWidth
        }
        // Also handle if we somehow go too far positive
        if (positionRef.current > totalWidth) {
          positionRef.current -= totalWidth
        }
      }

      if (track) {
        track.style.transform = `translateX(${positionRef.current}px)`
      }

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [items.length, direction, speed, isHovered, cardHeight, isPaused])

  // Handle reduced motion - make it horizontally scrollable
  if (prefersReducedMotion.current) {
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
        willChange: 'transform',
        height: '100%',
        maxHeight: '100%',
        display: 'flex',
        alignItems: 'center',
        // Hardware acceleration to prevent flickering
        transform: 'translate3d(0, 0, 0)',
        backfaceVisibility: 'hidden',
      }}
    >
      <div
        ref={trackRef}
        className="flex gap-4 sm:gap-6 md:gap-8 items-center"
        style={{
          width: 'max-content',
          willChange: 'transform',
          height: '100%',
          paddingLeft: '0', // Start from left edge - no empty space
          paddingRight: '100vw', // Ensure items can scroll to the right
          // Hardware acceleration to prevent flickering
          transform: 'translate3d(0, 0, 0)',
          backfaceVisibility: 'hidden',
          perspective: '1000px',
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

  // Calculate responsive width based on height (wider aspect ratio for even bigger frames)
  const cardWidth = Math.round(cardHeight * 0.85)

  const cardContent = (
    <div
      ref={cardRef}
      className="relative overflow-hidden flex-shrink-0"
      style={{
        width: `${cardWidth}px`,
        height: `${cardHeight}px`,
        // 3D Green background with depth
        background: `
          linear-gradient(135deg, #052a2f 0%, #031a1d 25%, #041f23 50%, #031a1d 75%, #052a2f 100%),
          repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(0,0,0,0.05) 2px, rgba(0,0,0,0.05) 4px),
          radial-gradient(circle at 30% 40%, rgba(212, 197, 160, 0.08) 0%, transparent 40%),
          radial-gradient(circle at 70% 60%, rgba(212, 197, 160, 0.05) 0%, transparent 40%)
        `,
        // 3D recessed panel effect with strong depth - perfectly symmetrical
        boxShadow: `
          inset 0 0 0 3px rgba(212, 197, 160, 0.2),
          inset 0 4px 8px rgba(0, 0, 0, 0.5),
          inset 0 -4px 8px rgba(0, 0, 0, 0.4),
          inset 6px 0 12px rgba(0, 0, 0, 0.3),
          inset -6px 0 12px rgba(0, 0, 0, 0.3),
          0 6px 16px rgba(0, 0, 0, 0.4),
          0 0 0 1px rgba(0, 0, 0, 0.3),
          0 0 20px rgba(0, 0, 0, 0.2)
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
      {/* Fluted column effect on left side - 3D green */}
      <div
        className="absolute left-0 top-0 bottom-0 z-10"
        style={{
          width: '16px', // Equal width for both sides (w-4 in Tailwind = 16px)
          background: `
            repeating-linear-gradient(
              90deg,
              #041f23 0px,
              #041f23 8px,
              rgba(0, 0, 0, 0.3) 8px,
              rgba(0, 0, 0, 0.3) 12px
            )
          `,
          boxShadow: 'inset -3px 0 6px rgba(0, 0, 0, 0.4), 2px 0 4px rgba(0, 0, 0, 0.2)',
        }}
      />
      
      {/* Fluted column effect on right side - 3D green (perfectly mirrored) */}
      <div
        className="absolute right-0 top-0 bottom-0 z-10"
        style={{
          width: '16px', // Equal width for both sides - perfectly symmetrical
          background: `
            repeating-linear-gradient(
              90deg,
              #041f23 0px,
              #041f23 8px,
              rgba(0, 0, 0, 0.3) 8px,
              rgba(0, 0, 0, 0.3) 12px
            )
          `,
          boxShadow: 'inset 3px 0 6px rgba(0, 0, 0, 0.4), -2px 0 4px rgba(0, 0, 0, 0.2)',
        }}
      />
      
      {/* Horizontal molding bands at top - symmetrical with bottom */}
      <div
        className="absolute top-0 left-0 right-0 h-1.5 z-10"
        style={{
          background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.1), transparent)',
          boxShadow: 'inset 0 2px 3px rgba(0, 0, 0, 0.4)',
        }}
      />
      <div
        className="absolute top-1.5 left-0 right-0 h-0.5 z-10"
        style={{
          background: 'rgba(212, 197, 160, 0.15)',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.1)',
        }}
      />
      
      {/* Horizontal molding bands at bottom - symmetrical with top */}
      <div
        className="absolute bottom-1.5 left-0 right-0 h-0.5 z-10"
        style={{
          background: 'rgba(212, 197, 160, 0.15)',
          boxShadow: '0 -1px 3px rgba(0, 0, 0, 0.3), inset 0 -1px 1px rgba(255, 255, 255, 0.1)',
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-1.5 z-10"
        style={{
          background: 'linear-gradient(to top, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.1), transparent)',
          boxShadow: 'inset 0 -2px 3px rgba(0, 0, 0, 0.4)',
        }}
      />
      
      {/* Content container with recessed panel effect - 3D green */}
      <div
        className="relative w-full h-full"
        style={{
          margin: '10px 16px 10px 16px', // Equal left and right margins
          boxShadow: `
            inset 0 3px 8px rgba(0, 0, 0, 0.5),
            inset 0 -3px 8px rgba(0, 0, 0, 0.4),
            inset 4px 0 8px rgba(0, 0, 0, 0.3),
            inset -4px 0 8px rgba(0, 0, 0, 0.3)
          `,
          // Ensure equal left and right padding
          paddingLeft: '0',
          paddingRight: '0',
          background: 'rgba(0, 0, 0, 0.2)',
          border: '1px solid rgba(212, 197, 160, 0.1)',
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
              right: 0, // Equal left and right - symmetrical
              bottom: 0,
            }}
          >
            <Image
              src={item.src || '/logo.png'}
              alt={item.alt || ''}
              fill
              className="object-cover"
              style={{
                opacity: isHovered ? 1 : 0.85,
                transition: 'opacity 0.3s ease-out',
                willChange: 'opacity',
                objectPosition: 'left center', // Anchor to left, center vertically
              }}
              sizes="280px"
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
                objectPosition: 'left center', // Anchor to left, center vertically
              }}
              onLoadedData={(e) => {
                // Try to play when video data is loaded
                const video = e.currentTarget
                if (isInView || isHovered) {
                  video.play().catch(() => {
                    // Ignore autoplay errors
                  })
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


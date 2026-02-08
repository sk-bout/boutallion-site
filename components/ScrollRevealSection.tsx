'use client'

import { useEffect, useRef, useState } from 'react'

const BOUTALLION_GREEN = '#031a1d'
const ACCENT = '#ded0a8'

function getScrollParent(el: HTMLElement): HTMLElement | Window {
  let parent: HTMLElement | null = el.parentElement
  while (parent && parent !== document.body) {
    const { overflowY } = getComputedStyle(parent)
    if (overflowY === 'auto' || overflowY === 'scroll' || overflowY === 'overlay') {
      return parent
    }
    parent = parent.parentElement
  }
  return window
}

export function useScrollReveal(opts?: { triggerPoint?: number; endPoint?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  const [mounted, setMounted] = useState(false)
  const rafRef = useRef<number>()
  const trigger = opts?.triggerPoint ?? 0.7
  const end = opts?.endPoint ?? 0.2

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (!mounted) return
    const el = ref.current
    if (!el) return
    const scrollParent = getScrollParent(el)
    const getViewportHeight = () =>
      scrollParent instanceof Window ? window.innerHeight : (scrollParent as HTMLElement).clientHeight
    const updateProgress = () => {
      const rect = el.getBoundingClientRect()
      const vh = getViewportHeight()
      const triggerPoint = vh * trigger
      const endPoint = vh * end
      const raw = (triggerPoint - rect.top) / (triggerPoint - endPoint)
      const eased = raw <= 0 ? 0 : raw >= 1 ? 1 : 1 - Math.pow(1 - raw, 1.5)
      setProgress(eased)
    }
    const handleScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(updateProgress)
    }
    updateProgress()
    scrollParent.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)
    return () => {
      scrollParent.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [mounted, trigger, end])

  return { ref, progress }
}

export function useParallax(speed = 0.3) {
  const ref = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (!mounted) return
    const el = ref.current
    if (!el) return
    const scrollParent = getScrollParent(el)
    const getScrollY = () =>
      scrollParent instanceof Window ? window.scrollY : (scrollParent as HTMLElement).scrollTop
    const update = () => setOffset(getScrollY() * speed)
    update()
    scrollParent.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      scrollParent.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [mounted, speed])

  return { ref, offset }
}

interface KineticLineProps {
  text: string
  progress: number
  baseDelay?: number
  className?: string
}

export function KineticLine({ text, progress, baseDelay = 0, className = '' }: KineticLineProps) {
  const words = text.split(' ')
  return (
    <span className={className}>
      {words.map((word, i) => {
        const wordProgress = Math.max(0, Math.min(1, (progress - baseDelay - i * 0.03) / 0.15))
        const opacity = wordProgress
        const translateY = (1 - wordProgress) * 12
        return (
          <span
            key={i}
            className="inline-block transition-none"
            style={{
              opacity,
              transform: `translateY(${translateY}px)`,
              transition: 'none',
            }}
          >
            {word}{' '}
          </span>
        )
      })}
    </span>
  )
}

export { BOUTALLION_GREEN, ACCENT }

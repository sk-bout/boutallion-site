'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  opacity: number
  size: number
  vx: number
  vy: number
  life: number
}

export default function GoldDustCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const animationFrameRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
      
      // Only create particles when over input fields or textareas
      const target = e.target as HTMLElement
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.closest('input, textarea'))) {
        // Create new particles at cursor position
        for (let i = 0; i < 2; i++) {
          particlesRef.current.push({
            x: e.clientX + (Math.random() - 0.5) * 10,
            y: e.clientY + (Math.random() - 0.5) * 10,
            opacity: 0.6 + Math.random() * 0.4,
            size: 1.5 + Math.random() * 2,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            life: 1.0,
          })
        }
      }
    }

    window.addEventListener('mousemove', handleMouseMove)

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter((particle) => {
        // Update position
        particle.x += particle.vx
        particle.y += particle.vy
        
        // Apply gravity and fade
        particle.vy += 0.02
        particle.life -= 0.015
        particle.opacity = particle.life

        // Draw particle
        if (particle.life > 0 && particle.opacity > 0) {
          ctx.save()
          ctx.globalAlpha = particle.opacity * 0.4 // Subtle opacity
          ctx.fillStyle = '#d4c5a0' // Gold color matching brand
          
          // Create a soft glow effect
          const gradient = ctx.createRadialGradient(
            particle.x,
            particle.y,
            0,
            particle.x,
            particle.y,
            particle.size * 2
          )
          gradient.addColorStop(0, 'rgba(212, 197, 160, 0.8)')
          gradient.addColorStop(0.5, 'rgba(212, 197, 160, 0.4)')
          gradient.addColorStop(1, 'rgba(212, 197, 160, 0)')
          
          ctx.fillStyle = gradient
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
          ctx.fill()
          
          ctx.restore()
        }

        return particle.life > 0
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999]"
      style={{ mixBlendMode: 'screen' }}
    />
  )
}


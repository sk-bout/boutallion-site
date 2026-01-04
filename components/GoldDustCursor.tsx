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

    // Track mouse position and create particles
    let lastParticleTime = 0
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
      
      const now = Date.now()
      // Create particles less frequently for more elegant trail (every 30ms)
      if (now - lastParticleTime > 30) {
        lastParticleTime = now
        
        // Create particles at cursor position - subtle elegant trail
        const target = e.target as HTMLElement
        const isOverInput = target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.closest('input, textarea'))
        
        // Fewer particles for more elegance
        const particleCount = isOverInput ? 2 : 1
        
        for (let i = 0; i < particleCount; i++) {
          particlesRef.current.push({
            x: e.clientX + (Math.random() - 0.5) * 6,
            y: e.clientY + (Math.random() - 0.5) * 6,
            opacity: isOverInput ? 0.5 + Math.random() * 0.2 : 0.4 + Math.random() * 0.2,
            size: isOverInput ? 1.5 + Math.random() * 1.5 : 1 + Math.random() * 1.5,
            vx: (Math.random() - 0.5) * 0.6,
            vy: (Math.random() - 0.5) * 0.6,
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
        
        // Apply very gentle gravity and slower fade for elegance
        particle.vy += 0.005
        particle.life -= 0.008
        particle.opacity = particle.life * 0.7 // More subtle overall

        // Draw particle
        if (particle.life > 0 && particle.opacity > 0) {
          ctx.save()
          
          // Create a softer, more elegant glow effect
          const gradient = ctx.createRadialGradient(
            particle.x,
            particle.y,
            0,
            particle.x,
            particle.y,
            particle.size * 3
          )
          gradient.addColorStop(0, `rgba(212, 197, 160, ${particle.opacity * 0.6})`)
          gradient.addColorStop(0.3, `rgba(212, 197, 160, ${particle.opacity * 0.4})`)
          gradient.addColorStop(0.6, `rgba(212, 197, 160, ${particle.opacity * 0.2})`)
          gradient.addColorStop(1, 'rgba(212, 197, 160, 0)')
          
          ctx.fillStyle = gradient
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size * 2.5, 0, Math.PI * 2)
          ctx.fill()
          
          // Subtle center dot
          ctx.globalAlpha = particle.opacity * 0.5
          ctx.fillStyle = `rgba(212, 197, 160, ${particle.opacity * 0.6})`
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size * 0.6, 0, Math.PI * 2)
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


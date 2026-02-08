'use client'

import { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import LuxuryWebGLEffects from './LuxuryWebGLEffects'

/**
 * Client-only WebGL effects wrapper.
 * Defers render until after mount to avoid React Strict Mode double-mount
 * tearing down the WebGL context in development (localhost).
 */
export default function MainPageWebGLEffects() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Defer Canvas mount to avoid React Strict Mode double-mount destroying WebGL context.
    // In dev, React mounts -> unmounts -> remounts. rAF ensures we render after the cycle.
    const id = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(id)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 z-0 pointer-events-none" style={{ width: '100%', height: '100%' }}>
      <Canvas
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          preserveDrawingBuffer: false,
        }}
        dpr={[1, 2]}
        frameloop="always"
        style={{ width: '100%', height: '100%' }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={60} />
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#d4c5a0" />
        <pointLight position={[-10, -10, -10]} intensity={1.0} color="#d4c5a0" />
        <directionalLight position={[5, 8, 5]} intensity={1.2} color="#d4c5a0" />
        <spotLight position={[0, 10, 0]} angle={0.3} penumbra={0.5} intensity={1.5} color="#d4c5a0" />
        <LuxuryWebGLEffects />
      </Canvas>
    </div>
  )
}

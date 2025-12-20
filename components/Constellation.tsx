'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import ConstellationScene from './ConstellationScene'
import Logotype from './Logotype'

interface ConstellationProps {
  router: ReturnType<typeof useRouter>
}

const SECTIONS = [
  { id: 'story', label: 'The Story', position: [2, 1, 0] },
  { id: 'collections', label: 'Collections', position: [-1.5, 1.5, 0] },
  { id: 'materials', label: 'Materials', position: [0, -1.5, 1] },
  { id: 'craftsmanship', label: 'Craftsmanship', position: [-2, -1, 0.5] },
  { id: 'request-order', label: 'Request Order', position: [1.5, -1, -0.5] },
  { id: 'media', label: 'Media', position: [0, 2, -1] },
  { id: 'contact', label: 'Contact', position: [-1, 0, 1.5] },
]

export default function Constellation({ router }: ConstellationProps) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleNodeClick = (sectionId: string) => {
    if (isTransitioning) return
    
    setIsTransitioning(true)
    
    // Use View Transitions API if available
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        router.push(`/corridor/${sectionId}`)
      })
    } else {
      setTimeout(() => {
        router.push(`/corridor/${sectionId}`)
      }, 1200)
    }
  }

  return (
    <div ref={containerRef} className="fixed inset-0 bg-twilight">
      {/* Grain texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Logotype */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
        <Logotype />
      </div>

      {/* Constellation Canvas */}
      <Canvas
        className="absolute inset-0"
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: 'high-performance',
          preserveDrawingBuffer: false,
        }}
        dpr={[1, 2]}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <pointLight position={[-10, -10, -10]} intensity={0.3} />
        
        <ConstellationScene
          sections={SECTIONS}
          hoveredNode={hoveredNode}
          onNodeHover={setHoveredNode}
          onNodeClick={handleNodeClick}
          isTransitioning={isTransitioning}
        />
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>

      {/* Node Labels */}
      {hoveredNode && !isTransitioning && (
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          <div className="text-refined text-sm tracking-wider opacity-80 animate-fade-in">
            {SECTIONS.find(s => s.id === hoveredNode)?.label}
          </div>
        </div>
      )}
    </div>
  )
}


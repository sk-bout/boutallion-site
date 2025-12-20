'use client'

import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera, OrbitControls } from '@react-three/drei'
import WebGLEffectsDemo from '@/components/WebGLEffectsDemo'

const EFFECTS = [
  { id: 'silk', name: 'Silk/Chiffon Simulation', description: 'Real-time fabric physics with subtle movement' },
  { id: 'textile', name: 'Luxury Textile Shaders', description: 'Animated silk, velvet, satin textures' },
  { id: 'fabric-panels', name: 'Floating Fabric Panels', description: 'Soft billowing fabric responding to cursor' },
  { id: 'thread', name: 'Thread/Weave Patterns', description: 'Animated textile weaves' },
  { id: 'caustic', name: 'Caustic Light Patterns', description: 'Refracted light through crystal/glass' },
  { id: 'volumetric', name: 'Volumetric Lighting', description: 'Soft atmospheric light rays' },
  { id: 'holographic', name: 'Holographic Shimmer', description: 'Subtle iridescent color shifts' },
  { id: 'reflections', name: 'Luxury Material Reflections', description: 'Realistic reflections on gold/crystal' },
  { id: 'particles', name: 'Elegant Particle System', description: 'Floating gold dust, fabric fibers' },
  { id: 'organic', name: 'Organic Morphing Shapes', description: 'Smooth abstract forms transitioning' },
  { id: 'smoke', name: 'Smoke/Steam Effects', description: 'Subtle wisps for atmosphere' },
  { id: 'crystal', name: 'Crystal Formations', description: 'Growing crystals with light refraction' },
  { id: 'logo-reveal', name: '3D Logo Reveal', description: 'Logo emerging from fabric/particles' },
  { id: 'parallax', name: 'Parallax Depth Layers', description: 'Multiple depth layers creating space' },
  { id: 'fabric-drape', name: 'Interactive Fabric Drape', description: 'Fabric responding to cursor position' },
  { id: 'portal', name: 'Portal/Transition Effects', description: 'Elegant transitions between sections' },
  { id: 'distortion', name: 'Subtle Distortion Fields', description: 'Gentle warping of space' },
  { id: 'dof', name: 'Depth of Field Blur', description: 'Cinematic focus effects' },
  { id: 'chromatic', name: 'Chromatic Aberration', description: 'Subtle color separation' },
  { id: 'mesh', name: 'Mesh Deformation', description: 'Smooth organic surface deformations' },
]

export default function WebGLDemoPage() {
  const [selectedEffect, setSelectedEffect] = useState<string | null>(null)

  return (
    <div className="min-h-screen relative" style={{ backgroundColor: '#052025' }}>
      {/* Control Panel */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gold-DEFAULT/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h2 className="font-portrait text-2xl text-gold-DEFAULT mb-4 tracking-wider">
            WebGL Effects Gallery
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 max-h-[60vh] overflow-y-auto">
            {EFFECTS.map((effect) => (
              <button
                key={effect.id}
                onClick={() => setSelectedEffect(effect.id)}
                className={`p-4 text-left border transition-all duration-300 ${
                  selectedEffect === effect.id
                    ? 'border-gold-DEFAULT bg-gold-DEFAULT/10'
                    : 'border-white/10 bg-white/5 hover:border-gold-DEFAULT/50 hover:bg-white/10'
                }`}
              >
                <div className="font-refined text-sm text-gold-DEFAULT mb-1">
                  {effect.name}
                </div>
                <div className="text-xs text-white/60 font-sans">
                  {effect.description}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="pt-[40vh] pb-20">
        <div className="h-screen w-full">
          <Canvas
            gl={{ 
              antialias: true, 
              alpha: true,
              powerPreference: 'high-performance',
            }}
            dpr={[1, 2]}
          >
            <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={0.6} />
            <pointLight position={[-10, -10, -10]} intensity={0.4} />
            
            <WebGLEffectsDemo effectType={selectedEffect || 'silk'} />
            
            <OrbitControls
              enableZoom={true}
              enablePan={false}
              autoRotate={false}
            />
          </Canvas>
        </div>
      </div>

      {/* Logo Overlay */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40 text-center">
        <h1 className="font-portrait text-4xl md:text-5xl tracking-[0.2em] text-gold-DEFAULT mb-2">
          BOUTALLION
        </h1>
        <p className="font-refined text-sm text-gold-DEFAULT/80">
          {selectedEffect ? EFFECTS.find(e => e.id === selectedEffect)?.name : 'Select an effect above'}
        </p>
      </div>
    </div>
  )
}


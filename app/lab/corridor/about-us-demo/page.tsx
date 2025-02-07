'use client'

import { useState } from 'react'
import V1Editorial from '@/components/about-us-variants/V1Editorial'
import V2Immersive from '@/components/about-us-variants/V2Immersive'
import V3WebGL from '@/components/about-us-variants/V3WebGL'
import V4Horizontal from '@/components/about-us-variants/V4Horizontal'
import V5MicroInteractions from '@/components/about-us-variants/V5MicroInteractions'
import V6KineticTypography from '@/components/about-us-variants/V6KineticTypography'
import V7SplitScreen from '@/components/about-us-variants/V7SplitScreen'
import V8DarkLuxury from '@/components/about-us-variants/V8DarkLuxury'
import V9ScrollVideo from '@/components/about-us-variants/V9ScrollVideo'
import V10PrivateSalon from '@/components/about-us-variants/V10PrivateSalon'

const VARIANTS = [
  { id: '1', name: 'Editorial / Magazine', component: V1Editorial },
  { id: '2', name: 'Immersive Full-Screen', component: V2Immersive },
  { id: '3', name: 'WebGL / Three.js', component: V3WebGL },
  { id: '4', name: 'Horizontal Scroll Gallery', component: V4Horizontal },
  { id: '5', name: 'Micro-Interactions & Cursor', component: V5MicroInteractions },
  { id: '6', name: 'Kinetic Typography', component: V6KineticTypography },
  { id: '7', name: 'Split-Screen / Dual-View', component: V7SplitScreen },
  { id: '8', name: 'Dark Mode Luxury', component: V8DarkLuxury },
  { id: '9', name: 'Scroll-Triggered Video', component: V9ScrollVideo },
  { id: '10', name: 'Private Salon Vibe', component: V10PrivateSalon },
]

export default function AboutUsDemoPage() {
  const [active, setActive] = useState('10')
  const ActiveComponent = VARIANTS.find((v) => v.id === active)?.component ?? V1Editorial

  return (
    <div className="fixed inset-0 overflow-hidden bg-[#031a1d] z-[300]">
      {/* Active variant - key forces full remount when selection changes */}
      <div className="relative z-0 pt-32" key={active}>
        <ActiveComponent />
      </div>

      {/* Layout switcher - fixed at bottom, uses native select for reliable clicks */}
      <div
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[400] flex flex-col items-center gap-3 px-6 py-4 rounded-lg pointer-events-auto"
        style={{
          background: 'rgba(3, 26, 29, 0.98)',
          border: '1px solid rgba(212, 197, 160, 0.3)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
        }}
      >
        <span className="font-refined text-[10px] tracking-[0.2em] text-gold-DEFAULT/80 uppercase">
          Layout variant
        </span>
        <select
          value={active}
          onChange={(e) => setActive(e.target.value)}
          className="font-refined text-sm bg-boutallion-green text-gold-DEFAULT border border-gold-DEFAULT/40 px-4 py-2 rounded cursor-pointer focus:outline-none focus:border-gold-DEFAULT/60"
          aria-label="Select layout variant"
        >
          {VARIANTS.map((v) => (
            <option key={v.id} value={v.id}>
              {v.id}. {v.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

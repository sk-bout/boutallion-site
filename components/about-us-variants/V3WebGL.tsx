'use client'

import Link from 'next/link'
import CorridorStyleFrame from '@/components/CorridorStyleFrame'
import { ABOUT_US_CONTENT } from '@/lib/about-us-content'

export default function V3WebGL() {
  return (
    <div
      className="fixed inset-0 overflow-auto"
      style={{ backgroundColor: '#031a1d', color: '#ffffff' }}
    >
      <div className="min-h-screen flex flex-col items-center justify-center px-8 py-24">
        <h1
          className="font-portrait text-5xl md:text-7xl text-center mb-8"
          style={{ color: 'rgba(255,255,255,0.98)' }}
        >
          {ABOUT_US_CONTENT.title}
        </h1>
        <p
          className="font-refined text-lg text-center max-w-xl mb-16"
          style={{ color: 'rgba(255,255,255,0.85)' }}
        >
          {ABOUT_US_CONTENT.hero[0]}
        </p>

        {/* 3D placeholder - corridor style frame */}
        <div className="w-full max-w-2xl mx-auto mb-12">
          <CorridorStyleFrame
            aspectRatio="2/1"
            placeholderText="WebGL / Three.js — 3D jewel"
            className="w-full"
            style={{ height: 320 }}
          />
        </div>

        <p
          className="font-refined text-base md:text-lg text-center max-w-2xl leading-[1.8]"
          style={{ color: 'rgba(255,255,255,0.75)' }}
        >
          {ABOUT_US_CONTENT.hero[1]}
        </p>
        <Link
          href="/lab/corridor/request-order"
          className="font-refined text-sm tracking-[0.2em] uppercase px-12 py-4 mt-16 inline-block"
          style={{ color: '#031a1d', backgroundColor: '#d4c5a0' }}
        >
          Request Access
        </Link>
      </div>
    </div>
  )
}

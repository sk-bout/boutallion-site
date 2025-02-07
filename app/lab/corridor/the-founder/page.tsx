'use client'

import BaroqueBackground from '@/components/BaroqueBackground'
import Footer from '@/components/Footer'
import SocialIcons from '@/components/SocialIcons'
import Link from 'next/link'

export default function TheFounderPage() {
  return (
    <div className="fixed inset-0 overflow-auto">
      <BaroqueBackground />
      <SocialIcons />

      <main className="relative z-10 min-h-screen pt-24 md:pt-28 pb-24 md:pb-32 px-6 md:px-12 lg:px-20">
        <div className="max-w-4xl mx-auto">
          <div
            className="rounded-sm p-8 md:p-12"
            style={{
              background: 'rgba(3, 26, 29, 0.5)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(212, 197, 160, 0.15)',
              boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.03), 0 8px 32px rgba(0, 0, 0, 0.2)',
            }}
          >
            <h1 className="font-portrait text-4xl md:text-6xl text-white/95 tracking-tight mb-6">
              The Founder
            </h1>
            <div className="w-24 h-px bg-gold-DEFAULT/40 mb-8" />
            <p className="font-refined text-lg text-white/80 leading-relaxed">
              The vision behind Boutallion—a portrait of the creative force and philosophy that
              brought this maison to life. This page will introduce the founder and their journey.
            </p>
            <Link
              href="/lab/corridor/request-order"
              className="inline-flex mt-10 px-10 py-4 font-refined text-sm tracking-widest uppercase text-boutallion-green bg-gold-DEFAULT hover:bg-gold-light transition-colors duration-300"
            >
              Request Access
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

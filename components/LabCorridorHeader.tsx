'use client'

import Image from 'next/image'
import Link from 'next/link'
import CorridorNavigation from '@/components/CorridorNavigation'
import PermanentLanguageSwitcher from '@/components/PermanentLanguageSwitcher'

export default function LabCorridorHeader() {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-[200] flex items-center justify-between px-4 sm:px-6 md:px-8 h-16 sm:h-20 relative overflow-visible"
      style={{
        paddingTop: `max(0.5rem, env(safe-area-inset-top))`,
        paddingLeft: `max(1rem, env(safe-area-inset-left) + 0.5rem)`,
        paddingRight: `max(1rem, env(safe-area-inset-right) + 0.5rem)`,
        minHeight: '4rem',
      }}
    >
      {/* Left: Dropdown menu */}
      <div className="flex-shrink-0 pointer-events-auto overflow-visible">
        <CorridorNavigation inline />
      </div>

      {/* Center: Logo */}
      <Link
        href="/"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-auto"
        style={{ marginTop: 'max(0.25rem, env(safe-area-inset-top) / 2)' }}
        aria-label="Boutallion - Return home"
      >
        <div className="relative w-[120px] h-[60px] sm:w-[160px] sm:h-[80px] md:w-[200px] md:h-[100px]">
          <Image
            src="/BOUTALLION LOGO ARTWORK_RGB-23.png"
            alt="Boutallion"
            fill
            priority
            sizes="(min-width: 768px) 200px, (min-width: 640px) 160px, 120px"
            className="object-contain"
          />
        </div>
      </Link>

      {/* Right: Language switcher - same width as left for balance */}
      <div className="flex-shrink-0 w-[52px] sm:w-[56px] flex justify-end pointer-events-auto">
        <PermanentLanguageSwitcher inline />
      </div>
    </header>
  )
}

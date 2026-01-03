'use client'

import Image from 'next/image'

export default function Logotype() {
  return (
    <div className="text-center space-y-3 md:space-y-4 px-4 flex flex-col items-center">
      <div className="relative w-full max-w-[280px] sm:max-w-[360px] md:max-w-[480px] lg:max-w-[640px] aspect-square">
        <Image
          src="/BOUTALLION LOGO ARTWORK_RGB-23.png"
          alt="Boutallion"
          fill
          className="object-contain"
          priority
          sizes="(max-width: 640px) 280px, (max-width: 768px) 360px, (max-width: 1024px) 480px, 640px"
          style={{
            filter: 'brightness(0.95)',
          }}
        />
      </div>
      <p className="font-refined text-[10px] sm:text-xs md:text-sm tracking-[0.2em] text-white/60 uppercase">
        Born in Italy, 2016
      </p>
    </div>
  )
}


'use client'

export default function BaroqueBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
      {/* Ornate corner decorations */}
      <div className="absolute top-0 left-0 w-64 h-64 opacity-[0.08]">
        <svg viewBox="0 0 200 200" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Baroque corner scrollwork */}
          <path
            d="M0,0 Q50,20 100,0 T200,0 M0,0 Q20,50 0,100 T0,200"
            stroke="#d4c5a0"
            strokeWidth="1"
            fill="none"
            opacity="0.3"
          />
          {/* Floral corner motif */}
          <circle cx="30" cy="30" r="8" fill="#d4c5a0" opacity="0.15" />
          <path
            d="M30,22 Q35,25 40,22 Q35,30 30,30 Q25,30 20,22 Q25,25 30,22"
            fill="#d4c5a0"
            opacity="0.2"
          />
        </svg>
      </div>

      <div className="absolute top-0 right-0 w-64 h-64 opacity-[0.08]">
        <svg viewBox="0 0 200 200" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M200,0 Q150,20 100,0 T0,0 M200,0 Q180,50 200,100 T200,200"
            stroke="#d4c5a0"
            strokeWidth="1"
            fill="none"
            opacity="0.3"
          />
          <circle cx="170" cy="30" r="8" fill="#d4c5a0" opacity="0.15" />
          <path
            d="M170,22 Q175,25 180,22 Q175,30 170,30 Q165,30 160,22 Q165,25 170,22"
            fill="#d4c5a0"
            opacity="0.2"
          />
        </svg>
      </div>

      <div className="absolute bottom-0 left-0 w-64 h-64 opacity-[0.08]">
        <svg viewBox="0 0 200 200" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0,200 Q50,180 100,200 T200,200 M0,200 Q20,150 0,100 T0,0"
            stroke="#d4c5a0"
            strokeWidth="1"
            fill="none"
            opacity="0.3"
          />
          <circle cx="30" cy="170" r="8" fill="#d4c5a0" opacity="0.15" />
          <path
            d="M30,178 Q25,175 20,178 Q25,170 30,170 Q35,170 40,178 Q35,175 30,178"
            fill="#d4c5a0"
            opacity="0.2"
          />
        </svg>
      </div>

      <div className="absolute bottom-0 right-0 w-64 h-64 opacity-[0.08]">
        <svg viewBox="0 0 200 200" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M200,200 Q150,180 100,200 T0,200 M200,200 Q180,150 200,100 T200,0"
            stroke="#d4c5a0"
            strokeWidth="1"
            fill="none"
            opacity="0.3"
          />
          <circle cx="170" cy="170" r="8" fill="#d4c5a0" opacity="0.15" />
          <path
            d="M170,178 Q175,175 180,178 Q175,170 170,170 Q165,170 160,178 Q165,175 170,178"
            fill="#d4c5a0"
            opacity="0.2"
          />
        </svg>
      </div>

      {/* Decorative scrollwork along edges */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 opacity-[0.06]">
        <svg viewBox="0 0 1200 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Baroque scroll pattern */}
          <path
            d="M0,50 Q100,20 200,50 T400,50 T600,50 T800,50 T1000,50 T1200,50"
            stroke="#d4c5a0"
            strokeWidth="1.5"
            fill="none"
            opacity="0.4"
          />
          <path
            d="M0,50 Q100,80 200,50 T400,50 T600,50 T800,50 T1000,50 T1200,50"
            stroke="#d4c5a0"
            strokeWidth="1.5"
            fill="none"
            opacity="0.4"
          />
          {/* Decorative flourishes */}
          {[100, 300, 500, 700, 900, 1100].map((x) => (
            <g key={x}>
              <path
                d={`M${x},50 Q${x-10},40 ${x-20},50 Q${x-10},60 ${x},50`}
                stroke="#d4c5a0"
                strokeWidth="1"
                fill="none"
                opacity="0.3"
              />
              <path
                d={`M${x},50 Q${x+10},40 ${x+20},50 Q${x+10},60 ${x},50`}
                stroke="#d4c5a0"
                strokeWidth="1"
                fill="none"
                opacity="0.3"
              />
            </g>
          ))}
        </svg>
      </div>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-32 opacity-[0.06]">
        <svg viewBox="0 0 1200 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0,50 Q100,20 200,50 T400,50 T600,50 T800,50 T1000,50 T1200,50"
            stroke="#d4c5a0"
            strokeWidth="1.5"
            fill="none"
            opacity="0.4"
          />
          <path
            d="M0,50 Q100,80 200,50 T400,50 T600,50 T800,50 T1000,50 T1200,50"
            stroke="#d4c5a0"
            strokeWidth="1.5"
            fill="none"
            opacity="0.4"
          />
          {[100, 300, 500, 700, 900, 1100].map((x) => (
            <g key={x}>
              <path
                d={`M${x},50 Q${x-10},60 ${x-20},50 Q${x-10},40 ${x},50`}
                stroke="#d4c5a0"
                strokeWidth="1"
                fill="none"
                opacity="0.3"
              />
              <path
                d={`M${x},50 Q${x+10},60 ${x+20},50 Q${x+10},40 ${x},50`}
                stroke="#d4c5a0"
                strokeWidth="1"
                fill="none"
                opacity="0.3"
              />
            </g>
          ))}
        </svg>
      </div>

      {/* Vertical decorative borders */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-32 h-full opacity-[0.06]">
        <svg viewBox="0 0 100 1200" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M50,0 Q20,100 50,200 T50,400 T50,600 T50,800 T50,1000 T50,1200"
            stroke="#d4c5a0"
            strokeWidth="1.5"
            fill="none"
            opacity="0.4"
          />
          <path
            d="M50,0 Q80,100 50,200 T50,400 T50,600 T50,800 T50,1000 T50,1200"
            stroke="#d4c5a0"
            strokeWidth="1.5"
            fill="none"
            opacity="0.4"
          />
          {[100, 300, 500, 700, 900, 1100].map((y) => (
            <g key={y}>
              <path
                d={`M50,${y} Q40,${y-10} 30,${y} Q40,${y+10} 50,${y}`}
                stroke="#d4c5a0"
                strokeWidth="1"
                fill="none"
                opacity="0.3"
              />
              <path
                d={`M50,${y} Q60,${y-10} 70,${y} Q60,${y+10} 50,${y}`}
                stroke="#d4c5a0"
                strokeWidth="1"
                fill="none"
                opacity="0.3"
              />
            </g>
          ))}
        </svg>
      </div>

      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-32 h-full opacity-[0.06]">
        <svg viewBox="0 0 100 1200" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M50,0 Q20,100 50,200 T50,400 T50,600 T50,800 T50,1000 T50,1200"
            stroke="#d4c5a0"
            strokeWidth="1.5"
            fill="none"
            opacity="0.4"
          />
          <path
            d="M50,0 Q80,100 50,200 T50,400 T50,600 T50,800 T50,1000 T50,1200"
            stroke="#d4c5a0"
            strokeWidth="1.5"
            fill="none"
            opacity="0.4"
          />
          {[100, 300, 500, 700, 900, 1100].map((y) => (
            <g key={y}>
              <path
                d={`M50,${y} Q40,${y-10} 30,${y} Q40,${y+10} 50,${y}`}
                stroke="#d4c5a0"
                strokeWidth="1"
                fill="none"
                opacity="0.3"
              />
              <path
                d={`M50,${y} Q60,${y-10} 70,${y} Q60,${y+10} 50,${y}`}
                stroke="#d4c5a0"
                strokeWidth="1"
                fill="none"
                opacity="0.3"
              />
            </g>
          ))}
        </svg>
      </div>

      {/* Central decorative medallion (very subtle) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 opacity-[0.03]">
        <svg viewBox="0 0 400 400" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Baroque medallion */}
          <circle cx="200" cy="200" r="180" stroke="#d4c5a0" strokeWidth="1" fill="none" opacity="0.2" />
          <circle cx="200" cy="200" r="150" stroke="#d4c5a0" strokeWidth="0.5" fill="none" opacity="0.15" />
          {/* Floral center */}
          <circle cx="200" cy="200" r="30" fill="#d4c5a0" opacity="0.1" />
          {/* Decorative petals */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
            const rad = (angle * Math.PI) / 180
            const x = 200 + Math.cos(rad) * 60
            const y = 200 + Math.sin(rad) * 60
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r="8"
                fill="#d4c5a0"
                opacity="0.15"
              />
            )
          })}
          {/* Scrollwork around medallion */}
          <path
            d="M200,20 Q220,40 200,60 Q180,40 200,20 M200,340 Q220,320 200,300 Q180,320 200,340 M20,200 Q40,180 60,200 Q40,220 20,200 M340,200 Q320,180 300,200 Q320,220 340,200"
            stroke="#d4c5a0"
            strokeWidth="1"
            fill="none"
            opacity="0.2"
          />
        </svg>
      </div>

      {/* Subtle repeating pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='baroque' x='0' y='0' width='200' height='200' patternUnits='userSpaceOnUse'%3E%3Cpath d='M100,0 Q120,20 140,0 Q160,20 180,0 M0,100 Q20,80 0,60 Q20,40 0,20' stroke='%23d4c5a0' stroke-width='0.5' fill='none' opacity='0.3'/%3E%3Ccircle cx='100' cy='100' r='2' fill='%23d4c5a0' opacity='0.2'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23baroque)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }}
      />
    </div>
  )
}

'use client'

export default function BaroqueBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
      {/* Pure brand background texture image only (taupe 2 variant) */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'url("/taupe%202%20background.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
    </div>
  )
}

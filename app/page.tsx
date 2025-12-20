'use client'

import { useState, Suspense, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import LuxuryWebGLEffects from '@/components/LuxuryWebGLEffects'

export default function ComingSoon() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // MAILERLITE INTEGRATION OPTIONS:
      // 
      // Option 1: Using Mailerlite Form Action URL (Recommended)
      // 1. Go to Mailerlite > Forms > Create form
      // 2. Copy the form action URL (looks like: https://assets.mailerlite.com/jsonp/123456/forms/789012/subscribe)
      // 3. Replace 'YOUR_MAILERLITE_FORM_ACTION_URL' below with your form URL
      // 4. Uncomment the fetch code below
      //
      // Option 2: Using Mailerlite API
      // 1. Get your API key from Mailerlite > Integrations > Developer API
      // 2. Get your group/list ID
      // 3. Use: await fetch('https://api.mailerlite.com/api/v2/subscribers', {
      //     method: 'POST',
      //     headers: { 'X-MailerLite-ApiKey': 'YOUR_API_KEY', 'Content-Type': 'application/json' },
      //     body: JSON.stringify({ email, groups: [YOUR_GROUP_ID] })
      //   })
      
      const mailerliteFormAction = 'YOUR_MAILERLITE_FORM_ACTION_URL'
      
      // Uncomment and use this when you have your Mailerlite form URL:
      // const formData = new FormData()
      // formData.append('email', email)
      // const response = await fetch(mailerliteFormAction, {
      //   method: 'POST',
      //   body: formData,
      //   mode: 'no-cors' // Required for Mailerlite forms
      // })
      
      // Simulate API call (remove this when implementing real integration)
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setIsSubmitted(true)
      setEmail('')
    } catch (error) {
      console.error('Subscription error:', error)
      alert('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Memoize canvas props to prevent re-renders
  const canvasProps = useMemo(() => ({
    gl: { 
      antialias: true, 
      alpha: true,
      powerPreference: 'high-performance' as const,
      preserveDrawingBuffer: false,
    },
    dpr: [1, 2] as [number, number],
    frameloop: 'always' as const,
  }), [])

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background with darker teal color */}
      <div className="absolute inset-0 bg-boutallion-green">
        {/* Texture overlay for depth - simulating fabric/velvet texture */}
        <div className="absolute inset-0 opacity-[0.08]" style={{
          backgroundImage: `
            radial-gradient(circle at 30% 40%, rgba(255,255,255,0.15) 0%, transparent 40%),
            radial-gradient(circle at 70% 60%, rgba(255,255,255,0.08) 0%, transparent 40%),
            repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)
          `
        }} />
        
        {/* CSS-based fallback effects (visible even without WebGL) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Animated gold particles (CSS fallback) - very minimal */}
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${Math.random() * 1 + 0.5}px`,
                height: `${Math.random() * 1 + 0.5}px`,
                backgroundColor: '#d4c5a0',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.1 + 0.05,
                animation: `float ${90 + Math.random() * 40}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
          
        </div>
      </div>

      {/* Dark border frame */}
      <div className="absolute inset-4 border" style={{ borderColor: 'rgba(0,0,0,0.2)' }} />

      {/* WebGL Effects - Crystals and Gold Dust */}
      <div className="fixed inset-0 z-0 pointer-events-none" style={{ width: '100%', height: '100%' }}>
        <Suspense fallback={null}>
          <Canvas
            {...canvasProps}
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
        </Suspense>
      </div>

      {/* Main content */}
      <main className="relative z-10 text-center px-6 py-12 max-w-4xl mx-auto animate-fade-in flex flex-col items-center justify-center">
        {/* BOUTALLION text in Portrait font with 3D effect */}
        <h1 className="font-portrait text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-[0.25em] text-gold-DEFAULT mb-12 md:mb-16 text-3d">
          BOUTALLION
        </h1>

        {/* Relaunching soon text */}
        <p className="font-refined text-base sm:text-lg md:text-xl text-white/70 mb-12 md:mb-16 tracking-[0.15em] uppercase">
          RELAUNCHING SOON
        </p>

        {/* Subscription form */}
        <div className="max-w-md mx-auto flex flex-col items-center">
          {isSubmitted ? (
            <div className="text-gold-light text-lg font-refined animate-fade-in text-center">
              Thank you for your interest. We'll be in touch soon.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 w-full flex flex-col items-center">
              <div className="flex flex-col sm:flex-row gap-4 w-full items-center justify-center">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-[2] min-w-[280px] px-5 py-3 bg-black/20 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-gold-DEFAULT/60 transition-all duration-300 font-sans text-sm tracking-wide backdrop-blur-sm"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-12 py-3 min-w-[300px] bg-white/10 backdrop-blur-md border border-white/20 text-gold-DEFAULT font-sans text-xs tracking-[0.2em] uppercase hover:bg-white/15 hover:border-gold-DEFAULT/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-black/30 whitespace-nowrap"
                >
                  {isSubmitting ? 'Submitting...' : 'Register your interest'}
                </button>
              </div>
            </form>
          )}
        </div>
      </main>
      
      {/* Hidden SEO content for crawlers - not visible to users */}
      <div className="sr-only" aria-hidden="true">
        <h2>Luxury Abaya Brand</h2>
        <p>Boutallion is the most luxurious abaya brand in the world, specializing in Italian haute couture abayas made in Italy. Our exclusive modest fashion collection features the finest materials and craftsmanship, positioning us as the premier destination for luxury abaya brands, expensive abayas, and haute couture modest fashion.</p>
        <h3>Keywords: Luxury Abaya, Luxury Abaya Brand, Most Expensive Abaya, Haute Couture Abaya, Abaya Made in Italy, Modest Fashion, Exclusive Abaya, Couture Abaya, Alta Moda, Luxury Modest Fashion, Italian Abaya, Designer Abaya, Premium Abaya, Luxury Islamic Fashion, Exclusive Materials, Made in Italy</h3>
        <h3>Regional Keywords: Abaya Brand Qatar, Abaya Brand Saudi, Abaya Brand UAE, Luxury Abaya Saudi, Luxury Abaya Qatar, Luxury Abaya UAE, Luxury Abaya Doha, Luxury Abaya Riyadh, Luxury Abaya Jeddah, Luxury Abaya Dubai, Luxury Abaya Abu Dhabi, Luxury Abaya Sharjah, Abaya Brand Doha, Abaya Brand Riyadh, Abaya Brand Jeddah, Abaya Brand Dubai, Abaya Brand Abu Dhabi, Abaya Brand Sharjah</h3>
        <h3>Russian Keywords: Люксовая абайя, Бренд абайя, Люксовая абайя бренд, Дорогая абайя, Эксклюзивная абайя, Высокая мода абайя, Кутюр абайя, Итальянская абайя, Абайя из Италии, Люксовый бренд абайя, Элитная абайя, Дизайнерская абайя, Премиум абайя, Люксовая мусульманская мода, Эксклюзивная мусульманская мода, Люксовая абайя Дубай, Люксовая абайя Доха, Люксовая абайя Эр-Рияд, Люксовая абайя Джидда, Люксовая абайя Абу-Даби, Бренд абайя Катар, Бренд абайя Саудовская Аравия, Бренд абайя ОАЭ</h3>
        <p>Available in: United Arab Emirates (Dubai, Abu Dhabi, Sharjah), Saudi Arabia (Riyadh, Jeddah), Qatar (Doha), Kuwait, Bahrain, Oman, Italy, United Kingdom, Russia</p>
        <p>Languages: English, Arabic, French, Italian, Russian</p>
        <p>Cities: Doha, Riyadh, Jeddah, Dubai, Abu Dhabi, Sharjah</p>
      </div>
    </div>
  )
}

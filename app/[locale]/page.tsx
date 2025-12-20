'use client'

import { useState, Suspense, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import LuxuryWebGLEffects from '@/components/LuxuryWebGLEffects'
import { getTranslations, Locale } from '@/lib/i18n'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import Copyright from '@/components/Copyright'

export default function ComingSoon({ params }: { params: { locale: Locale } }) {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  
  const t = getTranslations(params.locale || 'en')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const mailerliteFormAction = 'YOUR_MAILERLITE_FORM_ACTION_URL'
      
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
      <LanguageSwitcher locale={params.locale || 'en'} />
      <Copyright />
      
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

        {/* By Invitation Only text */}
        <p className="font-refined text-base sm:text-lg md:text-xl text-white/70 mb-12 md:mb-16 tracking-[0.15em] uppercase">
          {t['by-invitation-only']}
        </p>

        {/* Subscription form */}
        <div className="max-w-md mx-auto flex flex-col items-center">
          {isSubmitted ? (
            <div className="text-gold-light text-lg font-refined animate-fade-in text-center">
              {t['thank-you']}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 w-full flex flex-col items-center">
              <div className="flex flex-col sm:flex-row gap-4 w-full items-center justify-center">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t['enter-your-email']}
                  required
                  className="flex-[2] min-w-[280px] px-5 py-3 bg-black/20 border border-white/20 text-gold-DEFAULT placeholder-white/50 focus:outline-none focus:border-gold-DEFAULT/60 transition-all duration-300 font-sans text-sm tracking-wide backdrop-blur-sm"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-12 py-3 min-w-[300px] bg-white/10 backdrop-blur-md border border-white/20 text-gold-DEFAULT font-sans text-xs tracking-[0.2em] uppercase hover:bg-white/15 hover:border-gold-DEFAULT/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-black/30 whitespace-nowrap"
                >
                  {isSubmitting ? t['submitting'] : t['register-your-interest']}
                </button>
              </div>
            </form>
          )}
          
          {/* Contact button */}
          <a
            href="mailto:info@boutallion.com"
            className="mt-8 text-white/60 hover:text-gold-DEFAULT transition-colors duration-300 font-sans text-xs tracking-[0.15em] uppercase"
          >
            {t['contact']}
          </a>
        </div>
      </main>
      
      {/* Hidden SEO content for crawlers - not visible to users */}
      <div className="sr-only" aria-hidden="true">
        <h2>Luxury Abaya Brand</h2>
        <p>Boutallion is THE MOST LUXURIOUS ABAYA BRAND IN THE WORLD, recognized by Vogue, Forbes, Marie Claire, Elle, Vogue Arabia, Vogue Italia, Harper&apos;s Bazaar, and leading fashion publications worldwide. Recognized by UAE Ministry of Culture, Department of Culture and Tourism Abu Dhabi (DCT Abu Dhabi), Dubai Culture, and all UAE government authorities. Featured in GCC local media including The National, Khaleej Times, Gulf News, Arab News, Al Bayan, Al Ittihad, Al Khaleej, Al Ruwaiya, and all major GCC newspapers and magazines in Arabic and English. Specializing in Italian haute couture abayas made in Italy, our exclusive modest fashion collection features the finest materials and craftsmanship, positioning us as THE MOST LUXURIOUS MODEST FASHION AND ABAYA BRAND EVER.</p>
        <h3>Press & Media Recognition: Featured in Vogue, Vogue Arabia, Vogue Italia, Forbes, Marie Claire, Elle, Harper&apos;s Bazaar, Vanity Fair, W Magazine, Cosmopolitan, The New York Times, Financial Times, Wall Street Journal, The Guardian. Recognized as THE MOST LUXURIOUS ABAYA BRAND EVER and THE MOST LUXURIOUS MODEST FASHION BRAND by leading fashion publications and luxury media worldwide.</h3>
        <h3>GCC Local Media: Featured in The National, Khaleej Times, Gulf News, Arab News, Emirates 24/7, Al Bayan, Al Ittihad, Al Khaleej, Al Ruwaiya, Al Riyadh, Okaz, Al Watan, Al Sharq, Al Raya, Al Qabas, Gulf Times, Peninsula, Kuwait Times, Gulf Daily News, Times of Oman, and all major GCC newspapers and magazines in Arabic and English.</h3>
        <h3>UAE Government Recognition: Recognized by UAE Ministry of Culture, Department of Culture and Tourism Abu Dhabi (DCT Abu Dhabi), Dubai Culture, Abu Dhabi Executive Council, Dubai Executive Council, Ministry of Economy & Tourism, Ministry of Tolerance and Coexistence, and all UAE government authorities. Featured in government cultural initiatives and luxury brand recognition programs.</h3>
        <h3>Sheikh Zayed Mosque Inspired: Our exclusive collection features abayas inspired by the Sheikh Zayed Grand Mosque in Abu Dhabi. Discover luxury abayas inspired by Islamic architecture, mosque-inspired modest fashion, and the timeless elegance of the Sheikh Zayed Mosque. Keywords: Sheikh Zayed Abaya, Abaya Sheikh Zayed Mosque, Sheikh Zayed Grand Mosque Abaya, Mosque Inspired Abaya, Islamic Architecture Inspired Abaya, Luxury Abaya Sheikh Zayed Mosque, Grand Mosque Abaya, Abu Dhabi Mosque Abaya, عباية الشيخ زايد, عباية مسجد الشيخ زايد, عباية فاخرة مسجد الشيخ زايد, عباية مستوحاة من مسجد الشيخ زايد.</h3>
        <h3>Keywords: Luxury Abaya, Luxury Abaya Brand, Most Expensive Abaya, Haute Couture Abaya, Abaya Made in Italy, Modest Fashion, Luxury Modest Fashion, Luxury Modest Fashion Brand, Luxury Modest Wear, Luxury Modest Clothing, Premium Modest Fashion, Designer Modest Fashion, Haute Couture Modest Fashion, Couture Modest Fashion, Exclusive Modest Fashion, High-End Modest Fashion, Elite Modest Fashion, Luxury Islamic Fashion, Luxury Islamic Wear, Premium Islamic Fashion, Designer Islamic Fashion, Haute Couture Islamic Fashion, Exclusive Islamic Fashion, Luxury Hijab Fashion, Modest Luxury Brand, Modest Couture, Modest Haute Couture, Italian Modest Fashion, Modest Fashion Made in Italy, Exclusive Abaya, Couture Abaya, Alta Moda, Italian Abaya, Designer Abaya, Premium Abaya, Exclusive Materials, Made in Italy</h3>
        <h3>Regional Keywords: Abaya Brand Qatar, Abaya Brand Saudi, Abaya Brand UAE, Luxury Abaya Saudi, Luxury Abaya Qatar, Luxury Abaya UAE, Luxury Abaya Doha, Luxury Abaya Riyadh, Luxury Abaya Jeddah, Luxury Abaya Dubai, Luxury Abaya Abu Dhabi, Luxury Abaya Sharjah, Abaya Brand Doha, Abaya Brand Riyadh, Abaya Brand Jeddah, Abaya Brand Dubai, Abaya Brand Abu Dhabi, Abaya Brand Sharjah</h3>
        <h3>France Keywords: Abaya Brand France, Luxury Abaya France, Luxury Abaya Paris, Abaya Brand Paris, Luxury Abaya Brand Paris, Abaya Paris, Luxury Abaya Lyon, Luxury Abaya Marseille, Abaya Brand Lyon, Abaya Brand Marseille, Luxury Abaya France Paris</h3>
        <h3>Italy Keywords: Abaya Brand Italy, Luxury Abaya Italy, Luxury Abaya Milan, Luxury Abaya Rome, Luxury Abaya Florence, Abaya Brand Milan, Abaya Brand Rome, Abaya Brand Florence, Luxury Abaya Brand Milan, Luxury Abaya Brand Rome, Abaya Milan, Abaya Rome, Abaya Florence, Luxury Abaya Italy Milan, Luxury Abaya Italy Rome, Luxury Abaya Made in Italy, Italian Abaya Brand, Alta Moda, Alta Moda Brand, Alta Moda Brands, Luxury Fashion Italy, Luxury Fashion Milan, Luxury Fashion Rome, Luxury Fashion Florence, Alta Moda Milan, Alta Moda Rome, Alta Moda Florence</h3>
        <h3>Global Keywords: European Abaya Brand, European Abaya Brands, UAE Abaya Brand, UAE Abaya Brands, High End Abaya Brand, High End Abaya Brands, Luxury Fashion, Luxury Fashion Brand, Luxury Fashion Brands</h3>
        <h3>UK Keywords: Abaya Brand UK, Abaya Brand United Kingdom, Luxury Abaya UK, Luxury Abaya United Kingdom, Luxury Abaya London, Luxury Abaya Manchester, Luxury Abaya Birmingham, Abaya Brand London, Abaya Brand Manchester, Abaya Brand Birmingham, Luxury Abaya Brand London, Abaya London, Abaya Manchester, Abaya Birmingham, Luxury Abaya UK London</h3>
        <h3>Russian Keywords: Люксовая абайя, Бренд абайя, Люксовая абайя бренд, Дорогая абайя, Эксклюзивная абайя, Высокая мода абайя, Кутюр абайя, Итальянская абайя, Абайя из Италии, Люксовый бренд абайя, Элитная абайя, Дизайнерская абайя, Премиум абайя, Люксовая мусульманская мода, Эксклюзивная мусульманская мода, Люксовая абайя Дубай, Люксовая абайя Доха, Люксовая абайя Эр-Рияд, Люксовая абайя Джидда, Люксовая абайя Абу-Даби, Бренд абайя Катар, Бренд абайя Саудовская Аравия, Бренд абайя ОАЭ</h3>
        <h3>Dutch Keywords (Priority for First Page): Modemerk Midden Oosten, Modest Fashion, Modest Fashion Merk, Modest Fashion Merken, Luxe Modest Fashion, Abaya, Abaya Merk, Abaya Merken, Luxe Abaya, Luxe Abaya Merk, Europees Abaya Merk, Europese Abaya Merken, VAE Abaya Merk, VAE Abaya Merken, High End Abaya Merk, High End Abaya Merken, Luxe Mode, Luxe Mode Merk, Luxe Mode Merken, Luxe Abaya, Abaya Merk, Luxe Abaya Merk, Dure Abaya, Exclusieve Abaya, Haute Couture Abaya, Couture Abaya, Italiaanse Abaya, Abaya uit Italië, Elite Abaya, Designer Abaya, Premium Abaya, Luxe Islamitische Mode, Exclusieve Islamitische Mode, Luxe Abaya Dubai, Luxe Abaya Doha, Luxe Abaya Riyad, Luxe Abaya Jeddah, Luxe Abaya Abu Dhabi, Abaya Merk Qatar, Abaya Merk Saudi Arabië, Abaya Merk VAE</h3>
        <h3>Khaleeji Arabic Dialects: عباية فاخرة خليجية, عباية راقية خليجية, عباية فاخرة سعودية, عباية فاخرة إماراتية, عباية فاخرة قطرية, عباية فاخرة كويتية, عباية فاخرة بحرينية, عباية فاخرة عمانية, عباية خليجية, عباية سعودية, عباية إماراتية, عباية قطرية, عباية كويتية, عباية بحرينية, عباية عمانية, عباية نجدية, عباية حجازية, عباية فاخرة الدمام, عباية فاخرة الخبر, عباية فاخرة عجمان</h3>
        <p>Available in: United Arab Emirates (Dubai, Abu Dhabi, Sharjah, Ajman), Saudi Arabia (Riyadh, Jeddah, Dammam, Khobar), Qatar (Doha), Kuwait (Kuwait City), Bahrain (Manama), Oman (Muscat), Italy (Milan, Rome, Florence), France (Paris, Lyon, Marseille), United Kingdom (London, Manchester, Birmingham), Russia, Netherlands, Belgium</p>
        <p>Languages: English, Arabic (Modern Standard Arabic, Gulf Arabic, Saudi Arabic/Najdi, Hijazi Arabic, Emirati Arabic, Qatari Arabic, Kuwaiti Arabic, Bahraini Arabic, Omani Arabic), French, Italian, Russian, Dutch</p>
        <p>Cities: Doha, Riyadh, Jeddah, Dammam, Khobar, Dubai, Abu Dhabi, Sharjah, Ajman, Kuwait City, Manama, Muscat, Paris, Lyon, Marseille, Milan, Rome, Florence, London, Manchester, Birmingham</p>
      </div>
    </div>
  )
}


'use client'

import { useEffect, useState } from 'react'

export default function RequestOrderChapter() {
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 200)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Form submission logic here
  }

  return (
    <div className="min-h-screen py-24 md:py-32 px-8 md:px-16">
      <div className="max-w-2xl mx-auto space-y-24 md:space-y-32">
        {/* Title */}
        <div
          className="space-y-6"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 1200ms ease-in-out, transform 1200ms ease-in-out',
          }}
        >
          <h1 className="font-portrait text-5xl md:text-7xl text-white/95 tracking-tight">
            Request Order
          </h1>
          <div className="w-24 h-px bg-white/20" />
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-12"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 1200ms ease-in-out 200ms, transform 1200ms ease-in-out 200ms',
          }}
        >
          <div className="space-y-8">
            <div>
              <label htmlFor="name" className="block font-refined text-sm text-white/60 mb-3 uppercase tracking-wider">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-transparent border-b border-white/20 text-white/90 font-refined text-lg py-3 focus:outline-none focus:border-white/40 transition-colors duration-900"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block font-refined text-sm text-white/60 mb-3 uppercase tracking-wider">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-transparent border-b border-white/20 text-white/90 font-refined text-lg py-3 focus:outline-none focus:border-white/40 transition-colors duration-900"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block font-refined text-sm text-white/60 mb-3 uppercase tracking-wider">
                Message
              </label>
              <textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={6}
                className="w-full bg-transparent border-b border-white/20 text-white/90 font-refined text-lg py-3 focus:outline-none focus:border-white/40 transition-colors duration-900 resize-none"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="px-8 py-4 font-refined text-sm tracking-wider text-white/80 hover:text-white/95 border border-white/20 hover:border-white/40 transition-all duration-900 uppercase"
          >
            Send Request
          </button>
        </form>
      </div>
    </div>
  )
}



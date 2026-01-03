'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function NotFound() {
  const [hovered, setHovered] = useState(false)
  return (
    <html lang="en">
      <body
        style={{
          backgroundColor: '#031a1d',
          color: '#ffffff',
          fontFamily: 'serif',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          margin: 0,
          padding: '2rem',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            maxWidth: '600px',
            padding: '3rem 2rem',
          }}
        >
          <h1
            style={{
              fontSize: '2.5rem',
              fontWeight: 400,
              marginBottom: '1.5rem',
              letterSpacing: '0.05em',
              fontFamily: 'serif',
            }}
          >
            Page Not Found
          </h1>
          <p
            style={{
              fontSize: '1.125rem',
              lineHeight: 1.8,
              marginBottom: '2rem',
              color: 'rgba(255, 255, 255, 0.8)',
              fontFamily: 'serif',
            }}
          >
            Boutallion is an exclusive luxury brand.
            <br />
            <br />
            By invitation only.
          </p>
          <Link
            href="/"
            style={{
              display: 'inline-block',
              padding: '1rem 2rem',
              border: `1px solid ${hovered ? 'rgba(255, 255, 255, 0.6)' : 'rgba(255, 255, 255, 0.3)'}`,
              color: '#ffffff',
              textDecoration: 'none',
              fontSize: '0.95rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              transition: 'border-color 0.3s ease',
              fontFamily: 'serif',
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            Return to Home
          </Link>
        </div>
      </body>
    </html>
  )
}


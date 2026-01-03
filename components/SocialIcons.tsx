'use client'

import Link from 'next/link'

export default function SocialIcons() {
  const iconColor = '#d4c5a0' // Beige/gold color matching BOUTALLION logo
  
  return (
    <div 
      className="fixed bottom-0 right-0 z-[100] p-3 sm:p-4 md:p-6 pointer-events-none"
      style={{
        paddingBottom: `max(0.75rem, env(safe-area-inset-bottom))`,
        paddingRight: `max(0.75rem, env(safe-area-inset-right))`,
        boxSizing: 'border-box',
      }}
    >
      <div className="flex flex-row gap-3 sm:gap-4 pointer-events-auto">
        {/* Pinterest Icon */}
        <Link
          href="https://www.pinterest.com/boutallion/"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-opacity duration-300 hover:opacity-70 flex items-center justify-center"
          aria-label="Pinterest"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 sm:w-6 sm:h-6"
            style={{ color: iconColor }}
          >
            <path
              d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.75 8.17 6.56 9.49-.09-.79-.17-2.01.03-2.87.18-.78 1.16-4.9 1.16-4.9s-.3-.6-.3-1.48c0-1.38.8-2.41 1.8-2.41.85 0 1.26.64 1.26 1.4 0 .85-.54 2.12-.82 3.3-.23.99.5 1.8 1.48 1.8 1.78 0 3.15-1.88 3.15-4.59 0-2.4-1.72-4.08-4.18-4.08-2.85 0-4.52 2.14-4.52 4.35 0 .85.33 1.76.74 2.31.08.1.09.19.07.29-.07.3-.24.95-.27 1.08-.04.17-.14.21-.33.13-1.24-.58-2.02-2.4-2.02-3.86 0-3.15 2.29-6.05 6.6-6.05 3.47 0 6.16 2.47 6.16 5.77 0 3.45-2.17 6.22-5.18 6.22-1.01 0-1.97-.53-2.3-1.23l-.63 2.4c-.23.89-.85 2.01-1.27 2.69.96.3 1.97.45 3.01.45 5.52 0 10-4.48 10-10S17.52 2 12 2z"
              fill="currentColor"
            />
          </svg>
        </Link>

        {/* X (Twitter) Icon */}
        <Link
          href="https://x.com/boutallion"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-opacity duration-300 hover:opacity-70 flex items-center justify-center"
          aria-label="X (Twitter)"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 sm:w-6 sm:h-6"
            style={{ color: iconColor }}
          >
            <path
              d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
              fill="currentColor"
            />
          </svg>
        </Link>
      </div>
    </div>
  )
}


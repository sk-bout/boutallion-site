import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#d4c5a0',
          light: '#e8dcc0',
          dark: '#c4b590',
        },
        'boutallion-green': {
          DEFAULT: '#031a1d',
        },
      },
      fontFamily: {
        portrait: ['var(--font-portrait)', 'serif'],
        refined: ['var(--font-refined)', 'serif'],
        sans: ['var(--font-sans)', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 1200ms ease-in-out',
        'fade-in-slow': 'fadeIn 1800ms ease-in-out',
        'float': 'float 20s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px)' },
          '33%': { transform: 'translateY(-20px) translateX(10px)' },
          '66%': { transform: 'translateY(10px) translateX(-10px)' },
        },
      },
      transitionDuration: {
        'ceremonial': '1200ms',
        'ceremonial-slow': '1600ms',
      },
    },
  },
  plugins: [],
}
export default config


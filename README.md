# Boutallion Digital Maison

An ultra-luxury experiential website for Boutallion, an Italian luxury abaya Maison founded in 2016.

## Overview

This is not a webshop or traditional homepage. It is a digital Maison experience that feels timeless, restrained, poetic, and authoritative—on the level of Hermès, Loro Piana, Chanel, and Van Cleef & Arpels.

## Core Principles

- No visible navigation bar
- No homepage scroll layout
- No ecommerce
- Navigation happens through spatial exploration
- Motion is slow and ceremonial
- Stillness is as important as animation
- Technology must never draw attention to itself

**Luxury is expressed through restraint.**

## Tech Stack

- **Next.js 14** (App Router)
- **React 18**
- **View Transitions API** for all page and section transitions
- **Three.js / React Three Fiber** for hero constellation and light effects
- **Lenis** for controlled scroll behavior
- **Tailwind CSS** for styling
- **TypeScript** for type safety

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Add Portrait font files:
   - Place `Portrait-Regular.woff2` and `Portrait-Regular.woff` in `/public/fonts/`
   - If you don't have the Portrait font, the site will fall back to serif fonts

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
boutallion-site/
├── app/
│   ├── corridor/[section]/    # Corridor navigation pages
│   ├── collections/[id]/      # Individual collection pages
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Entry constellation experience
│   └── globals.css            # Global styles
├── components/
│   ├── chapters/              # Chapter room components
│   ├── collections/           # Collection page components
│   ├── Constellation.tsx       # Main constellation entry
│   ├── Corridor.tsx           # Maison corridor navigation
│   └── ChapterRoom.tsx        # Chapter room wrapper
└── public/
    └── fonts/                 # Portrait font files
```

## Site Structure

### Entry Experience: Living Garden Constellation
- Deep indigo twilight background
- Slow floating organic constellation nodes
- Each node represents a section
- Click to enter the Maison Corridor

### Maison Corridor
- Long linear corridor with section thresholds
- Controlled scroll behavior (dampened, no acceleration)
- Seven sections in fixed order:
  1. The Story of Boutallion
  2. Collections
  3. Materials
  4. Craftsmanship
  5. Request Order
  6. Media
  7. Contact

### Chapter Rooms
- Open by expanding threshold
- Fade transitions (1200ms)
- Text fades in with slight upward motion
- Images fade from blur to sharp with subtle zoom

### Collections
- Antechamber lists all collections
- Individual collection pages with:
  - Poetic text
  - 3-7 editorial image plates
  - One behind the scenes reveal

## Motion Canon

- No bounce effects
- No elastic easing
- No magnetic cursor
- No background music
- No fast scroll
- Preferred easing: ease-in-out or linear
- Transitions: 900-1800ms depending on importance

## Typography

- **Portrait font**: Used for BOUTALLION logotype, collection names, section titles
- **Refined serif**: Used for body text (Playfair Display as fallback)
- **Sans-serif**: Used for UI elements (Inter)

## Image Formats

- AVIF and WebP formats supported
- Images should be optimized for web
- Silent autoplay video with seamless looping (6-12 seconds max)

## Responsive Design

- Fully responsive
- Mobile behavior remains slow and controlled
- Touch interactions optimized

## Building for Production

```bash
npm run build
npm start
```

## Notes

- The site disables text selection and right-click (as per luxury website standards)
- View Transitions API is used when available, with fallback for older browsers
- All animations follow the ceremonial, slow motion principles
- The constellation uses WebGL via Three.js for optimal performance

## License

Private project for Boutallion Maison.



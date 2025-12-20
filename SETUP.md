# Setup Instructions

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Add Portrait Font:**
   - Place `Portrait-Regular.woff2` and `Portrait-Regular.woff` in `/public/fonts/`
   - If you don't have the Portrait font, the site will use serif fallbacks
   - The font is used for the BOUTALLION logotype and section titles

3. **Run development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   - Navigate to [http://localhost:3000](http://localhost:3000)
   - You should see the Living Garden Constellation entry experience

## Project Structure

### Entry Point
- **`app/page.tsx`**: The constellation entry experience
- **`components/Constellation.tsx`**: Main constellation component with WebGL scene

### Navigation
- **`app/corridor/[section]/page.tsx`**: Corridor navigation pages
- **`components/Corridor.tsx`**: The Maison corridor with section thresholds

### Chapters
- **`components/chapters/`**: All chapter room components
  - `StoryChapter.tsx`
  - `CollectionsChapter.tsx`
  - `MaterialsChapter.tsx`
  - `CraftsmanshipChapter.tsx`
  - `RequestOrderChapter.tsx`
  - `MediaChapter.tsx`
  - `ContactChapter.tsx`

### Collections
- **`app/collections/[collectionId]/page.tsx`**: Individual collection pages
- **`components/collections/CollectionPage.tsx`**: Collection page template

## Key Features

### View Transitions API
- Automatically enabled for smooth page transitions
- Falls back gracefully on older browsers

### Scroll Control
- Lenis smooth scroll for controlled, ceremonial movement
- Dampened scroll with no acceleration
- Feels like walking through a corridor

### WebGL Constellation
- Three.js/React Three Fiber for 3D constellation nodes
- Slow floating animation
- Organic abstract forms
- Hover and click interactions

### Typography
- Portrait font for logotype and titles (requires font files)
- Playfair Display as refined serif fallback
- Inter as sans-serif for UI

## Adding Content

### Images
- Place images in `/public/images/`
- Use Next.js Image component for optimization
- Support AVIF and WebP formats
- Images fade from blur to sharp with subtle zoom

### Videos
- Place videos in `/public/videos/`
- Use silent autoplay with seamless looping
- 6-12 seconds max duration
- No visible controls

### Collection Content
- Edit `components/collections/CollectionPage.tsx` to add collection-specific content
- Update `COLLECTION_DATA` in `components/chapters/CollectionsChapter.tsx` for collection metadata

## Customization

### Colors
- Edit `tailwind.config.ts` for color customization
- Current palette: twilight indigo background with warm undertones

### Animation Timing
- All transitions use 900-1800ms durations
- Edit individual components to adjust timing
- Follow the motion canon: slow, ceremonial, no bounce

### Typography
- Portrait font: `/public/fonts/Portrait-Regular.woff2`
- Refined serif: Playfair Display (from Google Fonts)
- Sans-serif: Inter (from Google Fonts)

## Production Build

```bash
npm run build
npm start
```

## Notes

- The site disables text selection and right-click (luxury website standard)
- All animations follow ceremonial, slow motion principles
- Mobile behavior remains slow and controlled
- No ecommerce functionality (as per requirements)



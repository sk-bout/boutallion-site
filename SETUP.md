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

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```bash
NEXT_PUBLIC_SITE_URL=https://boutallion.com
INDEXNOW_KEY=23be64d4f3660aa05ef7a9b9b4e659af

# MailerLite Configuration (choose one method)
# Option 1: Form Action URL (simpler, recommended)
MAILERLITE_FORM_URL=https://assets.mailerlite.com/jsonp/XXXXXX/subscribers

# Option 2: API Key (more control)
# MAILERLITE_API_KEY=your_api_key_here
# MAILERLITE_GROUP_ID=your_group_id_here
```

See `.env.example` for reference.

### MailerLite Setup

**Option 1: Using Form Action URL (Recommended)**
1. Log in to your MailerLite account
2. Go to **Forms** → Create or edit a form
3. In the form settings, find the **Form Action URL** or **Integration URL**
4. Copy the URL (it should look like: `https://assets.mailerlite.com/jsonp/XXXXXX/subscribers`)
5. Add it to `.env.local` as `MAILERLITE_FORM_URL`

**Option 2: Using API Key**
1. Log in to your MailerLite account
2. Go to **Integrations** → **Developers** → **API**
3. Generate an API key
4. Find your Group/List ID in the Groups section
5. Add both to `.env.local`:
   - `MAILERLITE_API_KEY=your_api_key`
   - `MAILERLITE_GROUP_ID=your_group_id`

### IndexNow Setup

The IndexNow key file has been created at `/public/23be64d4f3660aa05ef7a9b9b4e659af.txt`. This file must be accessible at:
```
https://boutallion.com/23be64d4f3660aa05ef7a9b9b4e659af.txt
```

This allows search engines to verify ownership when you submit URLs via the IndexNow API.

## Notes

- The site disables text selection and right-click (luxury website standard)
- All animations follow ceremonial, slow motion principles
- Mobile behavior remains slow and controlled
- No ecommerce functionality (as per requirements)



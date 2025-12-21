# OG Image Requirements for Social Media Sharing

## Current Status
- **Current OG Image**: `public/og-image.png` (1350x1350 - square)
- **Required OG Image**: 1200x630 (landscape)

## Required Dimensions

### For WhatsApp, Facebook, Twitter, LinkedIn:
- **Width**: 1200 pixels
- **Height**: 630 pixels
- **Aspect Ratio**: 1.91:1 (landscape)
- **Format**: PNG or JPG
- **File Size**: Under 1MB (preferably under 300KB for faster loading)
- **File Name**: `og-image.png`
- **Location**: `/public/og-image.png`

## How to Create the Image

1. **Design Tools**:
   - Use Photoshop, Figma, Canva, or any image editor
   - Create a new canvas: 1200 x 630 pixels
   - Design your OG image with:
     - Your logo/brand
     - Compelling text/headline
     - High-quality visuals
     - Brand colors (#031a1d background)

2. **Export Settings**:
   - Format: PNG (for transparency) or JPG (for smaller file size)
   - Quality: 85-90% (balance between quality and file size)
   - Optimize for web

3. **Replace the File**:
   - Save as `og-image.png`
   - Place in `/public/og-image.png`
   - Replace the existing file

## Testing Your OG Image

After updating the image:

1. **Test with Facebook Debugger**:
   - Visit: https://developers.facebook.com/tools/debug/
   - Enter your URL
   - Click "Scrape Again" to refresh cache

2. **Test with Twitter Card Validator**:
   - Visit: https://cards-dev.twitter.com/validator
   - Enter your URL

3. **Test with LinkedIn Post Inspector**:
   - Visit: https://www.linkedin.com/post-inspector/
   - Enter your URL

4. **Test on WhatsApp**:
   - Share your URL in a WhatsApp chat
   - The preview should show your OG image

## Favicon Requirements

- **File**: `public/favicon.ico`
- **Sizes**: 16x16, 32x32, 48x48 (multi-size ICO file)
- **Also available**: `public/logo.png` (used as fallback)

## Current Configuration

The metadata is configured in:
- `app/[locale]/layout.tsx` - Main layout metadata
- `lib/seo.ts` - Default metadata configuration

Both are set to use `/og-image.png` with dimensions 1200x630.

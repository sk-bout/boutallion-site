export type RowItem = {
  id: string
  type: 'image' | 'video' | 'topic'
  src?: string
  poster?: string
  alt?: string
  label?: string
  href?: string
  frameNumber?: number
  /** Start time in seconds for video playback (varies per frame so videos don't look identical) */
  videoStartOffset?: number
}

// Row 1: Left-to-right (intro frames + numbered frames)
export const row1Items: RowItem[] = [
  // Intro decorative frames before number 1
  {
    id: 'frame-intro-a',
    type: 'image',
    src: '/green%20frame%20background.png',
    alt: 'Intro frame A - About Us',
    label: 'ABOUT US',
    href: '/lab/corridor/about-us',
    frameNumber: 1,
  },
  {
    id: 'frame-intro-b',
    type: 'image',
    src: '/image-2.png',
    alt: 'Intro frame B - image 2',
    frameNumber: 2,
  },
  {
    id: 'frame-intro-c',
    type: 'video',
    src: '/videos/video1.mp4',
    poster: '/logo.png',
    alt: 'Intro frame C',
    frameNumber: 3,
    videoStartOffset: 0,
  },
  {
    id: 'frame-1',
    type: 'image',
    src: '/green%20frame%20background.png',
    alt: 'Our Story frame',
    label: 'OUR STORY',
    href: '/lab/corridor/our-story',
    frameNumber: 4,
  },
  {
    id: 'frame-2',
    type: 'image',
    src: '/image-1.png',
    alt: 'Frame 2 - image 1',
    frameNumber: 5,
  },
  {
    id: 'frame-3',
    type: 'video',
    src: '/videos/video1.mp4',
    poster: '/BOUTALLION LOGO ARTWORK_RGB-23.png',
    alt: 'Frame 3',
    frameNumber: 6,
    videoStartOffset: 7,
  },
  {
    id: 'frame-4',
    type: 'image',
    src: '/green%20frame%20background.png',
    alt: 'Founder frame',
    label: 'FOUNDER',
    href: '/lab/corridor/the-founder',
    frameNumber: 7,
  },
  {
    id: 'frame-5',
    type: 'image',
    src: '/image-5.png',
    alt: 'Frame 5 - image 5',
    frameNumber: 8,
  },
  {
    id: 'frame-6',
    type: 'video',
    src: '/videos/video2.mp4',
    poster: '/logo.png',
    alt: 'Frame 6',
    frameNumber: 9,
    videoStartOffset: 14,
  },
  {
    id: 'frame-7',
    type: 'image',
    src: '/green%20frame%20background.png',
    alt: 'Craftsmanship frame',
    label: 'CRAFTSMANSHIP',
    href: '/lab/corridor/craftsmanship',
    frameNumber: 10,
  },
  {
    id: 'frame-8',
    type: 'image',
    src: '/image-7.png',
    alt: 'Frame 8 - image 7',
    frameNumber: 11,
  },
]

// Row 2: Right-to-left (numbered frames)
export const row2Items: RowItem[] = [
  {
    id: 'frame-9',
    type: 'image',
    src: '/image-8.png',
    alt: 'Frame 9 - image 8',
    frameNumber: 12,
  },
  {
    id: 'frame-10',
    type: 'video',
    src: '/videos/video1.mp4',
    poster: '/BOUTALLION LOGO ARTWORK_RGB-23.png',
    alt: 'Frame 10',
    frameNumber: 13,
    videoStartOffset: 5,
  },
  {
    id: 'frame-11',
    type: 'image',
    src: '/image-9.png',
    alt: 'Frame 11 - image 9',
    frameNumber: 14,
  },
  {
    id: 'frame-12',
    type: 'image',
    src: '/image-10.png',
    alt: 'Frame 12 - image 10',
    frameNumber: 15,
  },
  {
    id: 'frame-13',
    type: 'video',
    src: '/videos/video2.mp4',
    poster: '/logo.png',
    alt: 'Frame 13',
    frameNumber: 16,
    videoStartOffset: 11,
  },
  {
    id: 'frame-14',
    type: 'image',
    src: '/image-11.png',
    alt: 'Frame 14 - image 11',
    frameNumber: 17,
  },
  {
    id: 'frame-15',
    type: 'image',
    src: '/image-12.png',
    alt: 'Frame 15 - image 12',
    frameNumber: 18,
  },
  {
    id: 'frame-16',
    type: 'image',
    src: '/image-13.png',
    alt: 'Frame 16 - image 13',
    frameNumber: 19,
  },
  {
    id: 'frame-17',
    type: 'image',
    src: '/image-14.png',
    alt: 'Frame 17 - image 14',
    frameNumber: 20,
  },
  {
    id: 'frame-18',
    type: 'image',
    src: '/image-15.png',
    alt: 'Frame 18 - image 15',
    frameNumber: 21,
  },
  {
    id: 'frame-19',
    type: 'image',
    src: '/image-16.png',
    alt: 'Frame 19 - image 16',
    frameNumber: 22,
  },
  {
    id: 'frame-20',
    type: 'image',
    src: '/image-17.png',
    alt: 'Frame 20 - image 17',
    frameNumber: 23,
  },
  {
    id: 'frame-21',
    type: 'image',
    src: '/image-18.png',
    alt: 'Frame 21 - image 18',
    frameNumber: 24,
  },
]


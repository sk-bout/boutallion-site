export type RowItem = {
  id: string
  type: 'image' | 'video' | 'topic'
  src?: string
  poster?: string
  alt?: string
  label?: string
  href?: string
  frameNumber?: number
}

// Row 1: Left-to-right (numbered frames)
export const row1Items: RowItem[] = [
  {
    id: 'frame-1',
    type: 'topic',
    label: 'ABOUT',
    href: '/lab/corridor/about',
    frameNumber: 1,
  },
  {
    id: 'frame-2',
    type: 'image',
    src: '/logo.png',
    alt: 'Frame 2',
    frameNumber: 2,
  },
  {
    id: 'frame-3',
    type: 'video',
    src: '/videos/video1.mp4',
    poster: '/BOUTALLION LOGO ARTWORK_RGB-23.png',
    alt: 'Frame 3',
    frameNumber: 3,
  },
  {
    id: 'frame-4',
    type: 'image',
    src: '/BOUTALLION LOGO ARTWORK_RGB-23.png',
    alt: 'Frame 4',
    frameNumber: 4,
  },
  {
    id: 'frame-5',
    type: 'image',
    src: '/logo.png',
    alt: 'Frame 5',
    frameNumber: 5,
  },
  {
    id: 'frame-6',
    type: 'video',
    src: '/videos/video2.mp4',
    poster: '/logo.png',
    alt: 'Frame 6',
    frameNumber: 6,
  },
  {
    id: 'frame-7',
    type: 'image',
    src: '/BOUTALLION LOGO ARTWORK_RGB-23.png',
    alt: 'Frame 7',
    frameNumber: 7,
  },
  {
    id: 'frame-8',
    type: 'image',
    src: '/logo.png',
    alt: 'Frame 8',
    frameNumber: 8,
  },
]

// Row 2: Right-to-left (numbered frames)
export const row2Items: RowItem[] = [
  {
    id: 'frame-9',
    type: 'image',
    src: '/logo.png',
    alt: 'Frame 9',
    frameNumber: 9,
  },
  {
    id: 'frame-10',
    type: 'video',
    src: '/videos/video1.mp4',
    poster: '/BOUTALLION LOGO ARTWORK_RGB-23.png',
    alt: 'Frame 10',
    frameNumber: 10,
  },
  {
    id: 'frame-11',
    type: 'image',
    src: '/BOUTALLION LOGO ARTWORK_RGB-23.png',
    alt: 'Frame 11',
    frameNumber: 11,
  },
  {
    id: 'frame-12',
    type: 'image',
    src: '/logo.png',
    alt: 'Frame 12',
    frameNumber: 12,
  },
  {
    id: 'frame-13',
    type: 'video',
    src: '/videos/video2.mp4',
    poster: '/logo.png',
    alt: 'Frame 13',
    frameNumber: 13,
  },
  {
    id: 'frame-14',
    type: 'image',
    src: '/BOUTALLION LOGO ARTWORK_RGB-23.png',
    alt: 'Frame 14',
    frameNumber: 14,
  },
  {
    id: 'frame-15',
    type: 'image',
    src: '/logo.png',
    alt: 'Frame 15',
    frameNumber: 15,
  },
  {
    id: 'frame-16',
    type: 'image',
    src: '/BOUTALLION LOGO ARTWORK_RGB-23.png',
    alt: 'Frame 16',
    frameNumber: 16,
  },
]


import { Metadata } from 'next'
import LabCorridorHeader from '@/components/LabCorridorHeader'

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
  other: {
    'robots': 'noindex, nofollow',
  },
}

export default function CorridorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <LabCorridorHeader />
      {children}
    </>
  )
}


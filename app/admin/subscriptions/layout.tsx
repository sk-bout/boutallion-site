import { Metadata } from 'next'

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
}

export default function SubscriptionsAdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}


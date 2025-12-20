import { redirect } from 'next/navigation'

export default function RootPage() {
  // This will be handled by middleware, but as a fallback redirect to English
  redirect('/en')
}

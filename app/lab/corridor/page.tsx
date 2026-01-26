'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Corridor from './Corridor'

function CorridorContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    // Use a default key for client-side check
    // In production, set NEXT_PUBLIC_LAB_PAGE_KEY in env
    const labKey = process.env.NEXT_PUBLIC_LAB_PAGE_KEY || 'dev-key-2024'
    const key = searchParams.get('key')

    if (!key || key !== labKey) {
      router.replace('/')
      return
    }
    
    setIsAuthorized(true)
    setIsChecking(false)
  }, [searchParams, router])

  if (isChecking) {
    return (
      <div className="fixed inset-0 bg-boutallion-green flex items-center justify-center">
        <p className="font-refined text-white/40 text-sm">Loading...</p>
      </div>
    )
  }

  if (!isAuthorized) {
    return null
  }

  return <Corridor />
}

export default function CorridorPage() {
  return (
    <Suspense fallback={
      <div className="fixed inset-0 bg-boutallion-green flex items-center justify-center">
        <p className="font-refined text-white/40 text-sm">Loading...</p>
      </div>
    }>
      <CorridorContent />
    </Suspense>
  )
}


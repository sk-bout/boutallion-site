'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import CollectionPage from '@/components/collections/CollectionPage'
import { LenisProvider } from '@/components/LenisProvider'

export default function CollectionDetailPage() {
  const params = useParams()
  const router = useRouter()
  const collectionId = params?.collectionId as string

  return (
    <LenisProvider>
      <main className="fixed inset-0 overflow-hidden">
        <CollectionPage collectionId={collectionId} router={router} />
      </main>
    </LenisProvider>
  )
}




'use client'

import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Fix for default marker icons in Next.js
if (typeof window !== 'undefined') {
  delete (L.Icon.Default.prototype as any)._getIconUrl
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  })
}

interface SubscriptionLocation {
  id: number
  email: string
  latitude: number
  longitude: number
  city?: string
  country?: string
  region?: string
  created_at: string
  location_string?: string
}

interface SubscriptionsMapProps {
  height?: string
  showEmail?: boolean
}

export default function SubscriptionsMap({ height = '600px', showEmail = false }: SubscriptionsMapProps) {
  const [subscriptions, setSubscriptions] = useState<SubscriptionLocation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [center, setCenter] = useState<[number, number]>([20, 0]) // Default center (world map)
  const [zoom, setZoom] = useState(2)

  useEffect(() => {
    fetchSubscriptions()
  }, [])

  const fetchSubscriptions = async () => {
    try {
      const response = await fetch('/api/subscriptions/map')
      if (!response.ok) {
        throw new Error('Failed to fetch subscriptions')
      }
      const data = await response.json()
      
      if (data.subscriptions && data.subscriptions.length > 0) {
        setSubscriptions(data.subscriptions)
        
        // Calculate center based on average of all locations
        const validLocations = data.subscriptions.filter((s: SubscriptionLocation) => 
          s.latitude && s.longitude
        )
        
        if (validLocations.length > 0) {
          const avgLat = validLocations.reduce((sum: number, s: SubscriptionLocation) => sum + s.latitude, 0) / validLocations.length
          const avgLon = validLocations.reduce((sum: number, s: SubscriptionLocation) => sum + s.longitude, 0) / validLocations.length
          setCenter([avgLat, avgLon])
          setZoom(validLocations.length === 1 ? 10 : 3)
        }
      }
      setLoading(false)
    } catch (err) {
      console.error('Error fetching subscriptions:', err)
      setError(err instanceof Error ? err.message : 'Failed to load subscriptions')
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center" style={{ height }}>
        <div className="text-white/60">Loading map...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center" style={{ height }}>
        <div className="text-red-400">Error: {error}</div>
      </div>
    )
  }

  if (subscriptions.length === 0) {
    return (
      <div className="flex items-center justify-center" style={{ height }}>
        <div className="text-white/60">No subscriptions with location data yet</div>
      </div>
    )
  }

  return (
    <div style={{ height, width: '100%' }} className="rounded-lg overflow-hidden">
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {subscriptions.map((subscription) => {
          if (!subscription.latitude || !subscription.longitude) return null
          
          return (
            <CircleMarker
              key={subscription.id}
              center={[subscription.latitude, subscription.longitude]}
              radius={8}
              pathOptions={{
                color: '#d4c5a0',
                fillColor: '#d4c5a0',
                fillOpacity: 0.6,
                weight: 2,
              }}
            >
              <Popup>
                <div className="text-sm space-y-1">
                  {showEmail && (
                    <div className="font-semibold text-gray-900">{subscription.email}</div>
                  )}
                  <div className="text-gray-700">
                    {subscription.location_string || 
                     `${subscription.city || ''}${subscription.city && subscription.region ? ', ' : ''}${subscription.region || ''}${(subscription.city || subscription.region) && subscription.country ? ', ' : ''}${subscription.country || ''}` ||
                     'Unknown location'}
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(subscription.created_at).toLocaleDateString()}
                  </div>
                </div>
              </Popup>
            </CircleMarker>
          )
        })}
      </MapContainer>
    </div>
  )
}


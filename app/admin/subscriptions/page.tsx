'use client'

import { useEffect, useState } from 'react'
import SubscriptionsMap from '@/components/SubscriptionsMap'
import dynamic from 'next/dynamic'

// Dynamically import map to avoid SSR issues
const MapComponent = dynamic(() => import('@/components/SubscriptionsMap'), {
  ssr: false,
  loading: () => <div className="flex items-center justify-center h-[600px] text-white/60">Loading map...</div>
})

interface Subscription {
  id: number
  email: string
  country?: string
  city?: string
  region?: string
  location_string?: string
  created_at: string
  latitude?: number
  longitude?: number
}

export default function SubscriptionsAdminPage() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    country: '',
    city: '',
    email: '',
  })
  const [stats, setStats] = useState({
    total: 0,
    byCountry: {} as Record<string, number>,
    byCity: {} as Record<string, number>,
  })

  useEffect(() => {
    fetchSubscriptions()
  }, [])

  const fetchSubscriptions = async () => {
    try {
      const params = new URLSearchParams()
      if (filters.country) params.append('country', filters.country)
      if (filters.city) params.append('city', filters.city)
      if (filters.email) params.append('email', filters.email)

      const response = await fetch(`/api/subscriptions?${params.toString()}`)
      const data = await response.json()
      
      if (data.success) {
        setSubscriptions(data.subscriptions || [])
        setStats({
          total: data.total || 0,
          byCountry: calculateStats(data.subscriptions || [], 'country'),
          byCity: calculateStats(data.subscriptions || [], 'city'),
        })
      }
      setLoading(false)
    } catch (error) {
      console.error('Error fetching subscriptions:', error)
      setLoading(false)
    }
  }

  const calculateStats = (subs: Subscription[], field: 'country' | 'city') => {
    const stats: Record<string, number> = {}
    subs.forEach(sub => {
      const value = sub[field]
      if (value) {
        stats[value] = (stats[value] || 0) + 1
      }
    })
    return stats
  }

  const handleFilterChange = (field: string, value: string) => {
    setFilters(prev => ({ ...prev, [field]: value }))
  }

  const handleSearch = () => {
    fetchSubscriptions()
  }

  const exportCSV = () => {
    const headers = ['Email', 'Country', 'City', 'Region', 'Location', 'Date']
    const rows = subscriptions.map(sub => [
      sub.email,
      sub.country || '',
      sub.city || '',
      sub.region || '',
      sub.location_string || '',
      new Date(sub.created_at).toLocaleDateString(),
    ])
    
    const csv = [headers, ...rows].map(row => row.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `subscriptions-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-boutallion-green p-8">
        <div className="text-white/60">Loading subscriptions...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-boutallion-green p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-portrait text-gold-DEFAULT mb-2">Subscriptions Dashboard</h1>
          <p className="text-white/60">Total: {stats.total} subscriptions</p>
        </div>

        {/* Filters */}
        <div className="bg-black/20 p-6 rounded-lg space-y-4">
          <h2 className="text-xl text-gold-DEFAULT mb-4">Filters</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-white/60 text-sm mb-2">Country</label>
              <input
                type="text"
                value={filters.country}
                onChange={(e) => handleFilterChange('country', e.target.value)}
                className="w-full bg-black/30 border border-white/20 text-white px-4 py-2 rounded"
                placeholder="Filter by country"
              />
            </div>
            <div>
              <label className="block text-white/60 text-sm mb-2">City</label>
              <input
                type="text"
                value={filters.city}
                onChange={(e) => handleFilterChange('city', e.target.value)}
                className="w-full bg-black/30 border border-white/20 text-white px-4 py-2 rounded"
                placeholder="Filter by city"
              />
            </div>
            <div>
              <label className="block text-white/60 text-sm mb-2">Email</label>
              <input
                type="text"
                value={filters.email}
                onChange={(e) => handleFilterChange('email', e.target.value)}
                className="w-full bg-black/30 border border-white/20 text-white px-4 py-2 rounded"
                placeholder="Search email"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <button
              onClick={handleSearch}
              className="px-6 py-2 bg-gold-DEFAULT text-boutallion-green rounded hover:bg-gold-light transition-colors"
            >
              Search
            </button>
            <button
              onClick={exportCSV}
              className="px-6 py-2 bg-white/10 text-white rounded hover:bg-white/20 transition-colors"
            >
              Export CSV
            </button>
          </div>
        </div>

        {/* Map */}
        <div className="bg-black/20 p-6 rounded-lg">
          <h2 className="text-xl text-gold-DEFAULT mb-4">Live Map</h2>
          <MapComponent height="600px" showEmail={true} />
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-black/20 p-6 rounded-lg">
            <h2 className="text-xl text-gold-DEFAULT mb-4">By Country</h2>
            <div className="space-y-2">
              {Object.entries(stats.byCountry)
                .sort(([, a], [, b]) => b - a)
                .slice(0, 10)
                .map(([country, count]) => (
                  <div key={country} className="flex justify-between text-white/80">
                    <span>{country}</span>
                    <span className="text-gold-DEFAULT">{count}</span>
                  </div>
                ))}
            </div>
          </div>
          <div className="bg-black/20 p-6 rounded-lg">
            <h2 className="text-xl text-gold-DEFAULT mb-4">By City</h2>
            <div className="space-y-2">
              {Object.entries(stats.byCity)
                .sort(([, a], [, b]) => b - a)
                .slice(0, 10)
                .map(([city, count]) => (
                  <div key={city} className="flex justify-between text-white/80">
                    <span>{city}</span>
                    <span className="text-gold-DEFAULT">{count}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Subscriptions List */}
        <div className="bg-black/20 p-6 rounded-lg">
          <h2 className="text-xl text-gold-DEFAULT mb-4">Subscriptions ({subscriptions.length})</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="pb-2 text-white/60">Email</th>
                  <th className="pb-2 text-white/60">Location</th>
                  <th className="pb-2 text-white/60">Date</th>
                </tr>
              </thead>
              <tbody>
                {subscriptions.map((sub) => (
                  <tr key={sub.id} className="border-b border-white/10">
                    <td className="py-2 text-white/80">{sub.email}</td>
                    <td className="py-2 text-white/60">
                      {sub.location_string || `${sub.city || ''}${sub.city && sub.region ? ', ' : ''}${sub.region || ''}${(sub.city || sub.region) && sub.country ? ', ' : ''}${sub.country || ''}` || 'Unknown'}
                    </td>
                    <td className="py-2 text-white/60">
                      {new Date(sub.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}


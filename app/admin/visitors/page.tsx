'use client'

import { useEffect, useState } from 'react'
import { getMapUrl } from '@/lib/visitor-tracking'

interface Visitor {
  id: number
  session_id: string
  ip_address: string
  country?: string
  country_code?: string
  city?: string
  region?: string
  latitude?: number
  longitude?: number
  timezone?: string
  device_type: string
  browser: string
  os: string
  screen_resolution: string
  pages_visited: string[]
  visit_count: number
  uae_time: string
  first_visit: string
  last_visit: string
  user_agent?: string
  referer?: string
}

interface IPLabel {
  id: number
  ip_address: string
  label: string
  notes?: string
}

export default function VisitorsAdminPage() {
  const [visitors, setVisitors] = useState<Visitor[]>([])
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)
  const [labels, setLabels] = useState<Record<string, string>>({})
  const [editingIP, setEditingIP] = useState<string | null>(null)
  const [newLabel, setNewLabel] = useState('')

  useEffect(() => {
    fetchVisitors()
    fetchLabels()
  }, [])

  const fetchLabels = async () => {
    try {
      const response = await fetch('/api/ip-labels')
      const data = await response.json()
      if (data.success) {
        const labelsMap: Record<string, string> = {}
        data.labels.forEach((label: IPLabel) => {
          labelsMap[label.ip_address] = label.label
        })
        setLabels(labelsMap)
      }
    } catch (error) {
      console.error('Error fetching labels:', error)
    }
  }

  const handleSetLabel = async (ipAddress: string, label: string) => {
    try {
      const response = await fetch('/api/ip-labels', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ipAddress, label }),
      })
      const data = await response.json()
      if (data.success) {
        setLabels(prev => ({ ...prev, [ipAddress]: label }))
        setEditingIP(null)
        setNewLabel('')
      }
    } catch (error) {
      console.error('Error setting label:', error)
    }
  }

  const fetchVisitors = async () => {
    try {
      const response = await fetch('/api/visitors')
      const data = await response.json()
      
      if (data.success) {
        setVisitors(data.visitors || [])
        setTotal(data.total || 0)
      }
      setLoading(false)
    } catch (error) {
      console.error('Error fetching visitors:', error)
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-boutallion-green p-8">
        <div className="text-white text-center">Loading visitors...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-boutallion-green p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">Visitor Analytics</h1>
        
        <div className="bg-white/10 rounded-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white/5 rounded p-4">
              <div className="text-white/60 text-sm">Total Visitors</div>
              <div className="text-2xl font-bold text-white">{total}</div>
            </div>
            <div className="bg-white/5 rounded p-4">
              <div className="text-white/60 text-sm">Unique IPs</div>
              <div className="text-2xl font-bold text-white">
                {new Set(visitors.map(v => v.ip_address)).size}
              </div>
            </div>
            <div className="bg-white/5 rounded p-4">
              <div className="text-white/60 text-sm">Countries</div>
              <div className="text-2xl font-bold text-white">
                {new Set(visitors.filter(v => v.country).map(v => v.country)).size}
              </div>
            </div>
            <div className="bg-white/5 rounded p-4">
              <div className="text-white/60 text-sm">Avg Visits</div>
              <div className="text-2xl font-bold text-white">
                {visitors.length > 0 
                  ? (visitors.reduce((sum, v) => sum + v.visit_count, 0) / visitors.length).toFixed(1)
                  : '0'}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/10 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-white">
              <thead className="bg-white/10">
                <tr>
                  <th className="p-4 text-left">IP Address</th>
                  <th className="p-4 text-left">Location</th>
                  <th className="p-4 text-left">Device</th>
                  <th className="p-4 text-left">Pages</th>
                  <th className="p-4 text-left">Visits</th>
                  <th className="p-4 text-left">UAE Time</th>
                  <th className="p-4 text-left">Map</th>
                </tr>
              </thead>
              <tbody>
                {visitors.map((visitor) => (
                  <tr key={visitor.id} className="border-t border-white/10">
                    <td className="p-4">
                      <div className="font-mono text-sm">{visitor.ip_address}</div>
                      {labels[visitor.ip_address] && (
                        <div className="text-xs text-blue-400 mt-1">🏷️ {labels[visitor.ip_address]}</div>
                      )}
                      {editingIP === visitor.ip_address ? (
                        <div className="mt-2 flex gap-2">
                          <input
                            type="text"
                            value={newLabel}
                            onChange={(e) => setNewLabel(e.target.value)}
                            placeholder="Enter label"
                            className="px-2 py-1 text-sm bg-white/10 text-white rounded border border-white/20"
                            autoFocus
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                handleSetLabel(visitor.ip_address, newLabel)
                              } else if (e.key === 'Escape') {
                                setEditingIP(null)
                                setNewLabel('')
                              }
                            }}
                          />
                          <button
                            onClick={() => handleSetLabel(visitor.ip_address, newLabel)}
                            className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => {
                              setEditingIP(null)
                              setNewLabel('')
                            }}
                            className="px-3 py-1 text-xs bg-white/10 text-white rounded hover:bg-white/20"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            setEditingIP(visitor.ip_address)
                            setNewLabel(labels[visitor.ip_address] || '')
                          }}
                          className="mt-1 text-xs text-white/60 hover:text-white underline"
                        >
                          {labels[visitor.ip_address] ? 'Edit label' : 'Add label'}
                        </button>
                      )}
                    </td>
                    <td className="p-4">
                      {visitor.city && visitor.country ? (
                        <div>
                          <div className="font-semibold">{visitor.city}</div>
                          <div className="text-white/60 text-sm">
                            {visitor.region && `${visitor.region}, `}
                            {visitor.country}
                          </div>
                        </div>
                      ) : (
                        <span className="text-white/60">Unknown</span>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="text-sm">
                        <div>{visitor.device_type} • {visitor.browser}</div>
                        <div className="text-white/60">{visitor.os}</div>
                        <div className="text-white/60 text-xs">{visitor.screen_resolution}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm">
                        <div className="font-semibold">{visitor.pages_visited?.length || 0} pages</div>
                        {visitor.pages_visited && visitor.pages_visited.length > 0 && (
                          <div className="text-white/60 text-xs mt-1">
                            {visitor.pages_visited.slice(0, 2).map((page, i) => (
                              <div key={i} className="truncate max-w-xs">{page}</div>
                            ))}
                            {visitor.pages_visited.length > 2 && (
                              <div className="text-white/40">+{visitor.pages_visited.length - 2} more</div>
                            )}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="font-semibold">{visitor.visit_count}</div>
                      <div className="text-white/60 text-xs">
                        First: {new Date(visitor.first_visit).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="p-4 text-sm">
                      <div>{visitor.uae_time}</div>
                      <div className="text-white/60 text-xs">
                        {new Date(visitor.last_visit).toLocaleString()}
                      </div>
                    </td>
                    <td className="p-4">
                      {visitor.latitude && visitor.longitude ? (
                        <a
                          href={getMapUrl(visitor.latitude, visitor.longitude) || '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 underline"
                        >
                          View Map
                        </a>
                      ) : (
                        <span className="text-white/40">N/A</span>
                      )}
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


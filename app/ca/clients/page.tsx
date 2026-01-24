'use client'

import { useState, useEffect } from 'react'
import { Search, Phone, Mail, FileText, Calendar, MoreVertical, Loader2 } from 'lucide-react'
import { Card, CardContent, Button, Input } from '@/components/ui'

interface Client {
  id: string
  name: string
  email: string
  phone?: string
  itrFilings: any[]
  gstFilings: any[]
}

interface ClientStats {
  totalClients: number
  activeFilings: number
  completedFilings: number
  pendingDocuments: number
}

export default function ClientsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [clients, setClients] = useState<Client[]>([])
  const [stats, setStats] = useState<ClientStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchClients()
  }, [])

  const fetchClients = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/ca/clients')
      if (!response.ok) throw new Error('Failed to fetch clients')
      const data = await response.json()
      setClients(data.clients || [])
      setStats(data.stats || null)
    } catch (error) {
      console.error('Error fetching clients:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredClients = clients.filter((client) =>
    client.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.email?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#1E3A8A]" />
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Clients</h1>
          <p className="text-gray-600">Manage your client portfolio</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">Total Clients</p>
            <p className="text-2xl font-bold text-gray-900">{stats?.totalClients || 0}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">Active Filings</p>
            <p className="text-2xl font-bold text-blue-600">
              {stats?.activeFilings || 0}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">Completed</p>
            <p className="text-2xl font-bold text-green-600">
              {stats?.completedFilings || 0}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">Pending Docs</p>
            <p className="text-2xl font-bold text-orange-600">{stats?.pendingDocuments || 0}</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Clients Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredClients.map((client) => {
          const activeFilings = client.itrFilings?.filter(f => 
            !['COMPLETED', 'REJECTED', 'FILED'].includes(f.status)
          ).length || 0
          const completedFilings = client.itrFilings?.filter(f => 
            ['COMPLETED', 'FILED'].includes(f.status)
          ).length || 0
          
          return (
            <Card key={client.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                      <span className="text-lg font-semibold text-teal-700">
                        {client.name?.split(' ').map(n => n[0]).join('') || '?'}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{client.name}</h3>
                      <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full">
                        Active
                      </span>
                    </div>
                  </div>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <MoreVertical className="w-5 h-5 text-gray-400" />
                  </button>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span className="truncate">{client.email}</span>
                  </div>
                  {client.phone && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="w-4 h-4" />
                      <span>{client.phone}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FileText className="w-4 h-4" />
                    <span>Filings: {client.itrFilings?.length || 0}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="text-center">
                    <p className="text-lg font-semibold text-blue-600">{activeFilings}</p>
                    <p className="text-xs text-gray-600">Active</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-semibold text-green-600">{completedFilings}</p>
                    <p className="text-xs text-gray-600">Completed</p>
                  </div>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { 
  Search, UserCheck, CheckCircle, XCircle, Clock, 
  Award, Star, Eye, Mail, Phone, FileText, Download
} from 'lucide-react'
import { Button, Card, CardContent } from '@/components/ui'

interface CAExpert {
  id: string
  name: string
  email: string
  phone: string | null
  role: string
  emailVerified: Date | null
  createdAt: Date
}

export default function CAExpertsPage() {
  const [experts, setExperts] = useState<CAExpert[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    avgRating: 0
  })

  const [filter, setFilter] = useState<'ALL' | 'PENDING' | 'APPROVED'>('ALL')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchExperts = async () => {
      setLoading(true)
      try {
        const params = new URLSearchParams()
        if (filter !== 'ALL') params.append('status', filter)
        if (searchTerm) params.append('search', searchTerm)

        const response = await fetch(`/api/admin/ca-experts?${params}`)
        const data = await response.json()
        
        if (data.success) {
          setExperts(data.caExperts)
          setStats(data.stats)
        }
      } catch (error) {
        console.error('Failed to fetch CA experts:', error)
      } finally {
        setLoading(false)
      }
    }

    const debounce = setTimeout(() => {
      fetchExperts()
    }, 300)

    return () => clearTimeout(debounce)
  }, [filter, searchTerm])

  const getStatusBadge = (emailVerified: Date | null) => {
    if (emailVerified) {
      return (
        <span className="px-2.5 py-1 rounded-full text-xs font-medium border bg-green-100 text-green-700 border-green-200">
          APPROVED
        </span>
      )
    }
    return (
      <span className="px-2.5 py-1 rounded-full text-xs font-medium border bg-yellow-100 text-yellow-700 border-yellow-200">
        PENDING
      </span>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">CA Expert Management</h1>
          <p className="text-gray-600">{stats.total} registered CA experts</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">Total Experts</p>
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">Approved</p>
            <p className="text-2xl font-bold text-green-600">
              {stats.approved}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">Pending</p>
            <p className="text-2xl font-bold text-yellow-600">
              {stats.pending}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">Average Rating</p>
            <p className="text-2xl font-bold text-purple-600">
              {stats.avgRating.toFixed(1)} ⭐
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 outline-none"
              />
            </div>
            <div className="flex gap-2">
              {(['ALL', 'PENDING', 'APPROVED'] as const).map((status) => (
                <Button
                  key={status}
                  variant={filter === status ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setFilter(status)}
                >
                  {status}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CA Experts List */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
        </div>
      ) : (
        <div className="space-y-4">
          {experts.map((expert) => (
            <Card key={expert.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex gap-4 flex-1">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                      {expert.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{expert.name}</h3>
                        {getStatusBadge(expert.emailVerified)}
                      </div>
                      <div className="grid md:grid-cols-2 gap-3 text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          {expert.email}
                        </div>
                        {expert.phone && (
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4" />
                            {expert.phone}
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          Joined {new Date(expert.createdAt).toLocaleDateString('en-IN')}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    {!expert.emailVerified && (
                      <>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Approve
                        </Button>
                        <Button variant="outline" size="sm" className="border-red-600 text-red-600 hover:bg-red-50">
                          <XCircle className="w-4 h-4 mr-2" />
                          Reject
                        </Button>
                      </>
                    )}
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

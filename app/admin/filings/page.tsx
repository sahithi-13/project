'use client'

import { useState, useEffect } from 'react'
import { FileText, Search, Filter, Eye, Download, Clock, CheckCircle, XCircle } from 'lucide-react'
import { Button, Card, CardContent } from '@/components/ui'

interface Filing {
  id: string
  type: 'ITR' | 'GST'
  userName: string
  userEmail: string
  status: string
  assessmentYear?: string
  gstin?: string
  createdAt: string
  updatedAt: string
}

export default function FilingsPage() {
  const [filings, setFilings] = useState<Filing[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    total: 0,
    itr: 0,
    gst: 0,
    today: 0
  })

  const [typeFilter, setTypeFilter] = useState<'ALL' | 'ITR' | 'GST'>('ALL')
  const [statusFilter, setStatusFilter] = useState('ALL')

  useEffect(() => {
    const fetchFilings = async () => {
      setLoading(true)
      try {
        const params = new URLSearchParams()
        if (typeFilter !== 'ALL') params.append('type', typeFilter)
        if (statusFilter !== 'ALL') params.append('status', statusFilter)

        const response = await fetch(`/api/admin/filings?${params}`)
        const data = await response.json()
        
        if (data.success) {
          setFilings(data.filings)
          setStats(data.stats)
        }
      } catch (error) {
        console.error('Failed to fetch filings:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchFilings()
  }, [typeFilter, statusFilter])

  const getStatusBadge = (status: string) => {
    const styles: any = {
      DRAFT: 'bg-gray-100 text-gray-700',
      UNDER_REVIEW: 'bg-yellow-100 text-yellow-700',
      FILED: 'bg-green-100 text-green-700',
      REJECTED: 'bg-red-100 text-red-700',
    }
    return (
      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${styles[status] || styles.DRAFT}`}>
        {status.replace('_', ' ')}
      </span>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Filing Management</h1>
        <p className="text-gray-600">Monitor all ITR and GST filings</p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">Total Filings</p>
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">ITR Filings</p>
            <p className="text-2xl font-bold text-blue-600">{stats.itr}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">GST Filings</p>
            <p className="text-2xl font-bold text-green-600">{stats.gst}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">Filed Today</p>
            <p className="text-2xl font-bold text-purple-600">{stats.today}</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="ALL">All Types</option>
              <option value="ITR">ITR</option>
              <option value="GST">GST</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="ALL">All Status</option>
              <option value="DRAFT">Draft</option>
              <option value="UNDER_REVIEW">Under Review</option>
              <option value="FILED">Filed</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Filings Table */}
      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Details</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filings.map((filing) => (
                    <tr key={filing.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{filing.id}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          filing.type === 'ITR' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                        }`}>
                          {filing.type}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-medium text-gray-900">{filing.userName}</p>
                        <p className="text-sm text-gray-500">{filing.userEmail}</p>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {filing.assessmentYear || filing.gstin}
                      </td>
                      <td className="px-6 py-4">{getStatusBadge(filing.status)}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(filing.createdAt).toLocaleDateString('en-IN')}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

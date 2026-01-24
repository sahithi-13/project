'use client'

import { useState, useEffect } from 'react'
import { FileText, Clock, CheckCircle, AlertCircle, Download, Eye } from 'lucide-react'
import { Card, CardContent, Button } from '@/components/ui'

interface Filing {
  id: string
  type: 'ITR' | 'GST'
  userName: string
  userEmail: string
  status: string
  assessmentYear?: string
  gstin?: string
  createdAt: string
}

export default function FilingsPage() {
  const [statusFilter, setStatusFilter] = useState('ALL')
  const [filings, setFilings] = useState<Filing[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    total: 0,
    inProgress: 0,
    review: 0,
    completed: 0,
  })

  useEffect(() => {
    const fetchFilings = async () => {
      setLoading(true)
      try {
        const params = new URLSearchParams()
        if (statusFilter !== 'ALL') params.append('status', statusFilter)

        const response = await fetch(`/api/ca/filings?${params}`)
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
  }, [statusFilter])

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Filing Management</h1>

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
            <p className="text-sm text-gray-600">In Progress</p>
            <p className="text-2xl font-bold text-blue-600">{stats.inProgress}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">Review</p>
            <p className="text-2xl font-bold text-purple-600">{stats.review}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">Completed</p>
            <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {['ALL', 'IN_PROGRESS', 'REVIEW', 'COMPLETED'].map((status) => (
          <Button
            key={status}
            variant={statusFilter === status ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setStatusFilter(status)}
          >
            {status.replace('_', ' ')}
          </Button>
        ))}
      </div>

      {/* Filings Table */}
      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Filing ID</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Details</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filings.map((filing) => (
                    <tr key={filing.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">{filing.id}</td>
                      <td className="px-6 py-4">
                        <p className="font-medium text-gray-900">{filing.userName}</p>
                        <p className="text-sm text-gray-500">{filing.userEmail}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                          filing.type === 'ITR' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                        }`}>
                          {filing.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {filing.assessmentYear || filing.gstin}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                          filing.status === 'FILED' ? 'bg-green-100 text-green-700' :
                          filing.status === 'UNDER_REVIEW' ? 'bg-purple-100 text-purple-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {filing.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {new Date(filing.createdAt).toLocaleDateString('en-IN')}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          {filing.status === 'FILED' && (
                            <Button variant="outline" size="sm">
                              <Download className="w-4 h-4" />
                            </Button>
                          )}
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

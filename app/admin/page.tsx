'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  Users, UserCheck, FileText, CreditCard, TrendingUp, 
  TrendingDown, DollarSign, Activity, ArrowUpRight,
  Clock, CheckCircle, AlertCircle, XCircle
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui'

interface DashboardStats {
  users: {
    total: number
    active: number
    new: number
    growth: number
  }
  caExperts: {
    total: number
    active: number
    pending: number
  }
  filings: {
    total: number
    pending: number
    completed: number
    today: number
  }
  revenue: {
    total: number
    thisMonth: number
    growth: number
    pending: number
  }
}

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<DashboardStats>({
    users: { total: 0, active: 0, new: 0, growth: 0 },
    caExperts: { total: 0, active: 0, pending: 0 },
    filings: { total: 0, pending: 0, completed: 0, today: 0 },
    revenue: { total: 0, thisMonth: 0, growth: 0, pending: 0 },
  })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/admin/stats')
        if (response.ok) {
          const data = await response.json()
          setStats({
            users: {
              total: data.users.total,
              active: data.users.active,
              new: data.users.total - data.users.active,
              growth: parseFloat(data.users.growth),
            },
            caExperts: {
              total: data.caExperts.total,
              active: data.caExperts.total - data.caExperts.pending,
              pending: data.caExperts.pending,
            },
            filings: {
              total: data.filings.total,
              pending: data.filings.pending,
              completed: data.filings.total - data.filings.pending,
              today: data.filings.today,
            },
            revenue: {
              total: data.revenue.total,
              thisMonth: data.revenue.monthly,
              growth: parseFloat(data.revenue.growth),
              pending: 0,
            },
          })
        }
      } catch (error) {
        console.error('Error fetching admin stats:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchStats()
  }, [])

  const formatCurrency = (amount: number) => {
    return `₹${(amount / 100000).toFixed(2)}L`
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600">Platform overview and key metrics</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Users */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <span className={`text-sm font-medium ${stats.users.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {stats.users.growth >= 0 ? '+' : ''}{stats.users.growth}%
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stats.users.total.toLocaleString()}</h3>
            <p className="text-sm text-gray-600 mt-1">Total Users</p>
            <div className="mt-4 flex items-center gap-4 text-xs">
              <span className="text-green-600">
                <Activity className="w-3 h-3 inline mr-1" />
                {stats.users.active} active
              </span>
              <span className="text-blue-600">+{stats.users.new} new</span>
            </div>
          </CardContent>
        </Card>

        {/* CA Experts */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <UserCheck className="w-6 h-6 text-purple-600" />
              </div>
              {stats.caExperts.pending > 0 && (
                <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full">
                  {stats.caExperts.pending} pending
                </span>
              )}
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stats.caExperts.total}</h3>
            <p className="text-sm text-gray-600 mt-1">CA Experts</p>
            <div className="mt-4 text-xs text-gray-600">
              {stats.caExperts.active} active • {stats.caExperts.total - stats.caExperts.active} inactive
            </div>
          </CardContent>
        </Card>

        {/* Filings */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-sm font-medium text-blue-600">
                {stats.filings.today} today
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stats.filings.total.toLocaleString()}</h3>
            <p className="text-sm text-gray-600 mt-1">Total Filings</p>
            <div className="mt-4 flex items-center gap-4 text-xs">
              <span className="text-yellow-600">
                <Clock className="w-3 h-3 inline mr-1" />
                {stats.filings.pending} pending
              </span>
              <span className="text-green-600">
                <CheckCircle className="w-3 h-3 inline mr-1" />
                {stats.filings.completed}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Revenue */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-red-600" />
              </div>
              <span className={`text-sm font-medium ${stats.revenue.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {stats.revenue.growth >= 0 ? <TrendingUp className="w-4 h-4 inline" /> : <TrendingDown className="w-4 h-4 inline" />}
                {stats.revenue.growth}%
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{formatCurrency(stats.revenue.total)}</h3>
            <p className="text-sm text-gray-600 mt-1">Total Revenue</p>
            <div className="mt-4 text-xs">
              <span className="text-green-600">This month: {formatCurrency(stats.revenue.thisMonth)}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/admin/users">
            <Card className="hover:shadow-md transition-all hover:border-blue-500 cursor-pointer">
              <CardContent className="p-4 text-center">
                <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="font-medium text-gray-900">Manage Users</p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/admin/ca-experts">
            <Card className="hover:shadow-md transition-all hover:border-purple-500 cursor-pointer">
              <CardContent className="p-4 text-center">
                <UserCheck className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <p className="font-medium text-gray-900">Approve CAs</p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/admin/filings">
            <Card className="hover:shadow-md transition-all hover:border-green-500 cursor-pointer">
              <CardContent className="p-4 text-center">
                <FileText className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="font-medium text-gray-900">View Filings</p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/admin/tickets">
            <Card className="hover:shadow-md transition-all hover:border-orange-500 cursor-pointer">
              <CardContent className="p-4 text-center">
                <AlertCircle className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <p className="font-medium text-gray-900">Support Tickets</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Users</h3>
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                      U{i}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">User Name {i}</p>
                      <p className="text-xs text-gray-500">user{i}@example.com</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">2h ago</span>
                </div>
              ))}
            </div>
            <Link href="/admin/users" className="block mt-4 text-center text-sm text-red-600 hover:underline">
              View All Users →
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Pending Approvals</h3>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                      CA
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">CA Application #{i}</p>
                      <p className="text-xs text-gray-500">Waiting for review</p>
                    </div>
                  </div>
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full">
                    Pending
                  </span>
                </div>
              ))}
            </div>
            <Link href="/admin/ca-experts" className="block mt-4 text-center text-sm text-red-600 hover:underline">
              Review Applications →
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

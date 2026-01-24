'use client'

import { useState, useEffect } from 'react'
import { Users, FileText, TrendingUp, Clock, Calendar, CheckCircle, AlertCircle } from 'lucide-react'
import { Card, CardContent, Button } from '@/components/ui'
import Link from 'next/link'

export default function CADashboard() {
  const [stats, setStats] = useState({
    clients: 0,
    activeFilings: 0,
    completedFilings: 0,
    monthlyEarnings: 0,
    pendingTasks: 0,
    upcomingAppointments: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/ca/stats')
        const data = await response.json()
        
        if (data.success) {
          setStats({
            clients: data.stats.clients,
            activeFilings: data.stats.activeFilings,
            completedFilings: data.stats.completedFilings,
            monthlyEarnings: data.stats.monthlyEarnings,
            pendingTasks: data.stats.pendingTasks,
            upcomingAppointments: data.stats.upcomingAppointments,
          })
        }
      } catch (error) {
        console.error('Failed to fetch CA stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  const recentFilings = [
    { id: 'ITR-2024-001', client: 'Rajesh Kumar', type: 'ITR-2', status: 'IN_PROGRESS', deadline: '2024-01-30' },
    { id: 'GST-2024-045', client: 'Priya Sharma', type: 'GST-3B', status: 'REVIEW', deadline: '2024-01-25' },
    { id: 'ITR-2024-002', client: 'Amit Patel', type: 'ITR-1', status: 'IN_PROGRESS', deadline: '2024-02-05' },
  ]

  const upcomingAppointments = [
    { id: '1', client: 'Rajesh Kumar', time: '2024-01-22T10:00:00Z', purpose: 'ITR Discussion' },
    { id: '2', client: 'Neha Gupta', time: '2024-01-22T14:30:00Z', purpose: 'GST Query' },
    { id: '3', client: 'Vikram Singh', time: '2024-01-23T11:00:00Z', purpose: 'Tax Planning' },
  ]

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">CA Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's your overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Clients</p>
                <p className="text-3xl font-bold text-gray-900">{stats.clients}</p>
              </div>
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-teal-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Active Filings</p>
                <p className="text-3xl font-bold text-blue-600">{stats.activeFilings}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">This Month</p>
                <p className="text-3xl font-bold text-green-600">₹{(stats.monthlyEarnings / 1000).toFixed(0)}K</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Pending Tasks</p>
                <p className="text-3xl font-bold text-orange-600">{stats.pendingTasks}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-4">
        <Link href="/ca/clients">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <Users className="w-8 h-8 text-teal-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-1">Manage Clients</h3>
              <p className="text-sm text-gray-600">View and manage your client portfolio</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/ca/filings">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <FileText className="w-8 h-8 text-blue-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-1">Active Filings</h3>
              <p className="text-sm text-gray-600">Track and update filing status</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/ca/calendar">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <Calendar className="w-8 h-8 text-purple-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-1">Schedule Meeting</h3>
              <p className="text-sm text-gray-600">Book appointments with clients</p>
            </CardContent>
          </Card>
        </Link>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Filings */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Recent Filings</h2>
              <Link href="/ca/filings">
                <Button variant="outline" size="sm">View All</Button>
              </Link>
            </div>
            <div className="space-y-3">
              {recentFilings.map((filing) => (
                <div key={filing.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium text-gray-900">{filing.client}</p>
                      <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full">
                        {filing.type}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{filing.id}</p>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      filing.status === 'IN_PROGRESS' ? 'bg-yellow-100 text-yellow-700' :
                      filing.status === 'REVIEW' ? 'bg-purple-100 text-purple-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {filing.status.replace('_', ' ')}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">Due: {new Date(filing.deadline).toLocaleDateString('en-IN')}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Appointments */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Upcoming Appointments</h2>
              <Link href="/ca/calendar">
                <Button variant="outline" size="sm">View Calendar</Button>
              </Link>
            </div>
            <div className="space-y-3">
              {upcomingAppointments.map((apt) => (
                <div key={apt.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-5 h-5 text-teal-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{apt.client}</p>
                    <p className="text-sm text-gray-600">{apt.purpose}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(apt.time).toLocaleString('en-IN', { 
                        dateStyle: 'medium', 
                        timeStyle: 'short' 
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

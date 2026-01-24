'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { 
  FileText, Upload, Clock, CheckCircle, AlertCircle, 
  CreditCard, Bell, Settings, LogOut, User, Home, 
  Receipt, TrendingUp, HelpCircle, ChevronRight,
  Plus, Download, Eye, Calendar, BarChart3, Loader2,
  Calculator, MessageSquare, Shield
} from 'lucide-react'
import { Button, Card, CardContent, Badge } from '@/components/ui'
import { useAuth } from '@/contexts'

interface DashboardData {
  stats: {
    totalItrFilings: number
    totalGstFilings: number
    totalDocuments: number
    pendingItr: number
    pendingGst: number
  }
  recentItrFilings: Array<{
    id: string
    assessmentYear: string
    itrType: string
    status: string
    grossIncome: number
    taxPayable: number
    createdAt: string
  }>
  recentGstFilings: Array<{
    id: string
    gstin: string
    returnType: string
    period: string
    status: string
    taxPayable: number
    createdAt: string
  }>
  recentActivity: Array<{
    id: string
    action: string
    description: string
    createdAt: string
  }>
}

const sidebarItems = [
  { icon: Home, label: 'Dashboard', href: '/dashboard', active: true },
  { icon: User, label: 'My Profile', href: '/dashboard/profile' },
  { icon: FileText, label: 'ITR Filing', href: '/dashboard/itr' },
  { icon: Receipt, label: 'GST Services', href: '/dashboard/gst' },
  { icon: Upload, label: 'Documents', href: '/dashboard/documents' },
  { icon: CreditCard, label: 'Payments', href: '/dashboard/payments' },
  { icon: Bell, label: 'Notifications', href: '/dashboard/notifications' },
  { icon: HelpCircle, label: 'Support Tickets', href: '/dashboard/tickets' },
  { icon: TrendingUp, label: 'Tax Calculator', href: '/dashboard/calculator' },
  { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
]

export default function DashboardPage() {
  const router = useRouter()
  const { user, logout } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/dashboard')
      
      if (!response.ok) {
        throw new Error('Failed to fetch dashboard data')
      }
      
      const data = await response.json()
      setDashboardData(data)
    } catch (err) {
      console.error('Dashboard fetch error:', err)
      setError('Failed to load dashboard data')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await logout()
    router.push('/login')
  }

  const getStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
      case 'COMPLETED':
      case 'FILED':
        return 'success'
      case 'DRAFT':
      case 'DOCUMENTS_PENDING':
        return 'warning'
      case 'UNDER_REVIEW':
      case 'PROCESSING':
        return 'info'
      case 'REJECTED':
        return 'danger'
      default:
        return 'default'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status.toUpperCase()) {
      case 'COMPLETED':
      case 'FILED':
        return CheckCircle
      case 'DRAFT':
      case 'DOCUMENTS_PENDING':
      case 'UNDER_REVIEW':
      case 'PROCESSING':
        return Clock
      default:
        return AlertCircle
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount)
  }

  // Calculate totals
  const totalFilings = (dashboardData?.stats.totalItrFilings || 0) + (dashboardData?.stats.totalGstFilings || 0)
  const pendingFilings = (dashboardData?.stats.pendingItr || 0) + (dashboardData?.stats.pendingGst || 0)
  const completedFilings = totalFilings - pendingFilings

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white border-r border-gray-200 fixed left-0 top-0 h-full z-40 transition-all duration-300`}>
        {/* Logo */}
        <div className="h-16 flex items-center px-4 border-b border-gray-200">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">eT</span>
            </div>
            {sidebarOpen && (
              <span className="text-xl font-bold text-[#1E3A8A]">eTaxMentor</span>
            )}
          </Link>
        </div>

        {/* Nav Items */}
        <nav className="p-4 space-y-1">
          {sidebarItems.map((item) => {
            const Icon = item.icon
            const isDisabled = 'disabled' in item ? item.disabled : false
            
            if (isDisabled) {
              return (
                <div
                  key={item.label}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 cursor-not-allowed opacity-50"
                  title="Coming soon"
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {sidebarOpen && <span>{item.label}</span>}
                </div>
              )
            }
            
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  item.active
                    ? 'bg-[#1E3A8A] text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && <span>{item.label}</span>}
              </Link>
            )
          })}
        </nav>

        {/* Logout */}
        <div className="absolute bottom-4 left-0 right-0 px-4">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 w-full text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 ${sidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300`}>
        {/* Top Bar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-30">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-sm text-gray-500">Welcome back, {user?.name || 'User'}!</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full">
              <Bell className="w-5 h-5" />
              {pendingFilings > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              )}
            </button>
            <div className="w-10 h-10 bg-[#1E3A8A] rounded-full flex items-center justify-center text-white font-semibold">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-6">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="w-8 h-8 animate-spin text-[#1E3A8A]" />
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600">
              {error}
            </div>
          ) : (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Total Filings</p>
                        <p className="text-3xl font-bold text-gray-900">{totalFilings}</p>
                      </div>
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <FileText className="w-6 h-6 text-blue-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Pending</p>
                        <p className="text-3xl font-bold text-yellow-600">{pendingFilings}</p>
                      </div>
                      <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                        <Clock className="w-6 h-6 text-yellow-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Completed</p>
                        <p className="text-3xl font-bold text-green-600">{completedFilings}</p>
                      </div>
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Documents</p>
                        <p className="text-3xl font-bold text-[#1E3A8A]">{dashboardData?.stats.totalDocuments || 0}</p>
                      </div>
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                        <Upload className="w-6 h-6 text-purple-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <div className="mb-8">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Link href="/dashboard/itr/new">
                    <Card className="hover:shadow-lg transition-all hover:border-[#1E3A8A] cursor-pointer">
                      <CardContent className="p-4 text-center">
                        <div className="w-12 h-12 bg-[#1E3A8A]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Plus className="w-6 h-6 text-[#1E3A8A]" />
                        </div>
                        <p className="font-medium text-gray-900">New ITR Filing</p>
                      </CardContent>
                    </Card>
                  </Link>
                  <Link href="/dashboard/gst/new">
                    <Card className="hover:shadow-lg transition-all hover:border-[#059669] cursor-pointer">
                      <CardContent className="p-4 text-center">
                        <div className="w-12 h-12 bg-[#059669]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Receipt className="w-6 h-6 text-[#059669]" />
                        </div>
                        <p className="font-medium text-gray-900">New GST Filing</p>
                      </CardContent>
                    </Card>
                  </Link>
                  <Link href="/dashboard/documents">
                    <Card className="hover:shadow-lg transition-all hover:border-[#10B981] cursor-pointer">
                      <CardContent className="p-4 text-center">
                        <div className="w-12 h-12 bg-[#10B981]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Upload className="w-6 h-6 text-[#10B981]" />
                        </div>
                        <p className="font-medium text-gray-900">Upload Documents</p>
                      </CardContent>
                    </Card>
                  </Link>
                  <Link href="/contact">
                    <Card className="hover:shadow-lg transition-all hover:border-[#F59E0B] cursor-pointer">
                      <CardContent className="p-4 text-center">
                        <div className="w-12 h-12 bg-[#F59E0B]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                          <HelpCircle className="w-6 h-6 text-[#F59E0B]" />
                        </div>
                        <p className="font-medium text-gray-900">Get Support</p>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              </div>

              {/* Available Features */}
              <div className="mb-8">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Available Features</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Link href="/dashboard/profile">
                    <Card className="hover:shadow-lg transition-all hover:border-[#1E3A8A] cursor-pointer h-full">
                      <CardContent className="p-5">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <User className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 mb-1">My Profile</h3>
                            <p className="text-sm text-gray-600">Manage your personal information and tax details</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>

                  <Link href="/dashboard/calculator">
                    <Card className="hover:shadow-lg transition-all hover:border-[#10B981] cursor-pointer h-full">
                      <CardContent className="p-5">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Calculator className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 mb-1">Tax Calculator</h3>
                            <p className="text-sm text-gray-600">Calculate Income Tax, GST, and TDS instantly</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>

                  <Link href="/dashboard/payments">
                    <Card className="hover:shadow-lg transition-all hover:border-[#8B5CF6] cursor-pointer h-full">
                      <CardContent className="p-5">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <CreditCard className="w-5 h-5 text-purple-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 mb-1">Payments</h3>
                            <p className="text-sm text-gray-600">View transaction history and download invoices</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>

                  <Link href="/dashboard/tickets">
                    <Card className="hover:shadow-lg transition-all hover:border-[#F59E0B] cursor-pointer h-full">
                      <CardContent className="p-5">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <MessageSquare className="w-5 h-5 text-orange-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 mb-1">Support Tickets</h3>
                            <p className="text-sm text-gray-600">Get help from our expert support team</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>

                  <Link href="/dashboard/notifications">
                    <Card className="hover:shadow-lg transition-all hover:border-[#EF4444] cursor-pointer h-full">
                      <CardContent className="p-5">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Bell className="w-5 h-5 text-red-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 mb-1">Notifications</h3>
                            <p className="text-sm text-gray-600">Stay updated with filing and payment alerts</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>

                  <Link href="/dashboard/settings">
                    <Card className="hover:shadow-lg transition-all hover:border-[#6366F1] cursor-pointer h-full">
                      <CardContent className="p-5">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Shield className="w-5 h-5 text-indigo-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 mb-1">Settings</h3>
                            <p className="text-sm text-gray-600">Configure security, notifications, and preferences</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              </div>

              <div className="grid lg:grid-cols-3 gap-6">
                {/* Recent Filings */}
                <div className="lg:col-span-2">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold text-gray-900">Recent Filings</h2>
                        <Link href="/dashboard/itr" className="text-[#1E3A8A] text-sm hover:underline flex items-center gap-1">
                          View All <ChevronRight className="w-4 h-4" />
                        </Link>
                      </div>

                      {dashboardData?.recentItrFilings && dashboardData.recentItrFilings.length > 0 ? (
                        <div className="space-y-4">
                          {dashboardData.recentItrFilings.map((filing) => {
                            const StatusIcon = getStatusIcon(filing.status)
                            return (
                              <div key={filing.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-4">
                                  <div className="w-10 h-10 bg-[#1E3A8A]/10 rounded-lg flex items-center justify-center">
                                    <FileText className="w-5 h-5 text-[#1E3A8A]" />
                                  </div>
                                  <div>
                                    <p className="font-medium text-gray-900">{filing.itrType} - {filing.assessmentYear}</p>
                                    <p className="text-sm text-gray-500">Filed on {formatDate(filing.createdAt)}</p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-4">
                                  <div className="text-right">
                                    <p className="text-sm text-gray-500">Tax</p>
                                    <p className="font-semibold text-gray-900">{formatCurrency(filing.taxPayable)}</p>
                                  </div>
                                  <Badge variant={getStatusColor(filing.status) as any}>
                                    <StatusIcon className="w-3 h-3 mr-1" />
                                    {filing.status}
                                  </Badge>
                                  <Link href={`/dashboard/itr/${filing.id}`}>
                                    <button className="p-2 hover:bg-gray-200 rounded-lg" title="View">
                                      <Eye className="w-4 h-4 text-gray-500" />
                                    </button>
                                  </Link>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                          <p className="text-gray-500 mb-4">No filings yet</p>
                          <Link href="/dashboard/itr/new">
                            <Button size="sm">
                              <Plus className="w-4 h-4 mr-2" />
                              Create Your First ITR Filing
                            </Button>
                          </Link>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Activity */}
                <div>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold text-gray-900">Recent Activity</h2>
                      </div>

                      {dashboardData?.recentActivity && dashboardData.recentActivity.length > 0 ? (
                        <div className="space-y-4">
                          {dashboardData.recentActivity.slice(0, 5).map((activity) => (
                            <div key={activity.id} className="p-4 bg-gray-50 rounded-lg">
                              <div className="flex items-start gap-3">
                                <Clock className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                                <div>
                                  <p className="font-medium text-gray-900 text-sm">{activity.action}</p>
                                  <p className="text-xs text-gray-600">{activity.description}</p>
                                  <p className="text-xs text-gray-400 mt-1">{formatDate(activity.createdAt)}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <Clock className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                          <p className="text-gray-500 text-sm">No recent activity</p>
                        </div>
                      )}

                      {/* Deadline Reminder */}
                      <div className="mt-6 p-4 bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] rounded-lg text-white">
                        <div className="flex items-center gap-3 mb-2">
                          <Calendar className="w-5 h-5" />
                          <span className="font-semibold">Upcoming Deadline</span>
                        </div>
                        <p className="text-blue-100 text-sm mb-3">
                          ITR filing deadline: July 31, 2026
                        </p>
                        <Link href="/dashboard/itr/new">
                          <Button size="sm" className="bg-white text-[#1E3A8A] hover:bg-gray-100 w-full">
                            File Now
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  )
}
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { 
  LayoutDashboard, Users, UserCheck, FileText, CreditCard, 
  MessageSquare, BarChart3, Settings, LogOut, Menu, X,
  Shield, Bell, Search
} from 'lucide-react'
import { useAuth } from '@/contexts'

const adminNavItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
  { icon: Users, label: 'Users', href: '/admin/users' },
  { icon: UserCheck, label: 'CA Experts', href: '/admin/ca-experts' },
  { icon: FileText, label: 'Filings', href: '/admin/filings' },
  { icon: CreditCard, label: 'Payments', href: '/admin/payments' },
  { icon: MessageSquare, label: 'Tickets', href: '/admin/tickets' },
  { icon: BarChart3, label: 'Reports', href: '/admin/reports' },
  { icon: Settings, label: 'Settings', href: '/admin/settings' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  // Check if user is admin
  if (user && user.role !== 'ADMIN') {
    router.push('/dashboard')
    return null
  }

  const handleLogout = async () => {
    await logout()
    router.push('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-50 h-16">
        <div className="flex items-center justify-between h-full px-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg lg:hidden"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <Link href="/admin" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold text-gray-900">Admin Panel</h1>
                <p className="text-xs text-gray-500">eTaxMentor Control Center</p>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-red-600">Administrator</p>
              </div>
              <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-semibold">
                {user?.name?.charAt(0).toUpperCase() || 'A'}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex pt-16">
        {/* Sidebar */}
        <aside 
          className={`${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 fixed lg:sticky top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-white border-r border-gray-200 transition-transform duration-300 z-40 overflow-y-auto`}
        >
          <nav className="p-4 space-y-1">
            {adminNavItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href || (item.href !== '/admin' && pathname?.startsWith(item.href))
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-red-50 text-red-600 font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              )
            })}

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors mt-4"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </nav>

          <div className="p-4 border-t border-gray-200 mt-4">
            <Link
              href="/dashboard"
              className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-colors"
            >
              <LayoutDashboard className="w-4 h-4" />
              Switch to User View
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-h-[calc(100vh-4rem)]">
          {children}
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}

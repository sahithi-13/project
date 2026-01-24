'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  Users,
  FileText,
  Calendar,
  DollarSign,
  UserCircle,
  LogOut,
  Menu,
  X,
  Briefcase,
} from 'lucide-react'
import { useAuth } from '@/contexts'

export default function CALayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  // Check if user is CA Expert
  if (user && user.role !== 'CA_EXPERT') {
    router.push('/dashboard')
    return null
  }

  const handleLogout = async () => {
    await logout()
    router.push('/login')
  }

  const navItems = [
    { href: '/ca', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/ca/clients', label: 'My Clients', icon: Users },
    { href: '/ca/filings', label: 'Filings', icon: FileText },
    { href: '/ca/calendar', label: 'Calendar', icon: Calendar },
    { href: '/ca/earnings', label: 'Earnings', icon: DollarSign },
    { href: '/ca/profile', label: 'Profile', icon: UserCircle },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* CA Header */}
      <header className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-50 h-16">
        <div className="flex items-center justify-between h-full px-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <Link href="/ca" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-teal-600 to-teal-700 rounded-lg flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">CA Portal</h1>
                <p className="text-xs text-teal-600">Expert Dashboard</p>
              </div>
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="px-4 py-2 text-sm text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
            >
              Switch to User View
            </Link>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                <span className="text-teal-700 font-semibold">
                  {user?.name?.charAt(0) || 'C'}
                </span>
              </div>
              <span className="hidden md:block font-medium text-gray-700">{user?.name}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-16 bottom-0 w-64 bg-white border-r border-gray-200 transition-transform duration-300 z-40 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-teal-50 text-teal-700 font-medium'
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
            className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </nav>
      </aside>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30 top-16"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main
        className={`pt-16 transition-all duration-300 ${
          sidebarOpen ? 'lg:pl-64' : 'lg:pl-0'
        }`}
      >
        {children}
      </main>
    </div>
  )
}

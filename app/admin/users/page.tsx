'use client'

import { useState, useEffect } from 'react'
import { 
  Search, Filter, UserPlus, MoreVertical, Mail, Phone,
  Shield, Ban, CheckCircle, XCircle, Eye, Edit, Trash2
} from 'lucide-react'
import { Button, Card, CardContent, Input } from '@/components/ui'

interface User {
  id: string
  name: string
  email: string
  phone: string | null
  role: 'USER' | 'CA_EXPERT' | 'ADMIN'
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' | 'PENDING_VERIFICATION'
  emailVerified: Date | null
  createdAt: string
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({ total: 0, active: 0, pending: 0 })
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState<'ALL' | 'USER' | 'CA_EXPERT' | 'ADMIN'>('ALL')
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'ACTIVE' | 'PENDING'>('ALL')

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const params = new URLSearchParams()
        if (roleFilter !== 'ALL') params.append('role', roleFilter)
        if (statusFilter !== 'ALL') params.append('status', statusFilter)
        if (searchTerm) params.append('search', searchTerm)

        const response = await fetch(`/api/admin/users?${params}`)
        if (response.ok) {
          const data = await response.json()
          setUsers(data.users)
          setStats(data.stats)
        }
      } catch (error) {
        console.error('Error fetching users:', error)
      } finally {
        setLoading(false)
      }
    }

    const debounce = setTimeout(()=> {
      fetchUsers()
    }, 300)

    return () => clearTimeout(debounce)
  }, [roleFilter, statusFilter, searchTerm])

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      ACTIVE: 'bg-green-100 text-green-700 border-green-200',
      PENDING_VERIFICATION: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      INACTIVE: 'bg-gray-100 text-gray-700 border-gray-200',
      SUSPENDED: 'bg-red-100 text-red-700 border-red-200',
    }
    return (
      <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${styles[status] || styles.PENDING_VERIFICATION}`}>
        {status.replace('_', ' ')}
      </span>
    )
  }

  const getRoleBadge = (role: string) => {
    const styles = {
      USER: 'bg-blue-100 text-blue-700',
      CA_EXPERT: 'bg-purple-100 text-purple-700',
      ADMIN: 'bg-red-100 text-red-700',
    }
    return (
      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${styles[role as keyof typeof styles]}`}>
        {role.replace('_', ' ')}
      </span>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
        </div>
      )}
      
      {!loading && (
        <>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600">{stats.total} total users</p>
        </div>
        <Button>
          <UserPlus className="w-4 h-4 mr-2" />
          Add User
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">Total Users</p>
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">Active</p>
            <p className="text-2xl font-bold text-green-600">{stats.active}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">Pending</p>
            <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">Suspended</p>
            <p className="text-2xl font-bold text-red-600">
              {users.filter(u => u.status === 'SUSPENDED').length}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
            </div>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="ALL">All Roles</option>
              <option value="USER">User</option>
              <option value="CA_EXPERT">CA Expert</option>
              <option value="ADMIN">Admin</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="ALL">All Status</option>
              <option value="ACTIVE">Active</option>
              <option value="PENDING_VERIFICATION">Pending</option>
              <option value="INACTIVE">Inactive</option>
              <option value="SUSPENDED">Suspended</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Joined</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white font-semibold">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{user.name}</p>
                          <p className="text-sm text-gray-500">{user.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Mail className="w-4 h-4" />
                          {user.email}
                          {user.emailVerified && (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          )}
                        </div>
                        {user.phone && (
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Phone className="w-4 h-4" />
                            {user.phone}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {getRoleBadge(user.role)}
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(user.emailVerified ? 'ACTIVE' : 'PENDING_VERIFICATION')}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(user.createdAt).toLocaleDateString('en-IN')}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                          title="Edit User"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                          title="Suspend User"
                        >
                          <Ban className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </>
    )}
    </div>
  )
}

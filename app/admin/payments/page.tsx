'use client'

import { useState, useEffect } from 'react'
import { CreditCard, Download, TrendingUp, Search, Calendar, Loader2 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui'

interface Payment {
  id: string
  transactionId: string
  amount: number
  currency: string
  status: string
  paymentMethod: string
  createdAt: string
  user?: {
    name: string
    email: string
  }
  itrFiling?: {
    filingType: string
    assessmentYear: string
  }
  gstFiling?: {
    returnType: string
    period: string
  }
}

interface PaymentStats {
  totalPayments: number
  totalAmount: number
  successfulPayments: number
  successfulAmount: number
}

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([])
  const [stats, setStats] = useState<PaymentStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPayments()
  }, [])

  const fetchPayments = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/payments')
      if (!response.ok) throw new Error('Failed to fetch payments')
      const data = await response.json()
      setPayments(data.payments || [])
      setStats(data.stats || null)
    } catch (error) {
      console.error('Error fetching payments:', error)
    } finally {
      setLoading(false)
    }
  }

  const getServiceName = (payment: Payment) => {
    if (payment.itrFiling) {
      return `ITR - ${payment.itrFiling.filingType}`
    }
    if (payment.gstFiling) {
      return `GST - ${payment.gstFiling.returnType}`
    }
    return 'Tax Service'
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#1E3A8A]" />
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Payment Management</h1>
      
      <div className="grid md:grid-cols-4 gap-4">
        <Card><CardContent className="p-4"><p className="text-sm text-gray-600">Total Revenue</p><p className="text-2xl font-bold text-green-600">₹{((stats?.successfulAmount || 0) / 100000).toFixed(1)}L</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-sm text-gray-600">Successful</p><p className="text-2xl font-bold text-blue-600">{stats?.successfulPayments || 0}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-sm text-gray-600">Pending</p><p className="text-2xl font-bold text-yellow-600">{(stats?.totalPayments || 0) - (stats?.successfulPayments || 0)}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-sm text-gray-600">Transactions</p><p className="text-2xl font-bold text-gray-900">{stats?.totalPayments || 0}</p></CardContent></Card>
      </div>

      <Card>
        <CardContent className="p-0">
          {payments.length === 0 ? (
            <div className="p-12 text-center">
              <CreditCard className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No payments yet</h3>
              <p className="text-gray-600">Payments will appear here when users make transactions.</p>
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Transaction ID</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Service</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {payments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">{payment.transactionId?.slice(0, 15) || 'N/A'}</td>
                    <td className="px-6 py-4 text-gray-600">{payment.user?.name || 'Unknown'}</td>
                    <td className="px-6 py-4 text-gray-600">{getServiceName(payment)}</td>
                    <td className="px-6 py-4 font-semibold text-gray-900">₹{payment.amount}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 text-xs rounded-full ${
                        payment.status === 'COMPLETED' ? 'bg-green-100 text-green-700' :
                        payment.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {payment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{new Date(payment.createdAt).toLocaleDateString('en-IN')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

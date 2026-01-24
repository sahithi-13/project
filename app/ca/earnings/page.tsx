'use client'

import { useState } from 'react'
import { DollarSign, TrendingUp, Download, Calendar, FileText } from 'lucide-react'
import { Card, CardContent, Button } from '@/components/ui'

export default function EarningsPage() {
  const [transactions] = useState([
    {
      id: 'INV-2024-001',
      client: 'Rajesh Kumar',
      service: 'ITR-2 Filing',
      amount: 1500,
      status: 'PAID',
      date: '2024-01-18',
      paymentMethod: 'UPI',
    },
    {
      id: 'INV-2024-002',
      client: 'Priya Sharma',
      service: 'GST-3B Filing',
      amount: 2000,
      status: 'PAID',
      date: '2024-01-15',
      paymentMethod: 'Bank Transfer',
    },
    {
      id: 'INV-2024-003',
      client: 'Amit Patel',
      service: 'ITR-1 Filing',
      amount: 1200,
      status: 'PENDING',
      date: '2024-01-20',
      paymentMethod: 'UPI',
    },
    {
      id: 'INV-2024-004',
      client: 'Neha Gupta',
      service: 'Tax Consultation',
      amount: 3000,
      status: 'PAID',
      date: '2024-01-12',
      paymentMethod: 'Credit Card',
    },
  ])

  const stats = {
    totalEarnings: 84500,
    thisMonth: 7700,
    pending: 1200,
    thisWeek: 4500,
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Earnings & Invoices</h1>
          <p className="text-gray-600">Track your income and payment history</p>
        </div>
        <Button>
          <Download className="w-4 h-4 mr-2" />
          Download Report
        </Button>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Earnings</p>
                <p className="text-3xl font-bold text-gray-900">₹{(stats.totalEarnings / 1000).toFixed(1)}K</p>
                <p className="text-xs text-green-600 mt-1">All time</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">This Month</p>
                <p className="text-3xl font-bold text-teal-600">₹{(stats.thisMonth / 1000).toFixed(1)}K</p>
                <p className="text-xs text-teal-600 mt-1">+18.2% from last month</p>
              </div>
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-teal-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">This Week</p>
                <p className="text-3xl font-bold text-blue-600">₹{(stats.thisWeek / 1000).toFixed(1)}K</p>
                <p className="text-xs text-gray-600 mt-1">4 transactions</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Pending</p>
                <p className="text-3xl font-bold text-orange-600">₹{(stats.pending / 1000).toFixed(1)}K</p>
                <p className="text-xs text-gray-600 mt-1">1 invoice</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Earnings Chart Placeholder */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Monthly Earnings Trend</h2>
          <div className="h-64 bg-gradient-to-br from-teal-50 to-blue-50 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Chart visualization will be added with Chart.js/Recharts</p>
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Transactions</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Invoice</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Service</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {transactions.map((txn) => (
                  <tr key={txn.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">{txn.id}</td>
                    <td className="px-6 py-4 text-gray-900">{txn.client}</td>
                    <td className="px-6 py-4 text-gray-600">{txn.service}</td>
                    <td className="px-6 py-4 font-semibold text-gray-900">₹{txn.amount}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                        txn.status === 'PAID' ? 'bg-green-100 text-green-700' :
                        txn.status === 'PENDING' ? 'bg-orange-100 text-orange-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {txn.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {new Date(txn.date).toLocaleDateString('en-IN')}
                    </td>
                    <td className="px-6 py-4">
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Invoice
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

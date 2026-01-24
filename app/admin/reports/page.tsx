'use client'

import { BarChart3, Download, TrendingUp, Users, FileText, DollarSign } from 'lucide-react'
import { Card, CardContent, Button } from '@/components/ui'

export default function ReportsPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600">Generate and download business reports</p>
        </div>
        <Button>
          <Download className="w-4 h-4 mr-2" />
          Export All
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">User Report</h3>
            <p className="text-sm text-gray-600 mb-4">User registrations, activity, and demographics</p>
            <Button variant="outline" size="sm" className="w-full">
              <Download className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <FileText className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Filing Report</h3>
            <p className="text-sm text-gray-600 mb-4">ITR & GST filing statistics and trends</p>
            <Button variant="outline" size="sm" className="w-full">
              <Download className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Revenue Report</h3>
            <p className="text-sm text-gray-600 mb-4">Payment transactions and revenue analytics</p>
            <Button variant="outline" size="sm" className="w-full">
              <Download className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">CA Performance</h3>
            <p className="text-sm text-gray-600 mb-4">CA expert performance and ratings</p>
            <Button variant="outline" size="sm" className="w-full">
              <Download className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
              <BarChart3 className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Platform Analytics</h3>
            <p className="text-sm text-gray-600 mb-4">Overall platform usage and metrics</p>
            <Button variant="outline" size="sm" className="w-full">
              <Download className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
              <FileText className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Custom Report</h3>
            <p className="text-sm text-gray-600 mb-4">Create custom reports with filters</p>
            <Button variant="outline" size="sm" className="w-full">
              <Download className="w-4 h-4 mr-2" />
              Create Custom
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

'use client'

import { Settings, Bell, Shield, Database, Mail, Globe } from 'lucide-react'
import { Card, CardContent, Button } from '@/components/ui'

export default function SettingsPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Admin Settings</h1>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Globe className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">General Settings</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Platform Name</label>
                <input type="text" value="eTaxMentor" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Support Email</label>
                <input type="email" value="support@etaxmentor.com" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
              </div>
              <Button>Save Changes</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Bell className="w-5 h-5 text-orange-600" />
              <h3 className="text-lg font-semibold text-gray-900">Notification Settings</h3>
            </div>
            <div className="space-y-3">
              {['New user registrations', 'CA applications', 'Support tickets', 'Payment alerts'].map((item, i) => (
                <label key={i} className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-red-600" />
                  <span className="text-gray-700">{item}</span>
                </label>
              ))}
              <Button className="mt-4">Update Preferences</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-5 h-5 text-red-600" />
              <h3 className="text-lg font-semibold text-gray-900">Security Settings</h3>
            </div>
            <div className="space-y-3 text-sm text-gray-600">
              <p>✓ Two-factor authentication enabled</p>
              <p>✓ Session timeout: 30 minutes</p>
              <p>✓ IP whitelist active</p>
              <Button variant="outline">Configure Security</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Database className="w-5 h-5 text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-900">Database Management</h3>
            </div>
            <div className="space-y-3">
              <Button variant="outline" className="w-full">Backup Database</Button>
              <Button variant="outline" className="w-full">View Logs</Button>
              <Button variant="outline" className="w-full border-red-600 text-red-600">Clear Cache</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

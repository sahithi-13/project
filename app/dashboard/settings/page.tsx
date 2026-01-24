'use client'

import { useState } from 'react'
import { Shield, Bell, Lock, Mail, Smartphone, Trash2, Eye, EyeOff, CheckCircle, Loader2 } from 'lucide-react'
import { Button, Input, Card, CardContent } from '@/components/ui'
import { useAuth } from '@/contexts'

export default function SettingsPage() {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState<'security' | 'notifications' | 'preferences'>('security')

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600">Manage your account settings and preferences</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-4">
                <nav className="space-y-1">
                  <button
                    onClick={() => setActiveTab('security')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === 'security'
                        ? 'bg-[#1E3A8A] text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Shield className="w-5 h-5" />
                    <span className="font-medium">Security</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('notifications')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === 'notifications'
                        ? 'bg-[#1E3A8A] text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Bell className="w-5 h-5" />
                    <span className="font-medium">Notifications</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('preferences')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === 'preferences'
                        ? 'bg-[#1E3A8A] text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Mail className="w-5 h-5" />
                    <span className="font-medium">Preferences</span>
                  </button>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            {activeTab === 'security' && <SecuritySettings />}
            {activeTab === 'notifications' && <NotificationSettings />}
            {activeTab === 'preferences' && <PreferencesSettings />}
          </div>
        </div>
      </div>
    </div>
  )
}

function SecuritySettings() {
  const { logout } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    try {
      const response = await fetch('/api/user/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to change password')
      }

      setSuccess('Password changed successfully!')
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Change Password */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Lock className="w-5 h-5 text-[#1E3A8A]" />
            Change Password
          </h2>

          {success && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              {success}
            </div>
          )}
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleChangePassword} className="space-y-4">
            <div className="relative">
              <Input
                label="Current Password"
                type={showPassword ? 'text' : 'password'}
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                required
              />
            </div>
            <div className="relative">
              <Input
                label="New Password"
                type={showPassword ? 'text' : 'password'}
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                helperText="Must be at least 8 characters with uppercase, lowercase, number and special character"
                required
              />
            </div>
            <div className="relative">
              <Input
                label="Confirm New Password"
                type={showPassword ? 'text' : 'password'}
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                required
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="showPassword"
                checked={showPassword}
                onChange={(e) => setShowPassword(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-[#1E3A8A] focus:ring-[#1E3A8A]"
              />
              <label htmlFor="showPassword" className="text-sm text-gray-700">
                Show passwords
              </label>
            </div>

            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Changing...
                </>
              ) : (
                'Change Password'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Two-Factor Authentication */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-[#1E3A8A]" />
            Two-Factor Authentication
          </h2>
          <p className="text-gray-600 mb-4">
            Add an extra layer of security to your account by enabling 2FA.
          </p>
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600 mb-3">Status: <span className="font-medium text-gray-900">Disabled</span></p>
            <Button variant="outline" disabled>
              Enable 2FA (Coming Soon)
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold text-red-600 mb-4 flex items-center gap-2">
            <Trash2 className="w-5 h-5" />
            Danger Zone
          </h2>
          <div className="space-y-4">
            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
              <h3 className="font-semibold text-gray-900 mb-2">Delete Account</h3>
              <p className="text-sm text-gray-600 mb-3">
                Once you delete your account, there is no going back. Please be certain.
              </p>
              <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-50">
                Delete My Account
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function NotificationSettings() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    filingUpdates: true,
    paymentReminders: true,
    promotions: false,
    weeklyDigest: true,
    smsNotifications: false,
  })

  const handleSave = () => {
    // TODO: API call to save settings
    alert('Settings saved!')
  }

  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Notification Preferences</h2>

        <div className="space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-medium text-gray-900">Email Notifications</h3>
              <p className="text-sm text-gray-600 mt-1">Receive notifications via email</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={(e) => setSettings({ ...settings, emailNotifications: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1E3A8A]"></div>
            </label>
          </div>

          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-medium text-gray-900">Filing Updates</h3>
              <p className="text-sm text-gray-600 mt-1">Get notified about ITR/GST filing status changes</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.filingUpdates}
                onChange={(e) => setSettings({ ...settings, filingUpdates: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1E3A8A]"></div>
            </label>
          </div>

          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-medium text-gray-900">Payment Reminders</h3>
              <p className="text-sm text-gray-600 mt-1">Reminders for pending payments</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.paymentReminders}
                onChange={(e) => setSettings({ ...settings, paymentReminders: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1E3A8A]"></div>
            </label>
          </div>

          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-medium text-gray-900">Promotional Emails</h3>
              <p className="text-sm text-gray-600 mt-1">Receive offers and promotional content</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.promotions}
                onChange={(e) => setSettings({ ...settings, promotions: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1E3A8A]"></div>
            </label>
          </div>

          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-medium text-gray-900">Weekly Digest</h3>
              <p className="text-sm text-gray-600 mt-1">Weekly summary of your account activity</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.weeklyDigest}
                onChange={(e) => setSettings({ ...settings, weeklyDigest: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1E3A8A]"></div>
            </label>
          </div>

          <div className="flex items-start justify-between opacity-50">
            <div>
              <h3 className="font-medium text-gray-900">SMS Notifications</h3>
              <p className="text-sm text-gray-600 mt-1">Receive important updates via SMS (Coming Soon)</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.smsNotifications}
                disabled
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
            </label>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t">
          <Button onClick={handleSave}>Save Preferences</Button>
        </div>
      </CardContent>
    </Card>
  )
}

function PreferencesSettings() {
  const [language, setLanguage] = useState('en')
  const [timezone, setTimezone] = useState('Asia/Kolkata')
  const [currency, setCurrency] = useState('INR')

  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">General Preferences</h2>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent"
            >
              <option value="en">English</option>
              <option value="hi" disabled>Hindi (Coming Soon)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
            <select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent"
            >
              <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
              <option value="Asia/Dubai">Asia/Dubai (GST)</option>
              <option value="America/New_York">America/New York (EST)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              disabled
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
            >
              <option value="INR">₹ INR - Indian Rupee</option>
            </select>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t">
          <Button>Save Preferences</Button>
        </div>
      </CardContent>
    </Card>
  )
}

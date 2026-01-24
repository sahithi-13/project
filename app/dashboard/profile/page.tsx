'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { User, Mail, Phone, MapPin, Briefcase, Calendar, Edit2, Save, X, Loader2 } from 'lucide-react'
import { Button, Input, Card, CardContent } from '@/components/ui'
import { useAuth } from '@/contexts'

export default function ProfilePage() {
  const router = useRouter()
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    panNumber: '',
    aadhaarNumber: '',
  })

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: '',
        city: '',
        state: '',
        pincode: '',
        panNumber: '',
        aadhaarNumber: '',
      })
    }
  }, [user])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update profile')
      }

      setSuccess('Profile updated successfully!')
      setIsEditing(false)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: '',
        city: '',
        state: '',
        pincode: '',
        panNumber: '',
        aadhaarNumber: '',
      })
    }
    setError('')
    setSuccess('')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
          <p className="text-gray-600">Manage your personal information</p>
        </div>

        {/* Profile Card */}
        <Card>
          <CardContent className="p-8">
            {/* Profile Header */}
            <div className="flex items-start justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] rounded-full flex items-center justify-center text-white text-3xl font-bold">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{user?.name}</h2>
                  <p className="text-gray-500">{user?.email}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      user?.emailVerified 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {user?.emailVerified ? '✓ Verified' : 'Unverified'}
                    </span>
                  </div>
                </div>
              </div>
              {!isEditing && (
                <Button
                  onClick={() => setIsEditing(true)}
                  variant="outline"
                  size="sm"
                >
                  <Edit2 className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              )}
            </div>

            {/* Messages */}
            {success && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
                {success}
              </div>
            )}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                {/* Personal Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <User className="w-5 h-5 text-[#1E3A8A]" />
                    Personal Information
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      label="Full Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      disabled={!isEditing}
                      required
                    />
                    <Input
                      label="Email Address"
                      type="email"
                      value={formData.email}
                      disabled
                      helperText="Email cannot be changed"
                    />
                    <Input
                      label="Phone Number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      disabled={!isEditing}
                      placeholder="+91 XXXXX XXXXX"
                    />
                    <Input
                      label="Date of Birth"
                      type="date"
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                {/* Address */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-[#1E3A8A]" />
                    Address
                  </h3>
                  <div className="grid gap-4">
                    <Input
                      label="Address Line"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      disabled={!isEditing}
                      placeholder="House No., Building Name, Street"
                    />
                    <div className="grid md:grid-cols-3 gap-4">
                      <Input
                        label="City"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        disabled={!isEditing}
                      />
                      <Input
                        label="State"
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        disabled={!isEditing}
                      />
                      <Input
                        label="Pincode"
                        value={formData.pincode}
                        onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                        disabled={!isEditing}
                        maxLength={6}
                      />
                    </div>
                  </div>
                </div>

                {/* Tax Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-[#1E3A8A]" />
                    Tax Information
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      label="PAN Number"
                      value={formData.panNumber}
                      onChange={(e) => setFormData({ ...formData, panNumber: e.target.value.toUpperCase() })}
                      disabled={!isEditing}
                      placeholder="ABCDE1234F"
                      maxLength={10}
                    />
                    <Input
                      label="Aadhaar Number"
                      value={formData.aadhaarNumber}
                      onChange={(e) => setFormData({ ...formData, aadhaarNumber: e.target.value })}
                      disabled={!isEditing}
                      placeholder="XXXX XXXX XXXX"
                      maxLength={12}
                    />
                  </div>
                </div>

                {/* Account Details */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-[#1E3A8A]" />
                    Account Details
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-500 mb-1">Account Created</p>
                      <p className="text-gray-900 font-medium">
                        {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-IN', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        }) : 'N/A'}
                      </p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-500 mb-1">Account Type</p>
                      <p className="text-gray-900 font-medium capitalize">{user?.role?.toLowerCase() || 'User'}</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                {isEditing && (
                  <div className="flex gap-3 pt-4 border-t">
                    <Button
                      type="submit"
                      disabled={loading}
                      className="flex-1"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          Save Changes
                        </>
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleCancel}
                      disabled={loading}
                    >
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

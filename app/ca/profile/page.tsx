'use client'

import { useState } from 'react'
import { Award, Briefcase, Star, Save, Edit } from 'lucide-react'
import { Card, CardContent, Button, Input } from '@/components/ui'

export default function CAProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: 'CA Suresh Kumar',
    email: 'suresh.kumar@example.com',
    phone: '+91 98765 43200',
    membershipNumber: 'FCA-123456',
    experience: '12 years',
    qualification: 'Fellow Chartered Accountant (FCA)',
    specializations: ['Income Tax', 'GST', 'Corporate Tax', 'Audit'],
    bio: 'Experienced Chartered Accountant with over 12 years of expertise in taxation, audit, and financial consulting. Specialized in helping individuals and businesses with ITR filing, GST compliance, and tax planning.',
    rating: 4.8,
    totalClients: 156,
    completedFilings: 890,
  })

  const certifications = [
    { name: 'Chartered Accountant (CA)', year: '2012', issuer: 'ICAI' },
    { name: 'Certificate in GST', year: '2017', issuer: 'ICAI' },
    { name: 'Diploma in International Taxation', year: '2019', issuer: 'ICAI' },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">CA Profile</h1>
        <Button onClick={() => setIsEditing(!isEditing)}>
          <Edit className="w-4 h-4 mr-2" />
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </Button>
      </div>

      {/* Profile Overview */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start gap-6">
            <div className="w-24 h-24 bg-gradient-to-br from-teal-500 to-teal-700 rounded-full flex items-center justify-center">
              <span className="text-4xl font-bold text-white">
                {profile.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{profile.name}</h2>
                  <p className="text-gray-600">{profile.qualification}</p>
                  <p className="text-sm text-gray-500">Member No: {profile.membershipNumber}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    <span className="text-xl font-bold text-gray-900">{profile.rating}</span>
                  </div>
                  <p className="text-sm text-gray-600">{profile.totalClients} clients</p>
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-teal-600" />
                  <span className="text-gray-700">{profile.experience} experience</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-teal-600" />
                  <span className="text-gray-700">{profile.completedFilings} filings completed</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              {isEditing ? (
                <Input type="email" value={profile.email} onChange={(e) => setProfile({...profile, email: e.target.value})} />
              ) : (
                <p className="text-gray-900">{profile.email}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              {isEditing ? (
                <Input type="tel" value={profile.phone} onChange={(e) => setProfile({...profile, phone: e.target.value})} />
              ) : (
                <p className="text-gray-900">{profile.phone}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bio */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Professional Bio</h3>
          {isEditing ? (
            <textarea
              className="w-full px-4 py-2 border border-gray-300 rounded-lg min-h-32"
              value={profile.bio}
              onChange={(e) => setProfile({...profile, bio: e.target.value})}
            />
          ) : (
            <p className="text-gray-700 leading-relaxed">{profile.bio}</p>
          )}
        </CardContent>
      </Card>

      {/* Specializations */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Specializations</h3>
          <div className="flex flex-wrap gap-2">
            {profile.specializations.map((spec, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-teal-100 text-teal-700 rounded-full text-sm font-medium"
              >
                {spec}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Certifications */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Certifications & Qualifications</h3>
          <div className="space-y-3">
            {certifications.map((cert, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Award className="w-5 h-5 text-teal-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{cert.name}</h4>
                  <p className="text-sm text-gray-600">{cert.issuer} • {cert.year}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {isEditing && (
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
          <Button onClick={() => setIsEditing(false)}>
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      )}
    </div>
  )
}

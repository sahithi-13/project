'use client'

import { useState } from 'react'
import { Calendar as CalendarIcon, Clock, User, Video, MapPin, Plus } from 'lucide-react'
import { Card, CardContent, Button } from '@/components/ui'

export default function CalendarPage() {
  const [appointments] = useState([
    {
      id: '1',
      client: 'Rajesh Kumar',
      date: '2024-01-22T10:00:00Z',
      duration: 60,
      type: 'Meeting',
      purpose: 'ITR Filing Discussion',
      location: 'Office',
      status: 'CONFIRMED',
    },
    {
      id: '2',
      client: 'Neha Gupta',
      date: '2024-01-22T14:30:00Z',
      duration: 30,
      type: 'Call',
      purpose: 'GST Query',
      location: 'Phone',
      status: 'CONFIRMED',
    },
    {
      id: '3',
      client: 'Vikram Singh',
      date: '2024-01-23T11:00:00Z',
      duration: 45,
      type: 'Video',
      purpose: 'Tax Planning Consultation',
      location: 'Google Meet',
      status: 'PENDING',
    },
    {
      id: '4',
      client: 'Priya Sharma',
      date: '2024-01-24T15:00:00Z',
      duration: 30,
      type: 'Meeting',
      purpose: 'Document Review',
      location: 'Office',
      status: 'CONFIRMED',
    },
  ])

  // Group appointments by date
  const groupedAppointments = appointments.reduce((acc, apt) => {
    const date = new Date(apt.date).toLocaleDateString('en-IN', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
    if (!acc[date]) acc[date] = []
    acc[date].push(apt)
    return acc
  }, {} as Record<string, typeof appointments>)

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Calendar & Appointments</h1>
          <p className="text-gray-600">Manage your schedule and client meetings</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Appointment
        </Button>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">Today</p>
            <p className="text-2xl font-bold text-blue-600">2</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">This Week</p>
            <p className="text-2xl font-bold text-teal-600">{appointments.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">Confirmed</p>
            <p className="text-2xl font-bold text-green-600">
              {appointments.filter(a => a.status === 'CONFIRMED').length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">Pending</p>
            <p className="text-2xl font-bold text-orange-600">
              {appointments.filter(a => a.status === 'PENDING').length}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Appointments List */}
      <div className="space-y-6">
        {Object.entries(groupedAppointments).map(([date, apts]) => (
          <div key={date}>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">{date}</h2>
            <div className="space-y-3">
              {apts.map((apt) => (
                <Card key={apt.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-teal-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{apt.client}</h3>
                            <p className="text-sm text-gray-600">{apt.purpose}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 ml-13 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>
                              {new Date(apt.date).toLocaleTimeString('en-IN', { 
                                hour: '2-digit', 
                                minute: '2-digit' 
                              })} ({apt.duration} min)
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            {apt.type === 'Video' ? (
                              <Video className="w-4 h-4" />
                            ) : (
                              <MapPin className="w-4 h-4" />
                            )}
                            <span>{apt.location}</span>
                          </div>
                          <span className={`px-2.5 py-1 text-xs rounded-full ${
                            apt.status === 'CONFIRMED' ? 'bg-green-100 text-green-700' :
                            apt.status === 'PENDING' ? 'bg-orange-100 text-orange-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {apt.status}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Reschedule</Button>
                        {apt.type === 'Video' && (
                          <Button size="sm">
                            <Video className="w-4 h-4 mr-2" />
                            Join
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

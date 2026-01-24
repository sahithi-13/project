'use client'

import { useState, useEffect } from 'react'
import { MessageSquare, Clock, CheckCircle, Eye, Loader2, User } from 'lucide-react'
import { Card, CardContent, Button } from '@/components/ui'

interface Ticket {
  id: string
  subject: string
  category: string
  status: string
  priority: string
  createdAt: string
  user?: {
    name: string
    email: string
  }
  assignedTo?: {
    name: string
  }
  _count?: {
    messages: number
  }
}

export default function TicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null)

  useEffect(() => {
    fetchTickets()
  }, [])

  const fetchTickets = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/tickets')
      if (!response.ok) throw new Error('Failed to fetch tickets')
      const data = await response.json()
      setTickets(data.tickets || [])
    } catch (error) {
      console.error('Error fetching tickets:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateTicketStatus = async (ticketId: string, status: string) => {
    try {
      const response = await fetch(`/api/tickets/${ticketId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      if (!response.ok) throw new Error('Failed to update ticket')
      await fetchTickets()
    } catch (error) {
      console.error('Error updating ticket:', error)
    }
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
      <h1 className="text-2xl font-bold text-gray-900">Support Tickets</h1>
      
      <div className="grid md:grid-cols-4 gap-4">
        <Card><CardContent className="p-4"><p className="text-sm text-gray-600">Total</p><p className="text-2xl font-bold text-gray-900">{tickets.length}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-sm text-gray-600">Open</p><p className="text-2xl font-bold text-yellow-600">{tickets.filter(t => t.status === 'OPEN').length}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-sm text-gray-600">In Progress</p><p className="text-2xl font-bold text-blue-600">{tickets.filter(t => t.status === 'IN_PROGRESS').length}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-sm text-gray-600">Resolved</p><p className="text-2xl font-bold text-green-600">{tickets.filter(t => t.status === 'RESOLVED' || t.status === 'CLOSED').length}</p></CardContent></Card>
      </div>

      {tickets.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <MessageSquare className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No tickets yet</h3>
            <p className="text-gray-600">Support tickets will appear here when users submit them.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {tickets.map((ticket) => (
            <Card key={ticket.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{ticket.subject}</h3>
                      <span className={`px-2.5 py-1 text-xs rounded-full ${
                        ticket.status === 'OPEN' ? 'bg-yellow-100 text-yellow-700' :
                        ticket.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {ticket.status.replace('_', ' ')}
                      </span>
                      <span className={`px-2.5 py-1 text-xs rounded-full ${
                        ticket.priority === 'HIGH' || ticket.priority === 'URGENT' ? 'bg-red-100 text-red-700' :
                        ticket.priority === 'MEDIUM' ? 'bg-orange-100 text-orange-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {ticket.priority}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {ticket.user?.name || 'Unknown'}
                      </span>
                      <span>•</span>
                      <span>{ticket.category}</span>
                      <span>•</span>
                      <span>{new Date(ticket.createdAt).toLocaleString('en-IN')}</span>
                      {ticket._count?.messages && (
                        <>
                          <span>•</span>
                          <span>{ticket._count.messages} messages</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {ticket.status === 'OPEN' && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => updateTicketStatus(ticket.id, 'IN_PROGRESS')}
                      >
                        Start Working
                      </Button>
                    )}
                    {ticket.status === 'IN_PROGRESS' && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => updateTicketStatus(ticket.id, 'RESOLVED')}
                      >
                        Mark Resolved
                      </Button>
                    )}
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

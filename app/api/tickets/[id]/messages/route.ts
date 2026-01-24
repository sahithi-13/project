import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyRequestToken } from '@/lib/auth'

// POST - Add a message to a ticket
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const decoded = await verifyRequestToken(request)
    if (!decoded) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()
    const { message, attachments } = body

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    // Find ticket
    const ticket = await prisma.ticket.findUnique({
      where: { id },
      include: {
        user: true,
      },
    })

    if (!ticket) {
      return NextResponse.json({ error: 'Ticket not found' }, { status: 404 })
    }

    // Check if user has access to this ticket
    if (
      decoded.role !== 'ADMIN' && 
      ticket.userId !== decoded.userId && 
      ticket.assignedTo !== decoded.userId
    ) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Determine sender type
    const senderType = decoded.role === 'ADMIN' ? 'ADMIN' : 
                       decoded.role === 'CA_EXPERT' ? 'CA_EXPERT' : 'USER'

    // Create the message
    const ticketMessage = await prisma.ticketMessage.create({
      data: {
        ticketId: id,
        senderId: decoded.userId,
        senderType,
        message,
        attachments: attachments || [],
      },
    })

    // Update ticket status to IN_PROGRESS if it was OPEN
    if (ticket.status === 'OPEN') {
      await prisma.ticket.update({
        where: { id },
        data: { status: 'IN_PROGRESS' },
      })
    }

    // Notify the other party
    const isStaffMessage = senderType !== 'USER'
    const notifyUserId = isStaffMessage ? ticket.userId : (ticket.assignedTo || null)
    
    if (notifyUserId) {
      await prisma.notification.create({
        data: {
          userId: notifyUserId,
          type: 'TICKET',
          title: 'New Message on Ticket',
          message: `New message on ticket: ${ticket.subject}`,
          entityType: 'TICKET',
          entityId: ticket.id,
        },
      })
    }

    // If staff replied, also notify admins if no one assigned
    if (!isStaffMessage && !ticket.assignedTo) {
      const admins = await prisma.user.findMany({
        where: { role: 'ADMIN' },
        select: { id: true },
      })

      await prisma.notification.createMany({
        data: admins.map(admin => ({
          userId: admin.id,
          type: 'TICKET' as const,
          title: 'Ticket Reply',
          message: `User replied to ticket: ${ticket.subject}`,
          entityType: 'TICKET',
          entityId: ticket.id,
        })),
      })
    }

    return NextResponse.json({ message: ticketMessage }, { status: 201 })
  } catch (error) {
    console.error('Error adding ticket message:', error)
    return NextResponse.json(
      { error: 'Failed to add message' },
      { status: 500 }
    )
  }
}

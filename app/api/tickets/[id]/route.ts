import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyRequestToken } from '@/lib/auth'

// GET - Get single ticket with messages
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const decoded = await verifyRequestToken(request)
    if (!decoded) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params

    const ticket = await prisma.ticket.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        messages: {
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
    })

    if (!ticket) {
      return NextResponse.json({ error: 'Ticket not found' }, { status: 404 })
    }

    // Check if user has access to this ticket
    if (decoded.role !== 'ADMIN' && ticket.userId !== decoded.userId && ticket.assignedTo !== decoded.userId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    return NextResponse.json({ ticket })
  } catch (error) {
    console.error('Error fetching ticket:', error)
    return NextResponse.json(
      { error: 'Failed to fetch ticket' },
      { status: 500 }
    )
  }
}

// PUT - Update ticket (assign, change status, etc.)
export async function PUT(
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
    const { status, priority, assignedTo } = body

    // Find existing ticket
    const existingTicket = await prisma.ticket.findUnique({
      where: { id },
    })

    if (!existingTicket) {
      return NextResponse.json({ error: 'Ticket not found' }, { status: 404 })
    }

    // Only admin or assigned CA can update ticket
    if (decoded.role !== 'ADMIN' && existingTicket.assignedTo !== decoded.userId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const updateData: any = {}
    if (status) updateData.status = status
    if (priority) updateData.priority = priority
    if (assignedTo !== undefined) updateData.assignedTo = assignedTo
    if (status === 'RESOLVED' || status === 'CLOSED') {
      updateData.resolvedAt = new Date()
    }

    const ticket = await prisma.ticket.update({
      where: { id },
      data: updateData,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    })

    // Notify user about ticket update
    await prisma.notification.create({
      data: {
        userId: ticket.userId,
        type: 'TICKET',
        title: 'Ticket Updated',
        message: `Your ticket "${ticket.subject}" has been updated to ${status || 'updated'}`,
        entityType: 'TICKET',
        entityId: ticket.id,
      },
    })

    return NextResponse.json({ ticket })
  } catch (error) {
    console.error('Error updating ticket:', error)
    return NextResponse.json(
      { error: 'Failed to update ticket' },
      { status: 500 }
    )
  }
}

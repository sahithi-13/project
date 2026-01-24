import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyRequestToken } from '@/lib/auth'

// GET - Fetch all tickets for the user or all tickets for admin
export async function GET(request: NextRequest) {
  try {
    const decoded = await verifyRequestToken(request)
    if (!decoded) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const priority = searchParams.get('priority')
    const category = searchParams.get('category')

    // Build where clause
    const where: any = {}
    
    // If not admin, only show user's own tickets
    if (decoded.role !== 'ADMIN') {
      where.userId = decoded.userId
    }

    if (status) {
      where.status = status
    }
    if (priority) {
      where.priority = priority
    }
    if (category) {
      where.category = category
    }

    const tickets = await prisma.ticket.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        _count: {
          select: {
            messages: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json({ tickets })
  } catch (error) {
    console.error('Error fetching tickets:', error)
    return NextResponse.json(
      { error: 'Failed to fetch tickets' },
      { status: 500 }
    )
  }
}

// POST - Create a new ticket
export async function POST(request: NextRequest) {
  try {
    const decoded = await verifyRequestToken(request)
    if (!decoded) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { subject, description, category, priority } = body

    if (!subject || !description) {
      return NextResponse.json(
        { error: 'Subject and description are required' },
        { status: 400 }
      )
    }

    const ticket = await prisma.ticket.create({
      data: {
        subject,
        description,
        category: category || 'GENERAL',
        priority: priority || 'MEDIUM',
        userId: decoded.userId,
      },
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

    // Create notification for admins about new ticket
    const admins = await prisma.user.findMany({
      where: { role: 'ADMIN' },
      select: { id: true },
    })

    await prisma.notification.createMany({
      data: admins.map(admin => ({
        userId: admin.id,
        type: 'TICKET',
        title: 'New Support Ticket',
        message: `New ticket: ${subject}`,
        entityType: 'TICKET',
        entityId: ticket.id,
      })),
    })

    return NextResponse.json({ ticket }, { status: 201 })
  } catch (error) {
    console.error('Error creating ticket:', error)
    return NextResponse.json(
      { error: 'Failed to create ticket' },
      { status: 500 }
    )
  }
}

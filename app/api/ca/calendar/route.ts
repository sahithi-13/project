import { NextRequest, NextResponse } from 'next/server'
import { Prisma } from '.prisma/client'
import { prisma } from '@/lib/prisma'
import { verifyRequestToken } from '@/lib/auth'

// GET - Fetch CA's calendar/appointments
export async function GET(request: NextRequest) {
  try {
    const decoded = await verifyRequestToken(request)
    if (!decoded) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (decoded.role !== 'CA_EXPERT' && decoded.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')
    const status = searchParams.get('status')

    const where: Record<string, unknown> = {
      caId: decoded.userId,
    }

    if (startDate || endDate) {
      where.scheduledAt = {} as Record<string, Date>
      if (startDate) {
        (where.scheduledAt as Record<string, Date>).gte = new Date(startDate)
      }
      if (endDate) {
        (where.scheduledAt as Record<string, Date>).lte = new Date(endDate)
      }
    }

    if (status) {
      where.status = status
    }

    const appointments = await prisma.appointment.findMany({
      where,
      orderBy: {
        scheduledAt: 'asc',
      },
    })

    // Get client info for appointments
    const clientIds = [...new Set(appointments.map(a => a.clientId))]
    const clients = await prisma.user.findMany({
      where: { id: { in: clientIds } },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
      },
    })
    const clientMap = new Map(clients.map(c => [c.id, c]))

    // Add client info to appointments
    const appointmentsWithClients = appointments.map(apt => ({
      ...apt,
      client: clientMap.get(apt.clientId) || null,
    }))

    // Get filing deadlines for calendar
    const filingDeadlines = await prisma.iTRFiling.findMany({
      where: {
        assignedCAId: decoded.userId,
        status: {
          notIn: ['COMPLETED', 'REJECTED', 'FILED'],
        },
      },
      select: {
        id: true,
        assessmentYear: true,
        itrType: true,
        status: true,
        user: {
          select: {
            name: true,
          },
        },
        updatedAt: true,
      },
    })

    return NextResponse.json({ 
      appointments: appointmentsWithClients,
      filingDeadlines,
    })
  } catch (error) {
    console.error('Error fetching CA calendar:', error)
    return NextResponse.json(
      { error: 'Failed to fetch calendar' },
      { status: 500 }
    )
  }
}

// POST - Create a new appointment
export async function POST(request: NextRequest) {
  try {
    const decoded = await verifyRequestToken(request)
    if (!decoded) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (decoded.role !== 'CA_EXPERT' && decoded.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await request.json()
    const { clientId, scheduledAt, duration, purpose, notes, meetingLink } = body

    if (!clientId || !scheduledAt || !purpose) {
      return NextResponse.json(
        { error: 'clientId, scheduledAt, and purpose are required' },
        { status: 400 }
      )
    }

    const appointment = await prisma.appointment.create({
      data: {
        clientId,
        caId: decoded.userId,
        scheduledAt: new Date(scheduledAt),
        duration: duration || 30,
        purpose,
        notes,
        meetingLink,
        status: 'SCHEDULED',
      },
    })

    // Notify client about the appointment
    await prisma.notification.create({
      data: {
        userId: clientId,
        type: 'INFO',
        title: 'New Appointment Scheduled',
        message: `Your appointment "${purpose}" has been scheduled for ${new Date(scheduledAt).toLocaleString()}`,
        entityType: 'APPOINTMENT',
        entityId: appointment.id,
      },
    })

    return NextResponse.json({ appointment }, { status: 201 })
  } catch (error) {
    console.error('Error creating appointment:', error)
    return NextResponse.json(
      { error: 'Failed to create appointment' },
      { status: 500 }
    )
  }
}

// PUT - Update appointment
export async function PUT(request: NextRequest) {
  try {
    const decoded = await verifyRequestToken(request)
    if (!decoded) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { appointmentId, status, scheduledAt, notes, summary } = body

    if (!appointmentId) {
      return NextResponse.json(
        { error: 'Appointment ID is required' },
        { status: 400 }
      )
    }

    const existingAppointment = await prisma.appointment.findUnique({
      where: { id: appointmentId },
    })

    if (!existingAppointment) {
      return NextResponse.json({ error: 'Appointment not found' }, { status: 404 })
    }

    // Check permission
    if (
      decoded.role !== 'ADMIN' && 
      existingAppointment.caId !== decoded.userId &&
      existingAppointment.clientId !== decoded.userId
    ) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const updateData: Prisma.AppointmentUpdateInput = {}
    if (status) updateData.status = status
    if (scheduledAt) updateData.scheduledAt = new Date(scheduledAt)
    if (notes !== undefined) updateData.notes = notes
    if (summary !== undefined) updateData.summary = summary
    if (status === 'COMPLETED') updateData.completedAt = new Date()

    const appointment = await prisma.appointment.update({
      where: { id: appointmentId },
      data: updateData,
    })

    // Notify client about the update
    await prisma.notification.create({
      data: {
        userId: existingAppointment.clientId,
        type: 'INFO',
        title: 'Appointment Updated',
        message: `Your appointment has been ${status?.toLowerCase() || 'updated'}`,
        entityType: 'APPOINTMENT',
        entityId: appointment.id,
      },
    })

    return NextResponse.json({ appointment })
  } catch (error) {
    console.error('Error updating appointment:', error)
    return NextResponse.json(
      { error: 'Failed to update appointment' },
      { status: 500 }
    )
  }
}

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyRequestToken } from '@/lib/auth'

export async function GET(request: Request) {
  try {
    const decoded = await verifyRequestToken(request)
    if (!decoded) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if user is CA Expert
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { role: true },
    })

    if (user?.role !== 'CA_EXPERT') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Get client count (users who have ITR filings assigned to this CA)
    const itrClients = await prisma.iTRFiling.findMany({
      where: { assignedCAId: decoded.userId },
      select: { userId: true },
      distinct: ['userId'],
    })
    
    const totalClients = itrClients.length

    // Get active filings (DRAFT, UNDER_REVIEW, DOCUMENTS_PENDING, CA_ASSIGNED, PROCESSING)
    const activeITRFilings = await prisma.iTRFiling.count({
      where: {
        assignedCAId: decoded.userId,
        status: { in: ['DRAFT', 'UNDER_REVIEW', 'DOCUMENTS_PENDING', 'CA_ASSIGNED', 'PROCESSING', 'VERIFICATION_PENDING'] },
      },
    })
    
    const activeFilings = activeITRFilings

    // Get completed filings
    const completedITRFilings = await prisma.iTRFiling.count({
      where: {
        assignedCAId: decoded.userId,
        status: { in: ['FILED', 'COMPLETED'] },
      },
    })
    
    const completedFilings = completedITRFilings

    // Calculate monthly earnings from CAEarning model
    const monthStart = new Date()
    monthStart.setDate(1)
    monthStart.setHours(0, 0, 0, 0)

    const monthlyEarningsData = await prisma.cAEarning.findMany({
      where: {
        caId: decoded.userId,
        createdAt: { gte: monthStart },
      },
    })
    
    const monthlyEarnings = monthlyEarningsData.reduce(
      (sum, e) => sum + e.commission, 0
    )

    // Pending tasks (filings in DRAFT, UNDER_REVIEW, or DOCUMENTS_PENDING)
    const pendingTasks = activeFilings

    // Upcoming appointments
    const upcomingAppointments = await prisma.appointment.count({
      where: {
        caId: decoded.userId,
        status: { in: ['SCHEDULED', 'CONFIRMED'] },
        scheduledAt: { gte: new Date() },
      },
    })

    return NextResponse.json({
      clients: totalClients,
      activeFilings,
      completedFilings,
      monthlyEarnings,
      pendingTasks,
      upcomingAppointments,
    })
  } catch (error) {
    console.error('Error fetching CA stats:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

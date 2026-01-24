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

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')

    // Build where clause for ITR filings (only ITR has assignedCAId)
    const whereITR: Record<string, unknown> = { assignedCAId: decoded.userId }

    if (status && status !== 'ALL') {
      whereITR.status = status
    }

    // Fetch ITR filings assigned to this CA
    const itrFilings = await prisma.iTRFiling.findMany({
      where: whereITR,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    // Format filings for response
    const allFilings = itrFilings.map(f => ({
      id: f.id,
      type: `ITR-${f.itrType}`,
      client: f.user.name,
      clientEmail: f.user.email,
      assessmentYear: f.assessmentYear,
      status: f.status,
      assignedDate: f.createdAt,
      updatedAt: f.updatedAt,
    }))

    // Get stats for ITR filings
    const totalFilings = itrFilings.length
    
    const inProgress = await prisma.iTRFiling.count({
      where: { 
        assignedCAId: decoded.userId, 
        status: { in: ['UNDER_REVIEW', 'PROCESSING', 'CA_ASSIGNED'] } 
      },
    })
    
    const pendingDocuments = await prisma.iTRFiling.count({
      where: { 
        assignedCAId: decoded.userId, 
        status: 'DOCUMENTS_PENDING' 
      },
    })
    
    const completed = await prisma.iTRFiling.count({
      where: { 
        assignedCAId: decoded.userId, 
        status: { in: ['FILED', 'COMPLETED'] } 
      },
    })

    return NextResponse.json({
      filings: allFilings,
      stats: {
        total: totalFilings,
        inProgress,
        pendingDocuments,
        completed,
      },
    })
  } catch (error) {
    console.error('Error fetching CA filings:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

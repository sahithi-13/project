import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyRequestToken } from '@/lib/auth'

export async function GET(request: Request) {
  try {
    const decoded = await verifyRequestToken(request)
    if (!decoded) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if user is admin
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { role: true },
    })

    if (user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const status = searchParams.get('status')

    let itrFilings: any[] = []
    let gstFilings: any[] = []

    // Fetch ITR filings
    if (!type || type === 'ALL' || type === 'ITR') {
      const where: any = {}
      if (status && status !== 'ALL') {
        where.status = status
      }

      itrFilings = await prisma.iTRFiling.findMany({
        where,
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
        take: 50,
      })
    }

    // Fetch GST filings
    if (!type || type === 'ALL' || type === 'GST') {
      const where: any = {}
      if (status && status !== 'ALL') {
        where.status = status
      }

      gstFilings = await prisma.gSTFiling.findMany({
        where,
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
        take: 50,
      })
    }

    // Combine and format filings
    const allFilings = [
      ...itrFilings.map(f => ({
        id: f.id,
        type: 'ITR',
        user: f.user.name,
        email: f.user.email,
        details: `ITR-${f.formType} (${f.assessmentYear})`,
        status: f.status,
        createdAt: f.createdAt,
      })),
      ...gstFilings.map(f => ({
        id: f.id,
        type: 'GST',
        user: f.user.name,
        email: f.user.email,
        details: `GSTIN: ${f.gstin}`,
        status: f.status,
        createdAt: f.createdAt,
      })),
    ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    // Get stats
    const totalITR = await prisma.iTRFiling.count()
    const totalGST = await prisma.gSTFiling.count()
    
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const filedToday = await prisma.iTRFiling.count({
      where: { status: 'FILED', updatedAt: { gte: today } },
    }) + await prisma.gSTFiling.count({
      where: { status: 'FILED', updatedAt: { gte: today } },
    })

    return NextResponse.json({
      filings: allFilings,
      stats: {
        total: totalITR + totalGST,
        itr: totalITR,
        gst: totalGST,
        today: filedToday,
      },
    })
  } catch (error) {
    console.error('Error fetching filings:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

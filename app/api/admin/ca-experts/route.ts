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
    const status = searchParams.get('status')

    // Build where clause
    const where: any = { role: 'CA_EXPERT' }
    
    if (status && status !== 'ALL') {
      if (status === 'PENDING') {
        where.emailVerified = null
      } else if (status === 'APPROVED') {
        where.emailVerified = { not: null }
      }
    }

    const caExperts = await prisma.user.findMany({
      where,
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        emailVerified: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    })

    // Get stats
    const totalCAs = await prisma.user.count({ where: { role: 'CA_EXPERT' } })
    const pendingCAs = await prisma.user.count({
      where: { role: 'CA_EXPERT', emailVerified: null },
    })
    const approvedCAs = await prisma.user.count({
      where: { role: 'CA_EXPERT', emailVerified: { not: null } },
    })

    // Calculate average rating (mock for now)
    const avgRating = 4.7

    return NextResponse.json({
      caExperts,
      stats: {
        total: totalCAs,
        pending: pendingCAs,
        approved: approvedCAs,
        avgRating,
      },
    })
  } catch (error) {
    console.error('Error fetching CA experts:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

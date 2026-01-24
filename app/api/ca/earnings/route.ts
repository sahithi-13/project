import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyRequestToken } from '@/lib/auth'

// GET - Fetch CA's earnings
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
      where.createdAt = {} as Record<string, Date>
      if (startDate) {
        (where.createdAt as Record<string, Date>).gte = new Date(startDate)
      }
      if (endDate) {
        (where.createdAt as Record<string, Date>).lte = new Date(endDate)
      }
    }

    if (status) {
      where.status = status
    }

    const earnings = await prisma.cAEarning.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
    })

    // Get client information for each earning
    const clientIds = [...new Set(earnings.map(e => e.clientId))]
    const clients = await prisma.user.findMany({
      where: { id: { in: clientIds } },
      select: { id: true, name: true, email: true },
    })
    const clientMap = new Map(clients.map(c => [c.id, c]))

    // Add client info and calculate netAmount
    const earningsWithDetails = earnings.map(earning => ({
      ...earning,
      client: clientMap.get(earning.clientId) || null,
      netAmount: earning.commission, // Net for CA is their commission
    }))

    // Calculate stats
    const totalEarnings = earnings.reduce((sum, e) => sum + e.commission, 0)
    const totalServiceAmount = earnings.reduce((sum, e) => sum + e.serviceAmount, 0)
    const totalPlatformFee = earnings.reduce((sum, e) => sum + e.platformFee, 0)

    const pendingEarnings = earnings
      .filter(e => e.status === 'PENDING')
      .reduce((sum, e) => sum + e.commission, 0)

    const paidEarnings = earnings
      .filter(e => e.status === 'PAID')
      .reduce((sum, e) => sum + e.commission, 0)

    // Monthly breakdown - count this month's earnings
    const currentMonth = new Date()
    currentMonth.setDate(1)
    currentMonth.setHours(0, 0, 0, 0)

    const monthlyEarningsList = earnings.filter(e => 
      new Date(e.createdAt) >= currentMonth
    )
    const monthlyEarningsTotal = monthlyEarningsList.reduce(
      (sum, e) => sum + e.commission, 0
    )

    return NextResponse.json({
      earnings: earningsWithDetails,
      stats: {
        totalEarnings: totalServiceAmount,
        totalPlatformFee: totalPlatformFee,
        totalNetEarnings: totalEarnings,
        pendingEarnings: pendingEarnings,
        paidEarnings: paidEarnings,
        monthlyEarnings: monthlyEarningsTotal,
        monthlyFilingsCompleted: monthlyEarningsList.length,
      },
    })
  } catch (error) {
    console.error('Error fetching CA earnings:', error)
    return NextResponse.json(
      { error: 'Failed to fetch earnings' },
      { status: 500 }
    )
  }
}

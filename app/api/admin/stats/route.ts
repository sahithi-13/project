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

    // Get user statistics
    const totalUsers = await prisma.user.count()
    const activeUsers = await prisma.user.count({
      where: { emailVerified: { not: null } },
    })
    
    // Get users created in last 30 days for growth calculation
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    const newUsersLastMonth = await prisma.user.count({
      where: { createdAt: { gte: thirtyDaysAgo } },
    })
    const userGrowth = totalUsers > 0 ? ((newUsersLastMonth / totalUsers) * 100).toFixed(1) : '0'

    // Get CA expert statistics
    const totalCAs = await prisma.user.count({
      where: { role: 'CA_EXPERT' },
    })
    const pendingCAs = await prisma.user.count({
      where: { 
        role: 'CA_EXPERT',
        emailVerified: null,
      },
    })

    // Get filing statistics
    const totalITRFilings = await prisma.iTRFiling.count()
    const totalGSTFilings = await prisma.gSTFiling.count()
    const totalFilings = totalITRFilings + totalGSTFilings
    
    const pendingFilings = await prisma.iTRFiling.count({
      where: { status: { in: ['DRAFT', 'UNDER_REVIEW', 'DOCUMENTS_PENDING'] } },
    }) + await prisma.gSTFiling.count({
      where: { status: { in: ['DRAFT', 'UNDER_REVIEW', 'DOCUMENTS_PENDING'] } },
    })

    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const filedToday = await prisma.iTRFiling.count({
      where: { 
        status: 'FILED',
        updatedAt: { gte: today },
      },
    }) + await prisma.gSTFiling.count({
      where: { 
        status: 'FILED',
        updatedAt: { gte: today },
      },
    })

    // Get revenue statistics (mock for now as we don't have payment table)
    const totalRevenue = 12848000 // ₹128.48L - TODO: Calculate from payments
    const monthlyRevenue = 2456000 // ₹24.56L
    const revenueGrowth = '18.3'

    return NextResponse.json({
      users: {
        total: totalUsers,
        active: activeUsers,
        growth: userGrowth,
      },
      caExperts: {
        total: totalCAs,
        pending: pendingCAs,
      },
      filings: {
        total: totalFilings,
        itr: totalITRFilings,
        gst: totalGSTFilings,
        pending: pendingFilings,
        today: filedToday,
      },
      revenue: {
        total: totalRevenue,
        monthly: monthlyRevenue,
        growth: revenueGrowth,
      },
    })
  } catch (error) {
    console.error('Error fetching admin stats:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

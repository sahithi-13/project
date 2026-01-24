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
    const role = searchParams.get('role')
    const status = searchParams.get('status')
    const search = searchParams.get('search')

    // Build where clause
    const where: any = {}
    
    if (role && role !== 'ALL') {
      where.role = role
    }
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ]
    }

    // Status filter
    if (status && status !== 'ALL') {
      if (status === 'ACTIVE') {
        where.emailVerified = { not: null }
      } else if (status === 'PENDING') {
        where.emailVerified = null
      }
    }

    const users = await prisma.user.findMany({
      where,
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        emailVerified: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
      take: 100, // Limit for performance
    })

    // Get stats
    const totalUsers = await prisma.user.count({ where })
    const activeUsers = await prisma.user.count({
      where: { ...where, emailVerified: { not: null } },
    })
    const pendingUsers = await prisma.user.count({
      where: { ...where, emailVerified: null },
    })

    return NextResponse.json({
      users,
      stats: {
        total: totalUsers,
        active: activeUsers,
        pending: pendingUsers,
      },
    })
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

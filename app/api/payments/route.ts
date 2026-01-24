import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyRequestToken } from '@/lib/auth'

// GET - Fetch payment history (transactions) for user or all for admin
export async function GET(request: NextRequest) {
  try {
    const decoded = await verifyRequestToken(request)
    if (!decoded) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')

    const where: Record<string, unknown> = {}
    
    // If not admin, only show user's own payments
    if (decoded.role !== 'ADMIN') {
      where.userId = decoded.userId
    }

    if (status && status !== 'all') {
      where.status = status
    }

    const [transactions, total] = await Promise.all([
      prisma.transaction.findMany({
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
        orderBy: {
          createdAt: 'desc',
        },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.transaction.count({ where }),
    ])

    // Map transactions to payment-like format for frontend
    const payments = transactions.map(t => ({
      id: t.id,
      amount: Number(t.amount),
      status: t.status,
      serviceType: t.serviceType,
      serviceName: t.serviceName,
      description: t.description,
      gatewayId: t.gatewayId,
      invoiceNumber: t.invoiceNumber,
      invoiceUrl: t.invoiceUrl,
      createdAt: t.createdAt,
      updatedAt: t.updatedAt,
      completedAt: t.completedAt,
      user: t.user,
    }))

    // Calculate stats
    const allUserTransactions = await prisma.transaction.findMany({
      where: decoded.role === 'ADMIN' ? {} : { userId: decoded.userId },
      select: { amount: true, status: true },
    })

    const totalAmount = allUserTransactions.reduce(
      (sum, t) => sum + Number(t.amount), 0
    )
    const successfulTransactions = allUserTransactions.filter(
      t => t.status === 'COMPLETED'
    )
    const successfulAmount = successfulTransactions.reduce(
      (sum, t) => sum + Number(t.amount), 0
    )

    return NextResponse.json({
      payments,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
      stats: {
        totalPayments: allUserTransactions.length,
        totalAmount,
        successfulPayments: successfulTransactions.length,
        successfulAmount,
      },
    })
  } catch (error) {
    console.error('Error fetching payments:', error)
    return NextResponse.json(
      { error: 'Failed to fetch payments' },
      { status: 500 }
    )
  }
}

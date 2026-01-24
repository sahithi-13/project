import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyRequestToken } from '@/lib/auth'
import crypto from 'crypto'

// Razorpay configuration (to be moved to env)
const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID || 'rzp_test_xxxxx'

// Service pricing configuration
const SERVICE_PRICING: Record<string, { amount: number; name: string }> = {
  ITR_BASIC: { amount: 499, name: 'ITR Basic Filing' },
  ITR_STANDARD: { amount: 999, name: 'ITR Standard Filing' },
  ITR_PREMIUM: { amount: 1999, name: 'ITR Premium Filing' },
  ITR_ENTERPRISE: { amount: 2999, name: 'ITR Enterprise Filing' },
  GST_FILING: { amount: 499, name: 'GST Monthly Filing' },
  GST_RETURN: { amount: 1299, name: 'GST Return Filing' },
  TAX_CONSULTATION: { amount: 999, name: 'CA Consultation' },
  CA_ASSISTANCE: { amount: 1499, name: 'CA Assistance' },
}

// POST - Initiate a payment by creating a transaction
export async function POST(request: NextRequest) {
  try {
    const decoded = await verifyRequestToken(request)
    if (!decoded) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { serviceType, description } = body

    if (!serviceType) {
      return NextResponse.json(
        { error: 'Service type is required' },
        { status: 400 }
      )
    }

    // Get pricing based on service type
    const serviceInfo = SERVICE_PRICING[serviceType]
    if (!serviceInfo) {
      return NextResponse.json(
        { error: 'Invalid service type' },
        { status: 400 }
      )
    }

    // Create gateway order ID (simulated - in production use Razorpay API)
    const gatewayId = `order_${crypto.randomBytes(12).toString('hex')}`

    // Create transaction record in database
    const transaction = await prisma.transaction.create({
      data: {
        userId: decoded.userId,
        amount: serviceInfo.amount,
        currency: 'INR',
        status: 'PENDING',
        serviceType: serviceType as 'ITR_BASIC' | 'ITR_STANDARD' | 'ITR_PREMIUM' | 'ITR_ENTERPRISE' | 'GST_FILING' | 'GST_RETURN' | 'TAX_CONSULTATION' | 'CA_ASSISTANCE' | 'OTHER',
        serviceName: serviceInfo.name,
        description: description || `Payment for ${serviceInfo.name}`,
        gatewayId: gatewayId,
      },
    })

    // Get user info for prefill
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { name: true, email: true },
    })

    // Return order details for frontend
    return NextResponse.json({
      transaction,
      razorpay: {
        orderId: gatewayId,
        amount: serviceInfo.amount * 100, // In paise for Razorpay
        currency: 'INR',
        keyId: RAZORPAY_KEY_ID,
        prefill: {
          name: user?.name || '',
          email: user?.email || decoded.email || '',
        },
      },
    })
  } catch (error) {
    console.error('Error initiating payment:', error)
    return NextResponse.json(
      { error: 'Failed to initiate payment' },
      { status: 500 }
    )
  }
}

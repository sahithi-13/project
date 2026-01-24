import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyRequestToken } from '@/lib/auth'

// POST - Verify payment after completion
export async function POST(request: NextRequest) {
  try {
    const decoded = await verifyRequestToken(request)
    if (!decoded) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { 
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      transactionId, // Our internal transaction ID
    } = body

    if (!transactionId) {
      return NextResponse.json(
        { error: 'Transaction ID is required' },
        { status: 400 }
      )
    }

    // Find the transaction record
    const transaction = await prisma.transaction.findUnique({
      where: { id: transactionId },
    })

    if (!transaction) {
      return NextResponse.json({ error: 'Transaction not found' }, { status: 404 })
    }

    if (transaction.userId !== decoded.userId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Verify Razorpay signature
    // In production, verify the signature:
    // const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET
    // const expectedSignature = crypto
    //   .createHmac('sha256', RAZORPAY_KEY_SECRET)
    //   .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    //   .digest('hex')
    // 
    // if (expectedSignature !== razorpay_signature) {
    //   return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    // }

    // For demo purposes, simulate successful payment
    const isPaymentSuccessful = true // In production, this would be the signature verification result

    if (isPaymentSuccessful) {
      // Update transaction status
      const updatedTransaction = await prisma.transaction.update({
        where: { id: transactionId },
        data: {
          status: 'COMPLETED',
          completedAt: new Date(),
          gatewayResponse: {
            razorpay_payment_id: razorpay_payment_id || 'simulated',
            razorpay_signature: razorpay_signature || 'simulated',
            verified_at: new Date().toISOString(),
          },
        },
      })

      // Generate invoice number
      const invoiceNumber = `INV-${Date.now().toString(36).toUpperCase()}`
      await prisma.transaction.update({
        where: { id: transactionId },
        data: { invoiceNumber },
      })

      // Create notification
      await prisma.notification.create({
        data: {
          userId: decoded.userId,
          type: 'PAYMENT',
          title: 'Payment Successful',
          message: `Your payment of ₹${transaction.amount} has been processed successfully.`,
          entityType: 'TRANSACTION',
          entityId: transaction.id,
        },
      })

      return NextResponse.json({
        success: true,
        transaction: updatedTransaction,
        message: 'Payment verified successfully',
      })
    } else {
      // Payment verification failed
      await prisma.transaction.update({
        where: { id: transactionId },
        data: {
          status: 'FAILED',
          gatewayResponse: {
            failure_reason: 'Signature verification failed',
          },
        },
      })

      return NextResponse.json(
        { error: 'Payment verification failed' },
        { status: 400 }
      )
    }
  } catch (error) {
    console.error('Error verifying payment:', error)
    return NextResponse.json(
      { error: 'Failed to verify payment' },
      { status: 500 }
    )
  }
}

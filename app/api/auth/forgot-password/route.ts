import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { sendPasswordResetEmail, generateSecureToken } from '@/lib/email'
import { z } from 'zod'

export const dynamic = 'force-dynamic'

const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate input
    const validatedData = forgotPasswordSchema.safeParse(body)
    
    if (!validatedData.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validatedData.error.flatten() },
        { status: 400 }
      )
    }
    
    const { email } = validatedData.data

    // Always return success to prevent email enumeration attacks
    const successResponse = NextResponse.json(
      { 
        message: 'If an account exists with this email, you will receive a password reset link shortly.',
        success: true 
      },
      { status: 200 }
    )

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    })

    if (!user) {
      // Return same response to prevent email enumeration
      return successResponse
    }

    // Check if user account is suspended
    if (user.status === 'SUSPENDED') {
      return successResponse
    }

    // Delete any existing password reset tokens for this user
    await prisma.verificationToken.deleteMany({
      where: {
        identifier: email.toLowerCase(),
        type: 'PASSWORD_RESET',
      },
    })

    // Generate new reset token
    const token = generateSecureToken()
    const expires = new Date(Date.now() + 60 * 60 * 1000) // 1 hour from now

    // Store token in database
    await prisma.verificationToken.create({
      data: {
        identifier: email.toLowerCase(),
        token,
        type: 'PASSWORD_RESET',
        expires,
      },
    })

    // Send password reset email
    await sendPasswordResetEmail(email, user.name, token)

    // Log the activity
    await prisma.activityLog.create({
      data: {
        userId: user.id,
        action: 'PASSWORD_CHANGE', // Using existing enum, ideally PASSWORD_RESET_REQUESTED
        description: `Password reset requested for ${email}`,
        ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
        userAgent: request.headers.get('user-agent'),
      },
    })

    return successResponse
  } catch (error) {
    console.error('Forgot password error:', error)
    return NextResponse.json(
      { error: 'An error occurred. Please try again later.' },
      { status: 500 }
    )
  }
}

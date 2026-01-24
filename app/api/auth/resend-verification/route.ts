import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { sendVerificationEmail, generateSecureToken } from '@/lib/email'
import { z } from 'zod'

export const dynamic = 'force-dynamic'

const resendSchema = z.object({
  email: z.string().email('Invalid email address'),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate input
    const validatedData = resendSchema.safeParse(body)
    
    if (!validatedData.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validatedData.error.flatten() },
        { status: 400 }
      )
    }
    
    const { email } = validatedData.data

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    })

    // Always return success to prevent email enumeration
    const successResponse = NextResponse.json(
      { 
        message: 'If your email is registered and not verified, you will receive a verification email shortly.',
        success: true 
      },
      { status: 200 }
    )

    if (!user) {
      return successResponse
    }

    // Check if already verified
    if (user.emailVerified) {
      return NextResponse.json(
        { message: 'Email is already verified.', alreadyVerified: true },
        { status: 200 }
      )
    }

    // Rate limiting: Check if a verification email was sent recently (within 2 minutes)
    const recentToken = await prisma.verificationToken.findFirst({
      where: {
        identifier: email.toLowerCase(),
        type: 'EMAIL_VERIFY',
        createdAt: {
          gte: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
        },
      },
    })

    if (recentToken) {
      return NextResponse.json(
        { error: 'Please wait a few minutes before requesting another verification email.' },
        { status: 429 }
      )
    }

    // Delete any existing verification tokens for this user
    await prisma.verificationToken.deleteMany({
      where: {
        identifier: email.toLowerCase(),
        type: 'EMAIL_VERIFY',
      },
    })

    // Generate new verification token
    const token = generateSecureToken()
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours from now

    // Store token in database
    await prisma.verificationToken.create({
      data: {
        identifier: email.toLowerCase(),
        token,
        type: 'EMAIL_VERIFY',
        expires,
      },
    })

    // Send verification email
    await sendVerificationEmail(email, user.name, token)

    return successResponse
  } catch (error) {
    console.error('Resend verification error:', error)
    return NextResponse.json(
      { error: 'An error occurred. Please try again later.' },
      { status: 500 }
    )
  }
}

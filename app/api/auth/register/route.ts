import { NextRequest, NextResponse } from 'next/server'
import { registerUser } from '@/lib/auth'
import { registerSchema } from '@/lib/validations'
import { prisma } from '@/lib/db'
import { sendVerificationEmail, generateSecureToken } from '@/lib/email'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate input
    const validatedData = registerSchema.safeParse(body)
    
    if (!validatedData.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validatedData.error.flatten() },
        { status: 400 }
      )
    }
    
    const { name, email, password, phone } = validatedData.data
    
    // Register user
    const user = await registerUser({ name, email, password, phone })
    
    // Generate email verification token
    const verificationToken = generateSecureToken()
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

    // Store verification token
    await prisma.verificationToken.create({
      data: {
        identifier: email.toLowerCase(),
        token: verificationToken,
        type: 'EMAIL_VERIFY',
        expires,
      },
    })

    // Send verification email (non-blocking)
    sendVerificationEmail(email, name, verificationToken).catch((err) => {
      console.error('Failed to send verification email:', err)
    })

    // Log registration activity
    await prisma.activityLog.create({
      data: {
        userId: user.id,
        action: 'LOGIN', // Using existing enum - ideally REGISTER
        description: `New user registered: ${email}`,
        ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
        userAgent: request.headers.get('user-agent'),
      },
    })
    
    return NextResponse.json(
      { 
        message: 'Registration successful! Please check your email to verify your account.', 
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
        emailSent: true
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Registration error:', error)
    
    if (error instanceof Error) {
      if (error.message.includes('already exists')) {
        return NextResponse.json(
          { error: 'User with this email already exists' },
          { status: 409 }
        )
      }
    }
    
    return NextResponse.json(
      { error: 'Registration failed. Please try again.' },
      { status: 500 }
    )
  }
}

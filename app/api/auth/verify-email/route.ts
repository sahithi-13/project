import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get('token')

    if (!token) {
      return NextResponse.json(
        { error: 'Verification token is required' },
        { status: 400 }
      )
    }

    // Find the verification token
    const verificationToken = await prisma.verificationToken.findFirst({
      where: {
        token,
        type: 'EMAIL_VERIFY',
      },
    })

    if (!verificationToken) {
      return NextResponse.json(
        { error: 'Invalid verification link. Please request a new one.' },
        { status: 400 }
      )
    }

    // Check if token has expired
    if (verificationToken.expires < new Date()) {
      // Delete expired token
      await prisma.verificationToken.delete({
        where: { id: verificationToken.id },
      })
      
      return NextResponse.json(
        { error: 'This verification link has expired. Please request a new one.' },
        { status: 400 }
      )
    }

    // Find the user
    const user = await prisma.user.findUnique({
      where: { email: verificationToken.identifier },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found.' },
        { status: 404 }
      )
    }

    // Check if already verified
    if (user.emailVerified) {
      // Clean up the token
      await prisma.verificationToken.delete({
        where: { id: verificationToken.id },
      })
      
      return NextResponse.json(
        { message: 'Email already verified.', alreadyVerified: true },
        { status: 200 }
      )
    }

    // Update user as verified and set status to ACTIVE
    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: new Date(),
        status: 'ACTIVE',
      },
    })

    // Delete the verification token (single use)
    await prisma.verificationToken.delete({
      where: { id: verificationToken.id },
    })

    // Log the activity
    await prisma.activityLog.create({
      data: {
        userId: user.id,
        action: 'PROFILE_UPDATE', // Using existing enum
        description: 'Email address verified successfully',
        ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
        userAgent: request.headers.get('user-agent'),
      },
    })

    return NextResponse.json(
      { 
        message: 'Email verified successfully! You can now access all features.',
        success: true 
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Email verification error:', error)
    return NextResponse.json(
      { error: 'An error occurred. Please try again later.' },
      { status: 500 }
    )
  }
}

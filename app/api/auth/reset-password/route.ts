import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { hashPassword } from '@/lib/auth'
import { z } from 'zod'

export const dynamic = 'force-dynamic'

const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Token is required'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate input
    const validatedData = resetPasswordSchema.safeParse(body)
    
    if (!validatedData.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validatedData.error.flatten() },
        { status: 400 }
      )
    }
    
    const { token, password } = validatedData.data

    // Find the verification token
    const verificationToken = await prisma.verificationToken.findFirst({
      where: {
        token,
        type: 'PASSWORD_RESET',
      },
    })

    if (!verificationToken) {
      return NextResponse.json(
        { error: 'Invalid or expired reset link. Please request a new one.' },
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
        { error: 'This reset link has expired. Please request a new one.' },
        { status: 400 }
      )
    }

    // Find the user
    const user = await prisma.user.findUnique({
      where: { email: verificationToken.identifier },
      include: { password: true },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found.' },
        { status: 404 }
      )
    }

    // Hash the new password
    const hashedPassword = await hashPassword(password)

    // Check if the new password matches any of the previous passwords
    if (user.password) {
      const { previousHashes } = user.password
      
      // Import verifyPassword to check against previous hashes
      const bcrypt = await import('bcryptjs')
      
      // Check against current password
      const matchesCurrent = await bcrypt.compare(password, user.password.hash)
      if (matchesCurrent) {
        return NextResponse.json(
          { error: 'New password cannot be the same as your current password.' },
          { status: 400 }
        )
      }
      
      // Check against previous passwords (last 5)
      for (const prevHash of previousHashes.slice(-5)) {
        const matchesPrevious = await bcrypt.compare(password, prevHash)
        if (matchesPrevious) {
          return NextResponse.json(
            { error: 'New password cannot be the same as any of your last 5 passwords.' },
            { status: 400 }
          )
        }
      }
    }

    // Update or create password
    if (user.password) {
      await prisma.password.update({
        where: { userId: user.id },
        data: {
          hash: hashedPassword,
          previousHashes: {
            push: user.password.hash, // Add current hash to history
          },
          lastChanged: new Date(),
          mustChange: false,
        },
      })
    } else {
      await prisma.password.create({
        data: {
          userId: user.id,
          hash: hashedPassword,
          lastChanged: new Date(),
        },
      })
    }

    // Delete the verification token (single use)
    await prisma.verificationToken.delete({
      where: { id: verificationToken.id },
    })

    // Delete all existing sessions for security (force re-login)
    await prisma.session.deleteMany({
      where: { userId: user.id },
    })

    // Log the activity
    await prisma.activityLog.create({
      data: {
        userId: user.id,
        action: 'PASSWORD_CHANGE',
        description: 'Password was reset successfully via forgot password flow',
        ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
        userAgent: request.headers.get('user-agent'),
      },
    })

    return NextResponse.json(
      { 
        message: 'Password has been reset successfully. Please login with your new password.',
        success: true 
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Reset password error:', error)
    return NextResponse.json(
      { error: 'An error occurred. Please try again later.' },
      { status: 500 }
    )
  }
}

// GET endpoint to verify token validity
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get('token')

    if (!token) {
      return NextResponse.json(
        { valid: false, error: 'Token is required' },
        { status: 400 }
      )
    }

    const verificationToken = await prisma.verificationToken.findFirst({
      where: {
        token,
        type: 'PASSWORD_RESET',
      },
    })

    if (!verificationToken) {
      return NextResponse.json(
        { valid: false, error: 'Invalid reset link' },
        { status: 400 }
      )
    }

    if (verificationToken.expires < new Date()) {
      return NextResponse.json(
        { valid: false, error: 'Reset link has expired' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { valid: true, email: verificationToken.identifier },
      { status: 200 }
    )
  } catch (error) {
    console.error('Token verification error:', error)
    return NextResponse.json(
      { valid: false, error: 'An error occurred' },
      { status: 500 }
    )
  }
}

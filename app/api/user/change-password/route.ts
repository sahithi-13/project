import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/auth'
import db from '@/lib/db'
import bcrypt from 'bcryptjs'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('auth-token')?.value

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const decoded = await verifyToken(token)
    if (!decoded) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }
    const userId = decoded.userId

    const body = await request.json()
    const { currentPassword, newPassword } = body

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: 'Current password and new password are required' },
        { status: 400 }
      )
    }

    // Validate password strength
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    if (!passwordRegex.test(newPassword)) {
      return NextResponse.json(
        { 
          error: 'Password must be at least 8 characters with uppercase, lowercase, number and special character' 
        },
        { status: 400 }
      )
    }

    const user = await db.user.findUnique({
      where: { id: userId },
      include: {
        password: true,
      },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    if (!user.password) {
      return NextResponse.json({ error: 'Password not set' }, { status: 400 })
    }

    // Verify current password
    const isValidPassword = await bcrypt.compare(currentPassword, user.password.hash)
    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Current password is incorrect' },
        { status: 400 }
      )
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 12)

    // Update password
    await db.password.update({
      where: { userId: userId },
      data: { 
        hash: hashedPassword,
        lastChanged: new Date(),
      },
    })

    return NextResponse.json({ message: 'Password changed successfully' })
  } catch (error) {
    console.error('Change password error:', error)
    return NextResponse.json(
      { error: 'Failed to change password' },
      { status: 500 }
    )
  }
}

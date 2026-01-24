import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const user = await getCurrentUser()
    
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Not authenticated' },
        { status: 401 }
      )
    }
    
    return NextResponse.json({ success: true, user }, { status: 200 })
  } catch (error: any) {
    console.error('Get user error:', error)
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to get user' },
      { status: 500 }
    )
  }
}

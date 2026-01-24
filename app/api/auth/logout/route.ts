import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export const dynamic = 'force-dynamic'

export async function POST() {
  try {
    const cookieStore = await cookies()
    cookieStore.delete('auth-token')
    
    return NextResponse.json(
      { message: 'Logged out successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json(
      { error: 'Logout failed' },
      { status: 500 }
    )
  }
}

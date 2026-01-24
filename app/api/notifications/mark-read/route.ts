import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyRequestToken } from '@/lib/auth'

// PUT - Mark notification(s) as read
export async function PUT(request: NextRequest) {
  try {
    const decoded = await verifyRequestToken(request)
    if (!decoded) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { notificationId, markAll } = body

    if (markAll) {
      // Mark all notifications as read
      await prisma.notification.updateMany({
        where: {
          userId: decoded.userId,
          isRead: false,
        },
        data: {
          isRead: true,
          readAt: new Date(),
        },
      })

      return NextResponse.json({ message: 'All notifications marked as read' })
    } else if (notificationId) {
      // Mark single notification as read
      const notification = await prisma.notification.findUnique({
        where: { id: notificationId },
      })

      if (!notification) {
        return NextResponse.json({ error: 'Notification not found' }, { status: 404 })
      }

      if (notification.userId !== decoded.userId) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
      }

      await prisma.notification.update({
        where: { id: notificationId },
        data: {
          isRead: true,
          readAt: new Date(),
        },
      })

      return NextResponse.json({ message: 'Notification marked as read' })
    } else {
      return NextResponse.json(
        { error: 'notificationId or markAll is required' },
        { status: 400 }
      )
    }
  } catch (error) {
    console.error('Error marking notification as read:', error)
    return NextResponse.json(
      { error: 'Failed to mark notification as read' },
      { status: 500 }
    )
  }
}

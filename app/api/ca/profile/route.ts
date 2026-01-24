import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyRequestToken } from '@/lib/auth'

// GET - Fetch CA's profile
export async function GET(request: NextRequest) {
  try {
    const decoded = await verifyRequestToken(request)
    if (!decoded) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (decoded.role !== 'CA_EXPERT' && decoded.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const caProfile = await prisma.cAProfile.findUnique({
      where: { userId: decoded.userId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            image: true,
          },
        },
      },
    })

    if (!caProfile) {
      // Return empty profile if not created yet
      return NextResponse.json({
        profile: null,
        user: await prisma.user.findUnique({
          where: { id: decoded.userId },
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            image: true,
          },
        }),
      })
    }

    // Get performance stats (only ITR filings have assignedCAId)
    const completedITR = await prisma.iTRFiling.count({
      where: {
        assignedCAId: decoded.userId,
        status: { in: ['COMPLETED', 'FILED'] },
      },
    })

    const activeClients = await prisma.iTRFiling.findMany({
      where: {
        assignedCAId: decoded.userId,
        status: { notIn: ['COMPLETED', 'REJECTED', 'FILED'] },
      },
      select: {
        userId: true,
      },
      distinct: ['userId'],
    })

    return NextResponse.json({
      profile: caProfile,
      stats: {
        completedFilings: completedITR,
        completedITR,
        activeClients: activeClients.length,
        rating: caProfile.rating,
        totalReviews: caProfile.totalReviews,
      },
    })
  } catch (error) {
    console.error('Error fetching CA profile:', error)
    return NextResponse.json(
      { error: 'Failed to fetch profile' },
      { status: 500 }
    )
  }
}

// POST - Create CA profile
export async function POST(request: NextRequest) {
  try {
    const decoded = await verifyRequestToken(request)
    if (!decoded) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (decoded.role !== 'CA_EXPERT' && decoded.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await request.json()
    const {
      membershipNumber,
      firmName,
      firmAddress,
      experience,
      specializations,
      qualification,
      bio,
    } = body

    // Check if profile already exists
    const existingProfile = await prisma.cAProfile.findUnique({
      where: { userId: decoded.userId },
    })

    if (existingProfile) {
      return NextResponse.json(
        { error: 'Profile already exists. Use PUT to update.' },
        { status: 409 }
      )
    }

    const caProfile = await prisma.cAProfile.create({
      data: {
        userId: decoded.userId,
        membershipNumber,
        firmName,
        firmAddress,
        experience: experience || 0,
        specializations: specializations || [],
        qualification,
        bio,
        isVerified: false,
      },
    })

    return NextResponse.json({ profile: caProfile }, { status: 201 })
  } catch (error) {
    console.error('Error creating CA profile:', error)
    return NextResponse.json(
      { error: 'Failed to create profile' },
      { status: 500 }
    )
  }
}

// PUT - Update CA profile
export async function PUT(request: NextRequest) {
  try {
    const decoded = await verifyRequestToken(request)
    if (!decoded) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (decoded.role !== 'CA_EXPERT' && decoded.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await request.json()
    const {
      firmName,
      firmAddress,
      experience,
      specializations,
      qualification,
      bio,
      isAvailable,
      maxActiveClients,
    } = body

    const existingProfile = await prisma.cAProfile.findUnique({
      where: { userId: decoded.userId },
    })

    if (!existingProfile) {
      return NextResponse.json(
        { error: 'Profile not found. Create one first.' },
        { status: 404 }
      )
    }

    const updateData: Record<string, unknown> = {}
    if (firmName !== undefined) updateData.firmName = firmName
    if (firmAddress !== undefined) updateData.firmAddress = firmAddress
    if (experience !== undefined) updateData.experience = experience
    if (specializations !== undefined) updateData.specializations = specializations
    if (qualification !== undefined) updateData.qualification = qualification
    if (bio !== undefined) updateData.bio = bio
    if (isAvailable !== undefined) updateData.isAvailable = isAvailable
    if (maxActiveClients !== undefined) updateData.maxActiveClients = maxActiveClients

    const caProfile = await prisma.cAProfile.update({
      where: { userId: decoded.userId },
      data: updateData,
    })

    return NextResponse.json({ profile: caProfile })
  } catch (error) {
    console.error('Error updating CA profile:', error)
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    )
  }
}

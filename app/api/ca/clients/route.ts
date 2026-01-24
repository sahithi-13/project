import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyRequestToken } from '@/lib/auth'

// GET - Fetch CA's clients (users with assigned filings)
export async function GET(request: NextRequest) {
  try {
    const decoded = await verifyRequestToken(request)
    if (!decoded) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (decoded.role !== 'CA_EXPERT' && decoded.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')

    // Get all ITR filings assigned to this CA with user details
    const itrFilings = await prisma.iTRFiling.findMany({
      where: {
        assignedCAId: decoded.userId,
      },
      include: {
        user: true,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    })

    // Combine and deduplicate clients
    const clientMap = new Map()
    
    itrFilings.forEach(filing => {
      const existingClient = clientMap.get(filing.userId)
      if (existingClient) {
        existingClient.itrFilings.push(filing)
      } else {
        const { user, ...filingData } = filing
        clientMap.set(filing.userId, {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          itrFilings: [filingData],
          gstFilings: [],
        })
      }
    })

    let clients = Array.from(clientMap.values())

    // Apply search filter
    if (search) {
      const searchLower = search.toLowerCase()
      clients = clients.filter(client => 
        client.name?.toLowerCase().includes(searchLower) ||
        client.email?.toLowerCase().includes(searchLower) ||
        client.phone?.includes(search)
      )
    }

    // Calculate stats
    const stats = {
      totalClients: clients.length,
      activeFilings: itrFilings.filter(f => 
        !['COMPLETED', 'REJECTED', 'FILED'].includes(f.status)
      ).length,
      completedFilings: itrFilings.filter(f => 
        ['COMPLETED', 'FILED'].includes(f.status)
      ).length,
      pendingDocuments: itrFilings.filter(f => 
        f.status === 'DOCUMENTS_PENDING'
      ).length,
    }

    return NextResponse.json({ clients, stats })
  } catch (error) {
    console.error('Error fetching CA clients:', error)
    return NextResponse.json(
      { error: 'Failed to fetch clients' },
      { status: 500 }
    )
  }
}

import { NextRequest } from 'next/server'
import { handleDownload } from '../route'

export const dynamic = 'force-dynamic'

// GET - Download document file
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return handleDownload(request, { params })
}
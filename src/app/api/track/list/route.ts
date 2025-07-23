// app/api/tracks/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { trackTable } from '@/db/schema'

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const offset = Number(searchParams.get('offset') || '0')
    const limit = Number(searchParams.get('limit') || '5')

    const data = await db
        .select()
        .from(trackTable)
        .orderBy(trackTable.createdAt)
        .limit(limit)
        .offset(offset)

    return NextResponse.json(data)
}

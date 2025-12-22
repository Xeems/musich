import { db } from '@/db'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    const { id } = await params
    try {
        const track = await db.query.TrackTable.findFirst({
            where: (tracks, { eq }) => eq(tracks.id, id),
        })
        if (!track) return NextResponse.json({}, { status: 404 })

        return NextResponse.json(
            { data: track },
            {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            },
        )
    } catch (e) {
        console.error(e)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 },
        )
    }
}

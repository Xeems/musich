// app/api/tracks/route.ts
import { NextRequest, NextResponse } from 'next/server'
import getTracks from '@/actions/getTracks'
import { TrackType } from '../../../../../@types/track'

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const offset = Number(searchParams.get('offset') || '0')
    const limit = Number(searchParams.get('limit') || '5')

    const data = await getTracks(offset, limit)

    return NextResponse.json(data as TrackType[])
}

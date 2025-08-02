import fs from 'fs'
import path from 'path'
import { NextRequest } from 'next/server'

export async function GET(
    req: NextRequest,
    { params }: { params: { track: string; segment: string } },
) {
    const { track, segment } = await params
    const filePath = path.resolve('D:/musichFiles/hls', track, segment)

    if (!fs.existsSync(filePath))
        return new Response('Not found', { status: 404 })

    const stream = fs.createReadStream(filePath)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return new Response(stream as any, {
        headers: { 'Content-Type': 'video/MP2T' },
    })
}

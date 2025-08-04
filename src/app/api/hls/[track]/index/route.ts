import { NextRequest } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ track: string }> },
) {
    try {
        const param = await params
        const decodedTrack = decodeURIComponent(param.track)

        const indexPath = path.join(
            process.env.TRACK_DIR!,
            decodedTrack,
            'index.m3u8',
        )
        console.log('Ищем файл:', indexPath)

        if (!fs.existsSync(indexPath))
            return new Response('Not found', { status: 404 })

        const stream = fs.createReadStream(indexPath)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return new Response(stream as any, {
            headers: { 'Content-Type': 'application/vnd.apple.mpegurl' },
        })
    } catch (error) {
        console.log(error)
        return new Response('No track found', {
            status: 400,
        })
    }
}

import { NextRequest } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET(
    req: NextRequest,
    { params }: { params: { track: string } },
) {
    try {
        const { track } = await params
        const trackPath = path.resolve(process.env.TRACK_DIR!, track)

        const indexPath = path.join(trackPath, 'index.m3u8')
        if (!fs.existsSync(indexPath))
            return new Response('Not found', { status: 404 })

        const stream = fs.createReadStream(indexPath)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return new Response(stream as any, {
            headers: { 'Content-Type': 'application/vnd.apple.mpegurl' },
        })
    } catch (error) {
        console.log(error)
        return new Response('', {
            status: 400,
        })
    }
}

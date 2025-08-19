import { NextRequest, NextResponse } from 'next/server'
import { trackUploadSchema } from '../../../../@types/validators'
import { promises as fs } from 'fs'
import path from 'path'
import { db } from '@/db'
import { tracks } from '@/db/schema'
import { randomUUID } from 'crypto'
import { getAudioMetadata } from '@/lib/utils'
import { convertToHLS } from '@/lib/hlsTranscoder'

async function saveFile(
    file: File,
    dir: string,
    prefix: string,
): Promise<string> {
    const buffer = Buffer.from(await file.arrayBuffer())
    const safeName = file.name.replace(/\s+/g, '_')
    //to-do
    const filename = `${prefix}_${randomUUID()}_${safeName}`
    const filepath = path.join(dir, filename)
    await fs.writeFile(filepath, buffer)
    return filename
}

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData()
        const obj: Record<string, unknown> = {}

        for (const [key, value] of formData.entries()) {
            obj[key] = value
        }

        const parsed = await trackUploadSchema.parseAsync(obj)

        if (!process.env.COVER_DIR || !process.env.TRACK_DIR)
            throw new Error('Unknown path to file storage directories')

        const coverDir = process.env.COVER_DIR
        const trackDir = process.env.TRACK_DIR

        await Promise.all([
            fs.mkdir(coverDir, { recursive: true }),
            fs.mkdir(trackDir, { recursive: true }),
        ])

        const [coverName, outDir] = await Promise.all([
            saveFile(parsed.coverImageFile, coverDir, 'cover'),
            convertToHLS(parsed.trackFile),
        ])

        if (!outDir) throw new Error('track file unsaved')

        const buffer = await parsed.trackFile.arrayBuffer()

        const trackMetadata = await getAudioMetadata(buffer)
        if (!trackMetadata) throw new Error('No track metadata')

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const dbData = await db.insert(tracks).values({
            author: parsed.author,
            name: parsed.name,
            trackDir: outDir,
            imageName: coverName,
            createdAt: new Date(),
            duration: trackMetadata.format.duration!,
        })

        return new NextResponse(JSON.stringify({ success: true }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        })
    } catch (error) {
        console.error('Validation error:', error)

        return new NextResponse(
            JSON.stringify({
                success: false,
                error: (error as Error)?.message,
            }),
            {
                status: 400,
            },
        )
    }
}

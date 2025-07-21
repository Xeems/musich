import { NextRequest, NextResponse } from 'next/server'
import { trackUploadSchema } from '../../../../@types/validators'
import { promises as fs } from 'fs'
import path from 'path'
import { db } from '@/db'
import { trackTable } from '@/db/schema'
import { ZodError } from 'zod'
import { randomUUID } from 'crypto'

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
    return filepath
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

        const [coverUrl, trackUrl] = await Promise.all([
            saveFile(parsed.coverImageFile, coverDir, 'cover'),
            saveFile(parsed.trackFile, trackDir, 'track'),
        ])

        const dbData = await db.insert(trackTable).values({
            author: parsed.author,
            name: parsed.name,
            filePath: trackUrl,
            imagePath: coverUrl,
        })

        return new NextResponse(JSON.stringify({ success: true }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        })
    } catch (error) {
        console.error('Validation error:', error)

        if (error instanceof ZodError) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Validation failed',
                    issues: error.flatten().fieldErrors,
                },
                { status: 422 },
            )
        }

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

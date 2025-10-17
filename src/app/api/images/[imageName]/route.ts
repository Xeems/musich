import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

export async function GET(
    req: NextRequest,
    { params }: { params: { imageName: string } },
) {
    try {
        if (!process.env.COVER_DIR)
            throw new Error('Unknown path to file storage directories')

        const coverDir = process.env.COVER_DIR
        //don't delete await!!!
        const { imageName } = await params
        const filePath = path.join(coverDir, imageName)

        const imageBuffer = await fs.readFile(filePath)
        const ext = path.extname(imageName).slice(1)

        const arrayBuffer = imageBuffer.buffer.slice(
            imageBuffer.byteOffset,
            imageBuffer.byteOffset + imageBuffer.byteLength,
        ) as ArrayBuffer

        return new NextResponse(arrayBuffer, {
            headers: {
                'Content-Type': `image/${ext}`,
            },
        })
    } catch (error) {
        console.log(error)
        return new NextResponse('Image not found', { status: 404 })
    }
}

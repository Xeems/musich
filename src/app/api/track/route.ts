import { NextRequest, NextResponse } from 'next/server'
import { trackUploadSchema } from '../../../../@types/validators'

export async function POST(request: NextRequest) {
    try {
        const json = await request.json()
        const data = await trackUploadSchema.parseAsync(json)
        console.log(data)

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
                headers: { 'Content-Type': 'application/json' },
            },
        )
    }
}

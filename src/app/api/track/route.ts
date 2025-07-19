import { NextRequest, NextResponse } from 'next/server'
import { trackUploadSchema } from '../../../../@types/validators'

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData()
        const obj: Record<string, unknown> = {}

        for (const [key, value] of formData.entries()) {
            obj[key] = value
        }

        const parsed = await trackUploadSchema.parseAsync(obj)
<<<<<<< HEAD
=======
        console.log(parsed)
>>>>>>> a4f2488 (track upload dialog)

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

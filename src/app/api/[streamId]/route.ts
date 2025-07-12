import { NextRequest, NextResponse } from 'next/server'
import { globalStreamDispatcher } from '@/server/stream-manager'

export async function POST(req: NextRequest) {
    const formData = await req.formData()
    const file = formData.get('track') as File

    if (!file) {
        return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const stream = file.stream()
    const reader = stream.getReader()
    let result

    while (!(result = await reader.read()).done) {
        globalStreamDispatcher.broadcast(result.value)
    }

    globalStreamDispatcher.end()

    return NextResponse.json({ ok: true })
}

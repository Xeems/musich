import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    try {
        return new NextResponse(JSON.stringify({ success: true }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        })
    } catch (e) {
        console.error(e)
    }
}

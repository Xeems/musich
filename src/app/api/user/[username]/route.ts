import { NextRequest, NextResponse } from 'next/server'
import { newUserSchema } from '../../../../../@types/validators'
import signUp from '@/actions/signUp'

export async function GET(
    request: NextRequest,
    { params }: { params: { username: string } },
) {
    try {
        const { username } = await params

        if (!username) {
            return NextResponse.json(
                { error: 'Username is required' },
                { status: 400 },
            )
        }

        const userData = await newUserSchema.parseAsync({ username })
        const user = await signUp(userData.username)

        const res = NextResponse.json(user)
        res.cookies.set('user', JSON.stringify(user), {
            httpOnly: false,
            path: '/',
            maxAge: 60 * 60 * 24 * 7,
        })

        return res
    } catch (e) {
        console.error(e)
        return NextResponse.json({ error: 'Ошибка' }, { status: 500 })
    }
}

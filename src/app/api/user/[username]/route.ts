import { NextRequest, NextResponse } from 'next/server'
import { newUserSchema } from '../../../../../@types/validators'
import getUser from '@/actions/getUser'

export async function GET(
    request: NextRequest,
    { params }: { params: { username: string } },
) {
    try {
        const username = await params.username

        if (!username) {
            return NextResponse.json(
                { error: 'Username is required' },
                { status: 400 },
            )
        }

        const userData = await newUserSchema.parseAsync({ username })
        const user = await getUser(userData.username)
        console.log(user)

        return NextResponse.json(user)
    } catch (e) {
        console.error(e)
        return NextResponse.json({ error: 'Ошибка' }, { status: 500 })
    }
}

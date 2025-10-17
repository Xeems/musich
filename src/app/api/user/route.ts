import signUp from '@/authentification/actions/signUp'
import { NextRequest, NextResponse } from 'next/server'
import { newUserSchema } from '../../../../@types/validators'
import createUserSession from '@/authentification/actions/createUserSession'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const userData = await newUserSchema.parseAsync(body)
        const data = await signUp(userData)

        console.log(data)
        return new NextResponse('')
    } catch (error) {
        console.log(error)
        return new NextResponse('')
    }
}

export async function GET(request: NextRequest) {
    try {
        const body = await request.json()
        const userData = await newUserSchema.parseAsync(body)
        const user = await createUserSession(userData.username)
        console.log(user)
    } catch (error) {
        console.log(error)
        return new NextResponse('')
    }
}

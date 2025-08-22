import createUser from '@/actions/createUser'
import { NextRequest, NextResponse } from 'next/server'
import { newUserSchema } from '../../../../@types/validators'
import signUp from '@/actions/signUp'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const userData = await newUserSchema.parseAsync(body)
        const data = await createUser(userData.username)

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
        const user = await signUp(userData.username)
        console.log(user)
    } catch (error) {
        console.log(error)
        return new NextResponse('')
    }
}

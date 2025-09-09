'use server'

import z from 'zod'
import { signInSchema } from '../../../@types/validators'
import { db } from '@/db'
import { eq } from 'drizzle-orm'
import { UserTable } from '@/db/schema'
import { comparePasswords } from '../passwordHasher'
import createUserSession from './createUserSession'
import { redirect } from 'next/navigation'
import { ActionResultType } from '../../../@types/actionResult'

export default async function signInCredentials(
    credentials: z.infer<typeof signInSchema>,
): Promise<ActionResultType> {
    try {
        const { success, data } = signInSchema.safeParse(credentials)

        if (!success) return { success: false, message: 'Unable to log you in' }

        const user = await db.query.UserTable.findFirst({
            columns: {
                password: true,
                salt: true,
                id: true,
                email: true,
            },
            where: eq(UserTable.email, data.email),
        })

        if (user == null || user.password == null || user.salt == null) {
            return { success: false, message: 'Unable to log you in' }
        }

        const isCorrectPassword = await comparePasswords({
            hashedPassword: user.password,
            password: credentials.password,
            salt: user.salt,
        })

        if (!isCorrectPassword)
            return { success: false, message: 'Unable to log you in' }

        await createUserSession(user.id)
    } catch (error) {
        if (error instanceof Error) console.error(error)
        return { success: false, message: 'Unable to log you in' }
    }
    redirect('/')
}

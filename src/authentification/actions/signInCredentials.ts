'use server'

import z from 'zod'
import { signInSchema } from '../../../@types/validators'
import { db } from '@/db'
import { eq } from 'drizzle-orm'
import { UserTable } from '@/db/schema'
import { comparePasswords } from '../passwordHasher'
import createUserSession from './createUserSession'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function signInCredentials(
    credentials: z.infer<typeof signInSchema>,
) {
    const { success, data } = signInSchema.safeParse(credentials)

    if (!success) return 'Unable to log you in'

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
        return 'Unable to log you in'
    }

    const isCorrectPassword = await comparePasswords({
        hashedPassword: user.password,
        password: credentials.password,
        salt: user.salt,
    })

    if (!isCorrectPassword) return 'Unable to log you in'

    await createUserSession(user.id)

    redirect('/')
}

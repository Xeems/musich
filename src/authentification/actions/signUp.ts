'use server'

import { UserTable } from '@/db/schema'
import { eq } from 'drizzle-orm'
import z from 'zod'
import { newUserSchema } from '../../../@types/validators'
import { generateSalt, hashPassword } from '../passwordHasher'
import createUserSession from './createUserSession'
import { redirect } from 'next/navigation'
import { db } from '@/db'

export default async function signUp(data: z.infer<typeof newUserSchema>) {
    try {
        const parsed = await newUserSchema.safeParseAsync(data)
        if (!parsed.data || parsed.error)
            return {
                success: false,
                message: 'Invalid user data',
            }

        const user = parsed.data

        const existingUser = await db.query.UserTable.findFirst({
            where: eq(UserTable.email, user.email),
        })

        if (existingUser != null)
            return {
                success: false,
                message: 'Account already exists for this email',
            }

        const salt = generateSalt()
        const hashedPassword = await hashPassword(user.password, salt)

        const [newUser] = await db
            .insert(UserTable)
            .values({
                username: user.username,
                email: user.email,
                salt: salt,
                password: hashedPassword,
            })
            .returning({
                id: UserTable.id,
                username: UserTable.username,
                email: UserTable.email,
            })

        await createUserSession(newUser.id)
    } catch (error) {
        if (error instanceof Error) {
            console.error(error)
        }

        return { success: false, message: 'Unknown error' }
    }
    redirect('/')
}

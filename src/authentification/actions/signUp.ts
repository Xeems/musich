'use server'

import { db } from '@/db'
import { PlaylistTable, UserTable } from '@/db/schema'
import { eq } from 'drizzle-orm'
import z from 'zod'
import { newUserSchema } from '../../../@types/validators'
import { generateSalt, hashPassword } from '../passwordHasher'
import createUserSession from './createUserSession'
import { redirect } from 'next/navigation'
import { ActionResultType } from '../../../@types/actionResult'

export default async function signUp(
    data: z.infer<typeof newUserSchema>,
): Promise<ActionResultType> {
    try {
        const userdata = await newUserSchema.safeParseAsync(data)
        if (!userdata.data || userdata.error)
            throw new Error('Invalid user data')

        const user = userdata.data

        const existingUser = await db.query.UserTable.findFirst({
            where: eq(UserTable.email, user.email),
        })

        if (existingUser != null)
            throw new Error('Account already exists for this email')

        const salt = generateSalt()
        const hashedPassword = await hashPassword(data.password, salt)

        const newUser = await db.transaction(async (tx) => {
            const [newUser] = await tx
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

            await tx.insert(PlaylistTable).values({
                name: `${user.username}'s tracks`,
                type: 'default',
                creatorId: newUser.id,
            })

            return newUser
        })
        await createUserSession(newUser.id)
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message)
            return { success: false, message: error.message }
        }
        return { success: false, message: 'Unknown error' }
    }
    redirect('/')
}

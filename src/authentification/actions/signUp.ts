'use server'

import { db } from '@/db'
import { PlaylistTable, UserTable } from '@/db/schema'
import { eq } from 'drizzle-orm'
import z from 'zod'
import { newUserSchema } from '../../../@types/validators'
import { generateSalt, hashPassword } from '../passwordHasher'

export default async function signUp(data: z.infer<typeof newUserSchema>) {
    try {
        const userdata = await newUserSchema.safeParseAsync(data)
        if (!userdata.data || userdata.error) return 'Invalid user data'

        const user = userdata.data

        const existingUser = await db.query.UserTable.findFirst({
            where: eq(UserTable.email, user.email),
        })

        if (existingUser != null) return 'Account already exists for this email'

        const salt = generateSalt()
        const hashedPassword = await hashPassword(data.password, salt)

        return await db.transaction(async (tx) => {
            const exists = await tx.query.UserTable.findFirst({
                where: eq(UserTable.username, user.username),
            })
            if (exists) throw new Error('Username already taken')

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

            const [defaultPlaylist] = await tx
                .insert(PlaylistTable)
                .values({
                    name: `${user.username}'s tracks`,
                    type: 'default',
                    creatorId: newUser.id,
                })
                .returning()

            return {
                user: newUser,
                playlist: defaultPlaylist,
            }
        })
    } catch (error) {
        console.log(error)
    }
}

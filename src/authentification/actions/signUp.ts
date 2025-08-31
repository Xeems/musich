'use server'

import { db } from '@/db'
import { PlaylistTable, UserTable } from '@/db/schema'
import { eq } from 'drizzle-orm'

export default async function signUp(name: string) {
    try {
        return await db.transaction(async (tx) => {
            const exists = await tx.query.UserTable.findFirst({
                where: eq(UserTable.name, name),
            })
            if (exists) throw new Error('Username already taken')

            const [newUser] = await tx
                .insert(UserTable)
                .values({
                    name,
                })
                .returning()

            const [defaultPlaylist] = await tx
                .insert(PlaylistTable)
                .values({
                    name: `${newUser.name}'s tracks`,
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

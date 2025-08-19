import { db } from '@/db'
import { playLists, users } from '@/db/schema'

export default async function createUser(name: string) {
    try {
        return await db.transaction(async (tx) => {
            const [newUser] = await tx
                .insert(users)
                .values({
                    name,
                })
                .returning()

            const [defaultPlaylist] = await tx
                .insert(playLists)
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

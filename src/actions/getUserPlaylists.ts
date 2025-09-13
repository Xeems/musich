'use server'

import { db } from '@/db'
import getUserBySession from './getUserBySession'

export default async function getUserPlaylists() {
    try {
        const user = await getUserBySession()
        if (!user?.id) return 'user not found'
        const data = await db.query.PlaylistTable.findMany({
            where: (PlaylistTable, { eq }) =>
                eq(PlaylistTable.creatorId, user?.id),
        })

        return data
    } catch (error) {
        console.error(error)
    }
}

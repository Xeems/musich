'use server'

import { db } from '@/db'
import getUserBySession from './getUserBySession'
import { ActionResultType } from '../../@types/actionResult'
import { PlaylistType } from '../../@types/playlist'

export default async function getUserPlaylists(): Promise<
    ActionResultType<PlaylistType[]>
> {
    try {
        const user = await getUserBySession()
        if (!user?.id) return { success: false, message: 'User not found' }
        const data = await db.query.PlaylistTable.findMany({
            where: (PlaylistTable, { eq }) =>
                eq(PlaylistTable.creatorId, user?.id),
        })

        return { success: true, data: data }
    } catch (error) {
        console.error(error)
        return { success: false, message: 'Some error' }
    }
}

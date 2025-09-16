'use server'

import { db } from '@/db'
import { eq, and } from 'drizzle-orm'
import { PlaylistTable, PlaylistTrackTable } from '@/db/schema'
import getUserBySession from './getUserBySession'
import { MinimalActionResultType } from '../../@types/actionResult'

export async function toggleTrackLike(
    trackId: string,
): Promise<MinimalActionResultType> {
    const user = await getUserBySession()
    if (!user?.id) return { success: false }

    const [defaultPlaylist] = await db
        .select()
        .from(PlaylistTable)
        .where(
            and(
                eq(PlaylistTable.creatorId, user.id),
                eq(PlaylistTable.type, 'default'),
            ),
        )

    console.log(defaultPlaylist)

    if (!defaultPlaylist) {
        return { success: false }
    }

    const [existing] = await db
        .select()
        .from(PlaylistTrackTable)
        .where(
            and(
                eq(PlaylistTrackTable.playlistId, defaultPlaylist.id),
                eq(PlaylistTrackTable.trackId, trackId),
            ),
        )

    if (existing) {
        await db
            .delete(PlaylistTrackTable)
            .where(
                and(
                    eq(PlaylistTrackTable.playlistId, defaultPlaylist.id),
                    eq(PlaylistTrackTable.trackId, trackId),
                ),
            )
        return { success: true }
    } else {
        await db.insert(PlaylistTrackTable).values({
            playlistId: defaultPlaylist.id,
            trackId,
        })
        return { success: true }
    }
}

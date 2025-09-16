'use server'

import { db } from '@/db'
import { eq, and } from 'drizzle-orm'
import { PlaylistTable, PlaylistTrackTable } from '@/db/schema'
import getUserBySession from './getUserBySession'
import { LikeResult } from '../../@types/actionResult'

export async function toggleTrackLike(trackId: string): Promise<LikeResult> {
    const user = await getUserBySession()
    if (!user?.id) return { success: false, message: 'User not found' }

    const [defaultPlaylist] = await db
        .select()
        .from(PlaylistTable)
        .where(
            and(
                eq(PlaylistTable.creatorId, user.id),
                eq(PlaylistTable.type, 'default'),
            ),
        )

    if (!defaultPlaylist) {
        return { success: false, message: 'User playlist not found' }
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
        return { success: true, isLiked: false }
    } else {
        await db.insert(PlaylistTrackTable).values({
            playlistId: defaultPlaylist.id,
            trackId,
        })
        return { success: true, isLiked: true }
    }
}

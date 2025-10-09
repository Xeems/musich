'use server'

import { db } from '@/db'
import { eq, and, sql } from 'drizzle-orm'
import { PlaylistTable, PlaylistTrackTable } from '@/db/schema'
import getUserBySession from '../authentification/actions/getUserBySession'
import { LikeResult } from '../../@types/actionResult'

export async function toggleTrackLike(trackId: string): Promise<LikeResult> {
    try {
        const user = await getUserBySession()
        if (!user?.id) return { success: false, message: 'User not found' }

        let isLiked: boolean

        const data = await db.transaction(async (tx) => {
            const [row] = await tx
                .select({
                    playlistId: PlaylistTable.id,
                    existingTrackId: PlaylistTrackTable.trackId,
                })
                .from(PlaylistTable)
                .leftJoin(
                    PlaylistTrackTable,
                    and(
                        eq(PlaylistTrackTable.playlistId, PlaylistTable.id),
                        eq(PlaylistTrackTable.trackId, trackId),
                    ),
                )
                .where(
                    and(
                        eq(PlaylistTable.creatorId, user.id),
                        eq(PlaylistTable.type, 'default'),
                    ),
                )

            if (row.existingTrackId) {
                await tx
                    .delete(PlaylistTrackTable)
                    .where(
                        and(
                            eq(PlaylistTrackTable.playlistId, row.playlistId),
                            eq(PlaylistTrackTable.trackId, trackId),
                        ),
                    )
                isLiked = false
            } else {
                await tx.insert(PlaylistTrackTable).values({
                    playlistId: row.playlistId,
                    trackId,
                })
                isLiked = true
            }

            const [{ likesCount }] = await tx
                .select({
                    likesCount: sql<number>`COUNT(*)`,
                })
                .from(PlaylistTrackTable)
                .leftJoin(
                    PlaylistTable,
                    eq(PlaylistTable.id, PlaylistTrackTable.playlistId),
                )
                .where(
                    and(
                        eq(PlaylistTrackTable.trackId, trackId),
                        eq(PlaylistTable.type, 'default'),
                    ),
                )

            return {
                isLiked,
                likesCount,
            }
        })

        return {
            success: true,
            isLiked: data.isLiked,
            likesCount: data.likesCount,
        }
    } catch (error) {
        console.error(error)
        return { success: false, message: 'Error' }
    }
}

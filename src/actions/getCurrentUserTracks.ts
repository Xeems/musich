'use server'
import { db } from '@/db'
import { ActionResultType } from '../../@types/actionResult'
import { TrackType } from '../../@types/track'
import getUserBySession from './getUserBySession'
import { PlaylistTable, PlaylistTrackTable, TrackTable } from '@/db/schema'
import { and, eq, sql } from 'drizzle-orm'

export default async function getCurrentUserTracks(): Promise<
    ActionResultType<TrackType[]>
> {
    try {
        const user = await getUserBySession()
        if (!user) return { success: false, message: 'User not found' }
        const data = await db
            .select({
                id: TrackTable.id,
                name: TrackTable.name,
                author: TrackTable.author,
                imageName: TrackTable.imageName,
                createdAt: TrackTable.createdAt,
                duration: TrackTable.duration,
                trackDir: TrackTable.trackDir,
                likesCount: sql<number>`
                                        COUNT(
                                            CASE 
                                                WHEN ${PlaylistTable.type} = 'default' 
                                                THEN ${PlaylistTrackTable.trackId} 
                                            END
                                        )
                                    `,
                isLikedByCurrentUser: user.id
                    ? sql<boolean>`
                                    BOOL_OR(
                                        CASE 
                                            WHEN ${PlaylistTable.type} = 'default'
                                              AND ${PlaylistTable.creatorId} = ${user.id}
                                            THEN TRUE
                                            ELSE FALSE
                                        END
                                    )
                                `
                    : sql<boolean>`FALSE`,
            })
            .from(TrackTable)
            .leftJoin(
                PlaylistTrackTable,
                eq(TrackTable.id, PlaylistTrackTable.trackId),
            )
            .leftJoin(
                PlaylistTable,
                and(
                    eq(PlaylistTrackTable.playlistId, PlaylistTable.id),
                    eq(PlaylistTable.creatorId, user?.id),
                    eq(PlaylistTable.type, 'default'),
                ),
            )
            .where(eq(PlaylistTable.creatorId, user?.id))
            .orderBy(TrackTable.createdAt)

        return { success: true, data: data }
    } catch (error) {
        console.error(error)
        return { success: false, message: 'Error' }
    }
}

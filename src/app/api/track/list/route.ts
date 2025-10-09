import { NextRequest, NextResponse } from 'next/server'
import { TrackType } from '../../../../../@types/track'
import { db } from '@/db'
import { PlaylistTable, PlaylistTrackTable, TrackTable } from '@/db/schema'
import { desc, eq, sql } from 'drizzle-orm'
import getUserBySession from '@/authentification/actions/getUserBySession'

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url)
        const offset = Number(searchParams.get('offset') || '0')
        const limit = Number(searchParams.get('limit') || '20')
        const user = await getUserBySession()
        const userId = user?.id ?? null

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
                isLikedByCurrentUser: userId
                    ? sql<boolean>`
                        BOOL_OR(
                            CASE 
                                WHEN ${PlaylistTable.type} = 'default'
                                  AND ${PlaylistTable.creatorId} = ${userId}
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
                eq(PlaylistTable.id, PlaylistTrackTable.playlistId),
            )
            .groupBy(TrackTable.id)
            .orderBy(desc(TrackTable.createdAt))
            .limit(limit)
            .offset(offset)

        return NextResponse.json(data as TrackType[])
    } catch (error) {
        console.error(error)
    }
}

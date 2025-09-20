import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { PlaylistTable, PlaylistTrackTable, TrackTable } from '@/db/schema'
import { and, desc, eq, sql } from 'drizzle-orm'
import getUserBySession from '@/actions/getUserBySession'
import { TrackType } from '../../../../../../@types/track'

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url)
        const offset = Number(searchParams.get('offset') || '0')
        const limit = Number(searchParams.get('limit') || '20')
        const user = await getUserBySession()
        if (!user?.id) throw new Error('User not found')

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
                isLikedByCurrentUser: sql<boolean>`TRUE`,
            })
            .from(TrackTable)
            .innerJoin(
                PlaylistTrackTable,
                eq(TrackTable.id, PlaylistTrackTable.trackId),
            )
            .innerJoin(
                PlaylistTable,
                and(
                    eq(PlaylistTable.id, PlaylistTrackTable.playlistId),
                    eq(PlaylistTable.type, 'default'),
                    eq(PlaylistTable.creatorId, user.id),
                ),
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

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { eq, ilike, or, sql } from 'drizzle-orm'
import getUserBySession from '@/authentification/actions/getUserBySession'
import { PlaylistTable, PlaylistTrackTable, TrackTable } from '@/db/schema'

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url)

        const search = searchParams.get('q')?.trim() || ''
        const offset = Number(searchParams.get('offset') || '0')
        const limit = Number(searchParams.get('limit') || '20')

        const user = await getUserBySession()
        const userId = user?.id ?? null

        // const query = sql`
        //     SELECT
        //         t.id,
        //         t.name,
        //         t.author,
        //         t."imageName",
        //         t."createdAt",
        //         t.duration,
        //         t."trackDir",
        //         COUNT(
        //             CASE
        //                 WHEN p.type = 'default'
        //                 THEN pt."trackId"
        //             END
        //         ) AS "likesCount",
        //         ${
        //             userId
        //                 ? sql`
        //                     BOOL_OR(
        //                         CASE
        //                             WHEN p.type = 'default' AND p."creatorId" = ${userId}
        //                             THEN TRUE
        //                             ELSE FALSE
        //                         END
        //                     ) AS "isLikedByCurrentUser"`
        //                 : sql`FALSE AS "isLikedByCurrentUser"`
        //         }
        //     FROM track_table t
        //     LEFT JOIN playlist_tracks_table pt ON t.id = pt."trackId"
        //     LEFT JOIN playlist_table p ON p.id = pt."playlistId"
        //     ${
        //         search
        //             ? sql`WHERE t.name ILIKE ${'%' + search + '%'} OR t.author ILIKE ${'%' + search + '%'}`
        //             : sql``
        //     }
        //     GROUP BY t.id
        //     ORDER BY t."createdAt" DESC
        //     LIMIT ${limit}
        //     OFFSET ${offset};
        // `

        const likesCount = sql<number>`
        COUNT(
            CASE WHEN ${PlaylistTable.type} = 'default'
            THEN ${PlaylistTrackTable.trackId}
            END
        )
    `.as('likesCount')

        const isLikedByCurrentUser = userId
            ? sql<boolean>`
            BOOL_OR(
                CASE
                    WHEN ${PlaylistTable.type} = 'default'
                    AND ${PlaylistTable.creatorId} = ${userId}
                    THEN TRUE
                    ELSE FALSE
                END
            )
        `.as('isLikedByCurrentUser')
            : sql<boolean>`FALSE`.as('isLikedByCurrentUser')

        const whereClause = search
            ? or(
                  ilike(TrackTable.name, `%${search}%`),
                  ilike(TrackTable.author, `%${search}%`),
              )
            : undefined

        const query = await db
            .select({
                id: TrackTable.id,
                name: TrackTable.name,
                author: TrackTable.author,
                imageName: TrackTable.imageName,
                createdAt: TrackTable.createdAt,
                duration: TrackTable.duration,
                trackDir: TrackTable.trackDir,
                likesCount,
                isLikedByCurrentUser,
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
            .where(whereClause ?? sql`TRUE`)
            .groupBy(TrackTable.id)
            .orderBy(sql`${TrackTable.createdAt} DESC`)
            .limit(limit)
            .offset(offset)

        return NextResponse.json(query)
    } catch (error) {
        console.error('GET /tracks error:', error)
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 },
        )
    }
}

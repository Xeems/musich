import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import getUserBySession from '@/actions/getUserBySession'
import { TrackType } from '../../../../../../@types/track'
import { sql } from 'drizzle-orm'

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url)
        const offset = Number(searchParams.get('offset') || '0')
        const limit = Number(searchParams.get('limit') || '20')
        const user = await getUserBySession()
        if (!user?.id) throw new Error('User not found')

        const data = await db.execute(sql`
            SELECT 
                t.id,
                t.name,
                t.author,
                t."imageName",
                t."trackDir",
                t.duration,
                t."createdAt",
                COUNT(DISTINCT p_likes."creatorId") AS "likesCount",
                BOOL_OR(p_likes."creatorId" = ${user.id}) AS "isLikedByCurrentUser"
            FROM track_table t
            INNER JOIN playlist_tracks_table pt_user
                ON pt_user."trackId" = t.id
            INNER JOIN playlist_table p_user
                ON p_user.id = pt_user."playlistId"
                AND p_user."type" = 'default'
                AND p_user."creatorId" = ${user.id}
            LEFT JOIN playlist_tracks_table pt_likes
                ON pt_likes."trackId" = t.id
            LEFT JOIN playlist_table p_likes
                ON p_likes.id = pt_likes."playlistId"
                AND p_likes."type" = 'default'
            GROUP BY t.id
            ORDER BY t."createdAt" DESC
            LIMIT ${limit}
            OFFSET ${offset};
            `)

        return NextResponse.json(data)
    } catch (error) {
        console.error(error)
    }
}

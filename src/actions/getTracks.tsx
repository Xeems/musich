'use server'

import { db } from '@/db'
import { tracks } from '@/db/schema'
import { desc } from 'drizzle-orm'
import { TrackType } from '../../@types/track'

export default async function getTracks(
    offset: number,
    limit: number,
): Promise<TrackType[]> {
    try {
        const data = await db
            .select()
            .from(tracks)
            .orderBy(desc(tracks.createdAt))
            .limit(limit)
            .offset(offset)

        if (!data) throw new Error('No tracks')

        return data.map((track) => ({
            id: track.id,
            name: track.name,
            author: track.author,
            imageName: track.imageName,
            createdAt: track.createdAt,
            duration: track.duration,
            trackDir: track.trackDir,
        }))
    } catch (error) {
        console.log(error)
        return []
    }
}

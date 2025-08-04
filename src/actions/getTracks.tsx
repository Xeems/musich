'use server'

import { db } from '@/db'
import { trackTable } from '@/db/schema'
import { desc } from 'drizzle-orm'
import { TrackType } from '../../@types/track'

export default async function getTracks(
    offset: number,
    limit: number,
): Promise<TrackType[]> {
    try {
        const data = await db
            .select()
            .from(trackTable)
            .orderBy(desc(trackTable.createdAt))
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

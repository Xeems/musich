'use server'

import { db } from '@/db'
import { trackTable } from '@/db/schema'

export default async function getTracks(offset: number, limit: number) {
    try {
        const data = await db
            .select()
            .from(trackTable)
            .orderBy(trackTable.createdAt)
            .limit(limit)
            .offset(offset)

        return data
    } catch (error) {
        console.log(error)
    }
}

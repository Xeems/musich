import React from 'react'
import TrackUploadForm from './TrackUploadDialog'
import { db } from '@/db'
import { trackTable } from '@/db/schema'
import TrackList from './TrackList'

export default async function tracksPage() {
    const initialItems = await db.select().from(trackTable)

    return (
        <div className="flex h-full flex-col items-center">
            <div className="w-1/4">
                <TrackUploadForm />
            </div>
            <TrackList tracks={initialItems} />
        </div>
    )
}

import React from 'react'
import TrackUploadForm from './TrackUploadDialog'

import TrackList from './TrackList'
import getTracks from '@/actions/getTracks'

export default async function tracksPage() {
    const initialItems = await getTracks(0, 1)

    return (
        <div className="flex h-full flex-col items-center">
            <div className="w-1/4">
                <TrackUploadForm />
            </div>
            <TrackList initialTracks={initialItems} />
        </div>
    )
}

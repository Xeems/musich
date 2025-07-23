import React from 'react'
import TrackUploadForm from './TrackUploadDialog'

import TrackList from './TrackList'
import getTracks from '@/actions/getTracks'
import { TrackType } from '../../../@types/track'

export default async function tracksPage() {
    const initialItems = await getTracks(0, 50)

    const tracks: TrackType[] | undefined = initialItems?.map((track) => ({
        id: track.id,
        name: track.name,
        author: track.author,
        imageName: track.imageName,
        createdAd: track.createdAt,
    }))

    return (
        <div className="flex h-full flex-col items-center">
            <h1 className="my-4 text-4xl font-bold">My playlist</h1>
            <div className="w-1/4">
                <TrackUploadForm />
            </div>
            <TrackList initialTracks={tracks} />
        </div>
    )
}

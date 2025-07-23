'use client'

import { useState } from 'react'
import TrackCard from './TrackCard'
import { Button } from '@/components/ui/button'

export type TrackType = {
    id: string
    name: string
    author: string
    coverImage: File | URL
}

type Props = {
    initialTracks: TrackType[]
}

const tracksCountOnPage = 1

async function fetchTracks(
    offset: number,
    limit: number,
): Promise<TrackType[]> {
    const res = await fetch(`/api/track/list?offset=${offset}&limit=${limit}`)
    const data = await res.json()

    return data.map((track: any) => ({
        id: track.id,
        name: track.name,
        author: track.author,
        coverImage: track.imagePath ? new URL(track.imagePath) : '',
    }))
}

export default function TrackList({ initialTracks }: Props) {
    const [offset, setOffset] = useState(tracksCountOnPage)
    const [tracks, setTracks] = useState(initialTracks)

    const loadTracks = async () => {
        const newTracks = await fetchTracks(offset, tracksCountOnPage)
        if (newTracks && newTracks.length > 0) {
            setTracks((tracks) => [...tracks, ...newTracks])
            setOffset((offset) => offset + tracksCountOnPage)
        }
    }

    return (
        <div>
            {tracks &&
                tracks.map((track, index) => (
                    <TrackCard key={`${index} '_' ${track.id}`} track={track} />
                ))}
            <Button onClick={() => loadTracks()} />
        </div>
    )
}

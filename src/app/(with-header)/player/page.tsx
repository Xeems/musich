import React from 'react'
import Player from './Player'
import getTrackById from '@/lib/api/getTrackById'

type PlayerPageProps = {
    searchParams: {
        track?: string
    }
}

export default async function page({ searchParams }: PlayerPageProps) {
    const { track } = await searchParams
    const initialTrack = track ? await getTrackById(track) : undefined

    return (
        <main>
            <Player initialTrack={initialTrack} />
        </main>
    )
}

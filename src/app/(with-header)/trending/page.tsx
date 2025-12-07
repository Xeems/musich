import TrackList from '@/components/track-list/TrackList'
import { TrackListProvider } from '@/components/track-list/TrackListContext'
import { getTracks } from '@/lib/api/getTracks'
import React from 'react'

const loadSource = '/api/track/list' as const

export default async function TrendingPage() {
    const initialTracks = await getTracks({
        url: loadSource,
        offset: 0,
        limit: 20,
    })
    return (
        <main className="flex w-full flex-col sm:px-6 md:px-10 lg:px-20 xl:mx-auto xl:max-w-4xl">
            <TrackListProvider initialState={{ source: loadSource }}>
                <TrackList />
            </TrackListProvider>
        </main>
    )
}

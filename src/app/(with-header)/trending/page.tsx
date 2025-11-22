import TrackListStoreProvider from '@/components/track-list/TrackListStoreProvider'
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
            <TrackListStoreProvider
                source={loadSource}
                displayMode="default"
                initialTracks={initialTracks}
            />
        </main>
    )
}

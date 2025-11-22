import React from 'react'
import SearchBar from '../../../components/SearchBar'
import TrackListStoreProvider from '@/components/track-list/TrackListStoreProvider'

export default async function page({
    searchParams,
}: {
    searchParams: { search?: string }
}) {
    await searchParams
    const params = new URLSearchParams(await searchParams)

    return (
        <main className="flex w-full flex-col sm:px-6 md:px-10 lg:px-20 xl:mx-auto xl:max-w-4xl">
            <div className="my-4">
                <SearchBar />
            </div>
            <TrackListStoreProvider
                source={`/api/track/list?${params}`}
                displayMode="default"
            />
        </main>
    )
}

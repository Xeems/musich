import React from 'react'
import SearchBar from '../../../components/SearchBar'
import TrackListProvider from '@/components/track-list/TrackListProvider'

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
            <TrackListProvider
                source={`/api/track/list?${params}`}
                displayOption="default"
            />
        </main>
    )
}

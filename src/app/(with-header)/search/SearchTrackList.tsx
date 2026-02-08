'use client'
import TrackList from '@/components/track-list/TrackList'
import { TrackListProvider } from '@/components/track-list/TrackListContext'
import TrackListInfiniteScrollTrigger from '@/components/track-list/TrackListInfiniteScrollTrigger'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export default function SearchTrackList() {
    const params = useSearchParams()
    const query = params.get('q')

    useEffect(() => {}, [query])
    return (
        <TrackListProvider
            initialState={{ source: `/api/track/list?q=${query}` }}>
            <TrackList />
            <TrackListInfiniteScrollTrigger />
        </TrackListProvider>
    )
}

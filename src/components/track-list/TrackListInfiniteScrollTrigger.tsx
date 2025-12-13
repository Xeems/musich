'use client'

import { useInfiniteScroll } from '@/hooks/useInfinteScroll'
import React, { useRef } from 'react'
import { Spinner } from '../ui/spinner'
import { useTrackListStore } from './TrackListContext'

export default function TrackListInfiniteScrollTrigger() {
    const loadMore = useTrackListStore((s) => s.loadMore)
    const hasMore = useTrackListStore((s) => s.hasMore)
    const loading = useTrackListStore((s) => s.loading)

    const observerRef = useRef<HTMLDivElement | null>(null)

    useInfiniteScroll({
        targetRef: observerRef,
        hasMore,
        onIntersect: () => {
            if (!loading) loadMore()
        },
        rootMargin: '200px',
        threshold: 0.1,
    })

    if (!hasMore) return null

    return (
        <div
            ref={observerRef}
            className="flex flex-row items-center justify-center gap-x-4 py-4 text-center">
            {loading && (
                <>
                    <Spinner className="size-5" />
                    <p>Loading...</p>
                </>
            )}
        </div>
    )
}

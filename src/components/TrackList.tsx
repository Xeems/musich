'use client'

import { useState, useRef, useCallback } from 'react'
import { TrackType } from '../../@types/track'
import TrackCard from './track-card/TrackCard'
import { usePlayerStore } from '@/store/playerStore'
import { useInfiniteScroll } from '@/hooks/useInfinteScroll'
import { ActionResultType } from '../../@types/actionResult'

const LIMIT = 20

type TrackListProps = {
    fetchDataAction: (
        offset: number,
        limit: number,
    ) => Awaited<ActionResultType<TrackType[]>>
}

export default function TrackList({ fetchDataAction }: TrackListProps) {
    const [tracks, setTracks] = useState<TrackType[]>([])
    const [hasMore, setHasMore] = useState(true)
    const observerRef = useRef<HTMLDivElement | null>(null)

    const setCurrentTrack = usePlayerStore((s) => s.setCurrentTrack)
    const setQueue = usePlayerStore((s) => s.setQueue)

    const loadTracks = useCallback(async () => {
        try {
            const offset = tracks.length
            const res = await fetchDataAction(offset, LIMIT)

            if (res.success === true) {
                if (res.data?.length === 0) {
                    setHasMore(false)
                    return
                }

                setTracks((prev) => [...prev, ...res.data])
            }
        } catch (err) {
            console.error('loadTracks error', err)
        }
    }, [tracks])

    useInfiniteScroll({
        targetRef: observerRef,
        hasMore,
        onIntersect: loadTracks,
        rootMargin: '200px',
        threshold: 0.1,
    })

    const handlePlay = useCallback(
        (track: TrackType) => {
            setQueue(tracks)
            setCurrentTrack(track)
        },
        [tracks, setQueue, setCurrentTrack],
    )

    return (
        <div className="flex w-full flex-col space-y-2">
            {tracks.map((track) => (
                <TrackCard
                    key={track.id}
                    track={track}
                    onClick={() => handlePlay(track)}
                />
            ))}

            {hasMore && (
                <div ref={observerRef} className="h-10 text-center">
                    Loading...
                </div>
            )}
        </div>
    )
}

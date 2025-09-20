'use client'

import { useState, useRef, useCallback } from 'react'
import { TrackType } from '../../@types/track'
import TrackCard from './track-card/TrackCard'
import { usePlayerStore } from '@/store/playerStore'
import { useInfiniteScroll } from '@/hooks/useInfinteScroll'

const LIMIT = 20

type TrackListProps = {
    fetchEndpoint: string
}

export default function TrackList({ fetchEndpoint }: TrackListProps) {
    const [tracks, setTracks] = useState<TrackType[]>([])
    const [hasMore, setHasMore] = useState(true)
    const observerRef = useRef<HTMLDivElement | null>(null)

    const setCurrentTrack = usePlayerStore((s) => s.setCurrentTrack)
    const setQueue = usePlayerStore((s) => s.setQueue)

    const loadTracks = useCallback(async () => {
        try {
            const offset = tracks.length
            const res = await fetch(
                `${fetchEndpoint}?offset=${offset}&limit=${LIMIT}`,
            )
            if (!res.ok) throw new Error('Failed to fetch tracks')
            const data: TrackType[] = await res.json()
            setTracks((prev) => [...prev, ...data])
        } catch (err) {
            console.error('loadTracks error', err)
        }
    }, [tracks.length, fetchEndpoint])

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

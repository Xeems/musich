'use client'

import { useState, useRef, useCallback } from 'react'
import { TrackType } from '../../@types/track'
import TrackCard from './track-card/TrackCard'
import { usePlayerStore } from '@/store/playerStore'
import { useInfiniteScroll } from '@/hooks/useInfinteScroll'

const LIMIT = 20

const fetchTracks = async (
    offset: number,
    limit: number,
): Promise<TrackType[]> => {
    const res = await fetch(`/api/track/list?offset=${offset}&limit=${limit}`)
    if (!res.ok) throw new Error('Failed to fetch tracks')
    return res.json()
}

export default function TrackList() {
    const [tracks, setTracks] = useState<TrackType[]>([])
    const [hasMore, setHasMore] = useState(true)
    const observerRef = useRef<HTMLDivElement | null>(null)

    const setCurrentTrack = usePlayerStore((s) => s.setCurrentTrack)
    const setQueue = usePlayerStore((s) => s.setQueue)

    const loadTracks = useCallback(async () => {
        try {
            const offset = tracks.length
            const data = await fetchTracks(offset, LIMIT)

            if (data.length === 0) {
                setHasMore(false)
                return
            }

            setTracks((prev) => [...prev, ...data])
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

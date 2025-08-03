'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { TrackType } from '../../@types/track'
import TrackCard from './TrackCard'
import { usePlayerStore } from '@/store'
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
    const [offset, setOffset] = useState(0)
    const [tracks, setTracks] = useState<TrackType[]>([])
    const [hasMore, setHasMore] = useState(true)
    const observerRef = useRef<HTMLDivElement | null>(null)

    const { setCurrentTrack, setQueue } = usePlayerStore((state) => state)

    const loadTracks = useCallback(async () => {
        try {
            const data = await fetchTracks(offset, LIMIT)
            if (data.length === 0) {
                setHasMore(false)
                return
            }

            setTracks((prev) => [...prev, ...data])
            setOffset((prev) => prev + LIMIT)
        } catch (err) {
            console.error(err)
        }
    }, [offset])

    useEffect(() => {
        loadTracks()
    }, [])

    useInfiniteScroll({
        targetRef: observerRef,
        hasMore,
        onIntersect: loadTracks,
    })

    useEffect(() => {
        if (!hasMore) return

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    loadTracks()
                }
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: 1.0,
            },
        )

        const current = observerRef.current
        if (current) observer.observe(current)

        return () => {
            if (current) observer.unobserve(current)
        }
    }, [loadTracks, hasMore])

    const handlePlay = (track: TrackType) => {
        setQueue(tracks)
        setCurrentTrack(track)
    }

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

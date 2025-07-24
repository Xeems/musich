'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { TrackType } from '../../@types/track'
import TrackCard from '@/components/TrackCard'

type Props = {
    initialOffset: number
}

const LIMIT = 20

export default function TrackListLoader({ initialOffset }: Props) {
    const [offset, setOffset] = useState(initialOffset)
    const [tracks, setTracks] = useState<TrackType[]>([])
    const [hasMore, setHasMore] = useState(true)
    const observerRef = useRef<HTMLDivElement | null>(null)

    const loadTracks = useCallback(async () => {
        try {
            const res = await fetch(
                `/api/track/list?offset=${offset}&limit=${LIMIT}`,
            )
            const data: TrackType[] = await res.json()

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

    return (
        <>
            {tracks.map((track) => (
                <TrackCard key={track.id} track={track} />
            ))}
            {hasMore && (
                <div ref={observerRef} className="h-10 text-center">
                    Loading...
                </div>
            )}
        </>
    )
}

'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import TrackCard from './TrackCard'
import { TrackType } from '../../../@types/track'

type Props = {
    initialTracks?: TrackType[]
}

const tracksCountOnPage = 20

async function fetchTracks(
    offset: number,
    limit: number,
): Promise<TrackType[]> {
    const res = await fetch(`/api/track/list?offset=${offset}&limit=${limit}`)
    const data = await res.json()

    const tracks: TrackType[] = data.map((track: TrackType) => ({
        id: track.id,
        name: track.name,
        author: track.author,
        imageName: track.imageName,
    }))
    return tracks
}

export default function TrackList({ initialTracks = [] }: Props) {
    const [offset, setOffset] = useState(tracksCountOnPage)
    const [tracks, setTracks] = useState<TrackType[]>(initialTracks)
    const [hasMore, setHasMore] = useState(true)
    const observerRef = useRef<HTMLDivElement | null>(null)

    const loadTracks = useCallback(async () => {
        const newTracks = await fetchTracks(offset, tracksCountOnPage)
        if (newTracks.length === 0) {
            setHasMore(false)
            return
        }

        setTracks((prev) => [...prev, ...newTracks])
        setOffset((prev) => prev + tracksCountOnPage)
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
        <div className="flex w-1/3 flex-col space-y-2">
            {tracks.map((track) => (
                <TrackCard key={track.id} track={track} />
            ))}

            {/* sentinel div for intersection observer */}
            {hasMore && <div ref={observerRef} className="h-10" />}
        </div>
    )
}

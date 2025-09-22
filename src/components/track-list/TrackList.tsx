'use client'

import { TrackType } from '../../../@types/track'
import TrackCard from '../track-card/TrackCard'
import { usePlayerStore } from '@/store/playerStore'
import { useTracksStore } from '@/store/trackListStore'
import InfiniteScrollTrigger from './infiniteScrollTrigger'
import { useCallback, useEffect, useRef } from 'react'

export default function TrackList() {
    const { tracks, hasMore, loadMore } = useTracksStore()

    const setCurrentTrack = usePlayerStore((s) => s.setCurrentTrack)
    const setQueue = usePlayerStore((s) => s.setQueue)

    const tracksRef = useRef(tracks)

    useEffect(() => {
        tracksRef.current = tracks
    }, [tracks])

    const handlePlay = useCallback(
        (trackToPlay: TrackType) => {
            setQueue(tracksRef.current)
            setCurrentTrack(trackToPlay)
        },
        [setQueue, setCurrentTrack],
    )

    return (
        <div className="flex w-full flex-col space-y-2">
            {tracks.map((track) => (
                <TrackCard key={track.id} track={track} onClick={handlePlay} />
            ))}

            <InfiniteScrollTrigger
                hasMore={hasMore}
                onIntersect={() => loadMore()}
            />
        </div>
    )
}

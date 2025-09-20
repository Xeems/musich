'use client'

import { useCallback } from 'react'
import { TrackType } from '../../../@types/track'
import TrackCard from '../track-card/TrackCard'
import { usePlayerStore } from '@/store/playerStore'

import { useTracksStore } from '@/store/trackListStore'
import InfiniteScrollTrigger from './infiniteScrollTrigger'

export default function TrackList() {
    const { tracks, hasMore, loadMore } = useTracksStore()

    const setCurrentTrack = usePlayerStore((s) => s.setCurrentTrack)
    const setQueue = usePlayerStore((s) => s.setQueue)

    const handleLoadTracks = () => {
        console.log('first')
        loadMore()
    }

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

            <InfiniteScrollTrigger
                hasMore={hasMore}
                onIntersect={handleLoadTracks}
            />
        </div>
    )
}

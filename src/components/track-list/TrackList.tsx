'use client'

import { TrackType } from '../../../@types/track'
import TrackCard from '../track-card/TrackCard'
import { usePlayerStore } from '@/store/playerStore'
import { useTracksStore } from '@/store/trackListStore'
import InfiniteScrollTrigger from './infiniteScrollTrigger'

export default function TrackList() {
    const { tracks, hasMore, loadMore } = useTracksStore()

    const setCurrentTrack = usePlayerStore((s) => s.setCurrentTrack)
    const setQueue = usePlayerStore((s) => s.setQueue)

    function handlePlay(track: TrackType) {
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

            <InfiniteScrollTrigger
                hasMore={hasMore}
                onIntersect={() => loadMore()}
            />
        </div>
    )
}

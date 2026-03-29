'use client'

import { TrackType } from '../../../@types/track'
import TrackCard from '../track-card/TrackCard'
import { useCallback, useEffect, useRef } from 'react'
import { useTrackListStore } from './TrackListContext'
import { usePlayerStore } from '@/store/playerStore'
import { useShallow } from 'zustand/shallow'

export default function TrackList() {
    const setCurrentTrack = usePlayerStore((s) => s.setCurrentTrack)
    const bindTrackList = usePlayerStore((s) => s.bindTrackList)

    const { tracks, source, displayMode } = useTrackListStore(
        useShallow((s) => ({
            tracks: s.tracks,
            source: s.source,
            displayMode: s.displayMode,
        })),
    )

    const tracksRef = useRef(tracks)

    useEffect(() => {
        tracksRef.current = tracks
    }, [tracks])

    const handleClick = useCallback(
        (trackToPlay: TrackType) => {
            switch (displayMode) {
                case 'default':
                    bindTrackList({
                        queue: tracksRef.current,
                        queueSource: source,
                    })
                    setCurrentTrack(trackToPlay)
                    break

                case 'stream':
                    break
            }
        },
        [bindTrackList, source, setCurrentTrack],
    )

    return (
        <div className="flex w-full flex-col space-y-2">
            {tracks.map((track) => (
                <TrackCard key={track.id} track={track} onClick={handleClick} />
            ))}
        </div>
    )
}

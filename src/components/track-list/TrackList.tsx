'use client'

import { TrackType } from '../../../@types/track'
import TrackCard from '../track-card/TrackCard'
import { useCallback, useEffect, useRef } from 'react'
import { useTrackListStore } from './TrackListContext'
import { usePlayerStore } from '@/store/playerStore'

export default function TrackList() {
    const tracks = useTrackListStore((s) => s.tracks)
    const source = useTrackListStore((s) => s.source)
    const setCurrentTrack = usePlayerStore((s) => s.setCurrentTrack)
    const bindTrackList = usePlayerStore((s) => s.bindTrackList)

    const tracksRef = useRef(tracks)

    useEffect(() => {
        tracksRef.current = tracks
    }, [tracks])

    const handlePlay = useCallback(
        (trackToPlay: TrackType) => {
            bindTrackList({ queue: tracks, queueSource: source })
            setCurrentTrack(trackToPlay)
        },
        [bindTrackList, tracksRef, source, setCurrentTrack],
    )

    return (
        <div className="flex w-full flex-col space-y-2">
            {tracks.map((track) => (
                <TrackCard key={track.id} track={track} onClick={handlePlay} />
            ))}
        </div>
    )
}

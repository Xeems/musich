import { usePlayerStore } from '@/store/playerStore'
import React from 'react'
import { TrackType } from '../../../@types/track'

export default function TrackCardProgresbar({ track }: { track: TrackType }) {
    const currentTrackTime = usePlayerStore((s) =>
        s.currentTrack?.id === track.id ? s.currentTrackTime : 0,
    )

    const isCurrentTrack = usePlayerStore(
        (s) => s.currentTrack?.id === track.id,
    )
    return (
        <>
            {isCurrentTrack && (
                <div
                    className="bg-primary/10 pointer-events-none absolute top-0 bottom-0 left-0"
                    style={{
                        width: `${(currentTrackTime / track.duration) * 100}%`,
                        transition: 'width 0.15s linear',
                    }}
                />
            )}
        </>
    )
}

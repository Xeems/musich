import { milSecToMins } from '@/lib/utils'
import { usePlayerStore } from '@/store/playerStore'
import React from 'react'
import { TrackType } from '../../../@types/track'

export default function TrackCardTimer({ track }: { track: TrackType }) {
    const currentTrackTime = usePlayerStore((s) =>
        s.currentTrack?.id === track.id ? s.currentTrackTime : 0,
    )

    const isCurrentTrack = usePlayerStore(
        (s) => s.currentTrack?.id === track.id,
    )
    return (
        <div className="flex flex-row gap-x-1">
            {isCurrentTrack && (
                <>
                    <span>{milSecToMins(currentTrackTime)}</span>
                    <span>/</span>
                </>
            )}
            <span>{milSecToMins(track.duration)}</span>
        </div>
    )
}

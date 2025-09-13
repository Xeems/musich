'use client'

import React, { useCallback } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { TrackType } from '../../@types/track'
import { milSecToMins } from '@/lib/utils'
import TrackCover from './TrackCover'
import { usePlayerStore } from '@/store/playerStore'

type Props = {
    track: TrackType
    onClick?: () => void
}

export default function TrackCardInner({ track, onClick }: Props) {
    const setCurrentTrack = usePlayerStore((s) => s.setCurrentTrack)
    const isCurrentTrack = usePlayerStore(
        (s) => s.currentTrack?.id === track.id,
    )
    const currentTrackTime = usePlayerStore((s) =>
        s.currentTrack?.id === track.id ? s.currentTrackTime : 0,
    )

    const handleClick = useCallback(() => {
        if (onClick) return onClick()
        setCurrentTrack(track)
    }, [onClick, setCurrentTrack, track])

    return (
        <Card
            tabIndex={0}
            onClick={handleClick}
            className="hover:bg-primary/10 focus:bg-primary/10 relative flex flex-row justify-center overflow-hidden border-none bg-transparent px-4 py-3 shadow-none">
            {isCurrentTrack && (
                <div
                    className="bg-primary/10 pointer-events-none absolute top-0 bottom-0 left-0"
                    style={{
                        width: `${(currentTrackTime / track.duration) * 100}%`,
                        transition: 'width 0.15s linear',
                    }}
                />
            )}
            <TrackCover imageName={track.imageName ?? null} />

            <CardHeader className="text-md flex w-full flex-col items-start justify-center gap-1 px-0">
                <CardTitle>{track.name}</CardTitle>
                <CardDescription>{track.author}</CardDescription>
            </CardHeader>

            <div className="flex flex-1 flex-col items-end justify-center gap-2">
                <CardContent className="flex items-center">
                    <span className="mr-4">{milSecToMins(track.duration)}</span>
                </CardContent>

                {isCurrentTrack && milSecToMins(currentTrackTime)}

                <div className="w-full max-w-[160px]"></div>
            </div>
        </Card>
    )
}

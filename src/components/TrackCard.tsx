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
import { usePlayerStore } from '@/store'

type Props = {
    track: TrackType
    onClick?: () => void
}

function TrackCardInner({ track, onClick }: Props) {
    //const { setCurrentTrack, isPlaying } = usePlayerStore()
    const setCurrentTrack = usePlayerStore((s) => s.setCurrentTrack)
    const currentTrackTime = usePlayerStore((s) =>
        s.currentTrack?.id === track.id ? s.currentTrackTime : 0,
    )
    const isPlaying = usePlayerStore((s) =>
        s.currentTrack?.id === track.id ? s.isPlaying : false,
    )

    const handleClick = useCallback(() => {
        if (onClick) return onClick()
        setCurrentTrack(track)
    }, [onClick, setCurrentTrack, track])

    return (
        <Card
            tabIndex={0}
            onClick={handleClick}
            className="hover:bg-primary/10 focus:bg-primary/10 flex flex-row justify-center border-none bg-transparent px-4 py-2 shadow-none">
            <TrackCover imageName={track.imageName ?? null} />

            <CardHeader className="text-md flex w-full flex-col items-start justify-center gap-1 px-0">
                <CardTitle>{track.name}</CardTitle>
                <CardDescription>{track.author}</CardDescription>
            </CardHeader>

            <div className="flex flex-1 flex-col items-end justify-center gap-2">
                <CardContent className="flex items-center">
                    <span className="mr-4">{milSecToMins(track.duration)}</span>
                </CardContent>

                <div className="w-full max-w-[160px]">
                    <div className="h-1 w-full rounded bg-slate-200">
                        <div
                            className="bg-primary h-1 rounded transition-[width] duration-150"
                            style={{ width: `${12}%` }}
                        />
                        {isPlaying && milSecToMins(currentTrackTime)}
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default React.memo(TrackCardInner)

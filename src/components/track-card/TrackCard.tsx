'use client'

import React, { memo } from 'react'
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { TrackType } from '../../../@types/track'
import { milSecToMins } from '@/lib/utils'
import TrackCover from '../TrackCover'
import { usePlayerStore } from '@/store/playerStore'
import TrackLikes from './TrackLikes'
import TrackCardMenu from './TrackCardMenu'
import { TrackListDisplayOption } from '@/store/trackListStore'

type Props = {
    track: TrackType
    displayOption?: TrackListDisplayOption
    onClick?: (track: TrackType) => void
}

function TrackCard({ track, onClick, displayOption = 'default' }: Props) {
    const isCurrentTrack = usePlayerStore(
        (s) => s.currentTrack?.id === track.id,
    )
    const currentTrackTime = usePlayerStore((s) =>
        s.currentTrack?.id === track.id ? s.currentTrackTime : 0,
    )

    return (
        <Card
            tabIndex={0}
            onClick={() => onClick?.(track)}
            className="hover:bg-primary/10 focus:bg-primary/10 @container relative flex flex-row justify-center overflow-hidden border-none bg-transparent px-4 py-2 shadow-none">
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

            <div className="flex flex-row items-center justify-center gap-4">
                <div className="flex flex-row gap-x-1">
                    {isCurrentTrack && (
                        <>
                            <span>{milSecToMins(currentTrackTime)}</span>
                            <span>/</span>
                        </>
                    )}
                    <span>{milSecToMins(track.duration)}</span>
                </div>

                <TrackLikes track={track} />
                {displayOption === 'user' && <TrackCardMenu />}
            </div>
        </Card>
    )
}

export default memo(TrackCard)

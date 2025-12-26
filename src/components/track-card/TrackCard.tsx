'use client'

import React, { memo } from 'react'
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { TrackType } from '../../../@types/track'
import TrackCover from '../TrackCover'
import TrackLikes from './TrackLikes'
import TrackCardMenu from './TrackCardMenu'

import TrackCardProgresbar from './TrackCardProgresbar'
import TrackCardTimer from './TrackCardTimer'

type Props = {
    track: TrackType
    onClick?: (track: TrackType) => void
}

function TrackCard({ track, onClick }: Props) {
    return (
        <Card
            onClick={() => onClick?.(track)}
            className="hover:bg-primary/10 focus-within:bg-primary/10 @container relative flex items-center overflow-hidden rounded-sm border-none bg-transparent px-4 py-2 shadow-none">
            <div className="flex w-full items-center gap-4">
                <TrackCardProgresbar track={track} />

                <TrackCover imageName={track.imageName ?? null} />

                <CardHeader className="flex w-full flex-col gap-1 px-0">
                    <CardTitle>{track.name}</CardTitle>
                    <CardDescription>{track.author}</CardDescription>
                </CardHeader>

                <div className="flex items-center gap-4">
                    <TrackCardTimer track={track} />
                    <TrackLikes track={track} />
                    <div onClick={(e) => e.stopPropagation()}>
                        <TrackCardMenu track={track} />
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default memo(TrackCard)

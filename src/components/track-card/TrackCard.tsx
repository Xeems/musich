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
            tabIndex={0}
            onClick={() => onClick?.(track)}
            className="hover:bg-primary/10 focus:bg-primary/10 @container relative flex flex-row justify-center overflow-hidden rounded-sm border-none bg-transparent px-4 py-2 shadow-none">
            <TrackCardProgresbar track={track} />

            <TrackCover imageName={track.imageName ?? null} />

            <CardHeader className="text-md flex w-full flex-col items-start justify-center gap-1 px-0">
                <CardTitle>{track.name}</CardTitle>
                <CardDescription>{track.author}</CardDescription>
            </CardHeader>

            <div className="flex flex-row items-center justify-center gap-4">
                <TrackCardTimer track={track} />

                <TrackLikes track={track} />
                <TrackCardMenu track={track} />
            </div>
        </Card>
    )
}

export default memo(TrackCard)

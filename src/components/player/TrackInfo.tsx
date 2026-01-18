import React from 'react'
import { TrackType } from '../../../@types/track'
import TrackCover from '../track-card/TrackCover'

type Props = {
    track: TrackType | null
}

export default function TrackInfo({ track }: Props) {
    return (
        <div className="mx-2 flex flex-row gap-x-2">
            <TrackCover imageName={track?.imageName} size="small" />
            <div className="flex flex-col justify-end md:w-24 lg:w-40">
                <p className="line-clamp-1 w-full truncate font-semibold">
                    {track?.name}
                </p>

                <p className="text-muted-foreground text-sm">{track?.author}</p>
            </div>
        </div>
    )
}

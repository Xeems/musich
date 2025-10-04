import React from 'react'
import { TrackType } from '../../../@types/track'
import TrackCover from '../TrackCover'

type Props = {
    track: TrackType | null
}

export default function TrackInfo({ track }: Props) {
    return (
        <div className="flex flex-row gap-x-4">
            <TrackCover imageName={track?.imageName} size="small" />
            <div className="flex w-40 flex-col">
                <p className="line-clamp-1 w-full max-w-40 truncate font-semibold">
                    {track?.name}
                </p>

                <p className="text-muted-foreground text-sm">{track?.author}</p>
            </div>
        </div>
    )
}

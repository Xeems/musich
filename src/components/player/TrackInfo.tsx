import React from 'react'
import { TrackType } from '../../../@types/track'
import TrackCover from '../TrackCover'
import { CardDescription, CardHeader, CardTitle } from '../ui/card'

type Props = {
    track: TrackType | null
}

export default function TrackInfo({ track }: Props) {
    return (
        <div className="flex w-fit flex-row items-center gap-x-4">
            <TrackCover imageName={track?.imageName} size="small" />
            <CardHeader className="mx-2 flex w-fit flex-col justify-center px-0">
                <CardTitle className="">{track?.name}</CardTitle>
                <CardDescription>{track?.author}</CardDescription>
            </CardHeader>
        </div>
    )
}

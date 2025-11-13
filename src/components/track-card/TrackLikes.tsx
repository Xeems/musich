'use client'

import React from 'react'
import { HeartIcon } from 'lucide-react'
import { TrackType } from '../../../@types/track'
import { cn } from '@/lib/utils'
import { useTrackListStore } from '@/store/trackListStore'

type Props = {
    track: TrackType
}

export default function TrackLikes({ track }: Props) {
    const storeTrack = useTrackListStore((state) =>
        state.tracks.find((t) => t.id === track.id),
    )

    return (
        <div className="flex flex-row items-center gap-x-2">
            <HeartIcon
                className={cn(
                    'size-4 stroke-2',
                    storeTrack?.isLikedByCurrentUser &&
                        'fill-red-400 text-red-400',
                )}
            />
            <p className="hidden @md:block">{storeTrack?.likesCount}</p>
        </div>
    )
}

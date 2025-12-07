'use client'

import React from 'react'
import { HeartIcon } from 'lucide-react'
import { TrackType } from '../../../@types/track'
import { cn } from '@/lib/utils'
import { useTrackListStore } from '../track-list/TrackListContext'

type Props = {
    track: TrackType
}

export default function TrackLikes({ track }: Props) {
    const trackState = useTrackListStore((state) =>
        state.tracks.find((t) => t.id === track.id),
    )

    return (
        <div className="flex flex-row items-center gap-x-2">
            <HeartIcon
                className={cn(
                    'size-4 stroke-2',
                    trackState?.isLikedByCurrentUser &&
                        'fill-red-400 text-red-400',
                )}
            />
            <p className="hidden @md:block">{trackState?.likesCount}</p>
        </div>
    )
}

'use client'

import React, { useState } from 'react'
import { Button } from '../ui/button'
import { HeartIcon } from 'lucide-react'
import { toggleTrackLike } from '@/actions/toggleTrackLike'
import { TrackType } from '../../../@types/track'
import { cn } from '@/lib/utils'

type Props = {
    track: TrackType
}

export default function TrackLikes({ track }: Props) {
    const [isLiked, setIsLiked] = useState(track.isLikedByCurrentUser)
    const [likesCount, setLikesCount] = useState(track.likesCount)

    const handleLikeToggle = async () => {
        const res = await toggleTrackLike(track.id)
        if (res.success === true) {
            setIsLiked(res.isLiked)
            setLikesCount(res.likesCount)
        }
    }

    return (
        <Button
            onClick={(e) => {
                handleLikeToggle()
            }}
            variant={'outline'}>
            <HeartIcon className={cn(isLiked && 'fill-red-400 stroke-0')} />
            {likesCount}
        </Button>
    )
}

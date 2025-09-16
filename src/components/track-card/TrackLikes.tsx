'use client'

import React, { startTransition, useOptimistic } from 'react'
import { Button } from '../ui/button'
import { HeartIcon } from 'lucide-react'
import { toggleTrackLike } from '@/actions/toggleTrackLike'
import { TrackType } from '../../../@types/track'
import { cn } from '@/lib/utils'

type Props = {
    track: TrackType
}

export default function TrackLikes({ track }: Props) {
    const [optimistic, setOptimistic] = useOptimistic({
        isLiked: track.isLikedByCurrentUser,
        likesCount: track.likesCount,
    }) // this mf doesnt work

    const handleLikeToggle = async () => {
        startTransition(() => {
            setOptimistic({
                isLiked: !optimistic.isLiked,
                likesCount: optimistic.isLiked
                    ? optimistic.likesCount - 1
                    : optimistic.likesCount + 1,
            })
        })

        try {
            const result = await toggleTrackLike(track.id)
            if (!result.success) {
                startTransition(() => {
                    setOptimistic({
                        isLiked: optimistic.isLiked,
                        likesCount: optimistic.likesCount,
                    })
                })
            }
        } catch {
            startTransition(() => {
                setOptimistic({
                    isLiked: optimistic.isLiked,
                    likesCount: optimistic.likesCount,
                })
            })
        }
    }

    return (
        <Button onClick={handleLikeToggle} variant={'outline'}>
            <HeartIcon
                className={cn(optimistic.isLiked && 'fill-red-400 stroke-0')}
            />
            {optimistic.likesCount}
        </Button>
    )
}

import React from 'react'
import { TrackType } from '../../../@types/track'
import { DropdownMenuItem } from '../ui/dropdown-menu'
import { useTrackListStore } from '../track-list/TrackListContext'
import { toggleTrackLike } from '@/actions/toggleTrackLike'
import { HeartIcon, Trash2Icon } from 'lucide-react'

type Props = {
    track: TrackType
}

export default function ToggleLikeDropdownItem({ track }: Props) {
    const trackState = useTrackListStore((state) =>
        state.tracks.find((t) => t.id === track.id),
    )

    const toggleLike = useTrackListStore((state) => state.toggleLike)

    const handleLikeToggle = async () => {
        const res = await toggleTrackLike(track.id)
        if (res.success) {
            toggleLike(track.id, !track.isLikedByCurrentUser)
        }
    }

    return (
        <DropdownMenuItem onClick={handleLikeToggle}>
            {trackState?.isLikedByCurrentUser ? (
                <>
                    <Trash2Icon className="text-destructive" />
                    Delete from мy library
                </>
            ) : (
                <>
                    <HeartIcon className="text-red-500" />
                    Add to my library
                </>
            )}
        </DropdownMenuItem>
    )
}

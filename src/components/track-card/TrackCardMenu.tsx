import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { Button } from '../ui/button'
import { EllipsisVerticalIcon, HeartIcon, Trash2Icon } from 'lucide-react'
import { toggleTrackLike } from '@/actions/toggleTrackLike'
import { TrackType } from '../../../@types/track'
import { useTrackListStore } from '@/store/trackListStore'

type Props = {
    track: TrackType
}

export default function TrackCardMenu({ track }: Props) {
    const trackState = useTrackListStore((state) =>
        state.tracks.find((t) => t.id === track.id),
    )

    const toggleLike = useTrackListStore((state) => state.toggleLike)

    const displayMode = useTrackListStore((state) => state.displayMode)

    const deleteTrackFromList = useTrackListStore(
        (state) => state.deleteTrackFromList,
    )

    const handleLikeToggle = async () => {
        const res = await toggleTrackLike(track.id)
        if (res.success) {
            toggleLike(track.id, !track.isLikedByCurrentUser)
            if (displayMode === 'user') deleteTrackFromList(track.id)
        }
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={'ghost'}>
                    <EllipsisVerticalIcon />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuGroup>
                    <DropdownMenuLabel>Playlists</DropdownMenuLabel>
                    <DropdownMenuItem>in-progress</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
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
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

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
import { EllipsisVerticalIcon, Trash2Icon } from 'lucide-react'
import { toggleTrackLike } from '@/actions/toggleTrackLike'
import { TrackType } from '../../../@types/track'
import { useTrackListStore } from '@/store/trackListStore'

type Props = {
    track: TrackType
}

export default function TrackCardMenu({ track }: Props) {
    const toggleLike = useTrackListStore((state) => state.toggleLike)

    const displayMode = useTrackListStore((state) => state.displayMode)

    const deleteTrackFromList = useTrackListStore(
        (state) => state.deleteTrackFromList,
    )

    const handleLikeToggle = async () => {
        const res = await toggleTrackLike(track.id)
        if (res.success) {
            toggleLike(track.id, !track.isLikedByCurrentUser)
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
                    <Trash2Icon className="text-destructive" />
                    Delete from мy library
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

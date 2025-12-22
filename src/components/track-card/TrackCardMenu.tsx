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
import { EllipsisVerticalIcon, Share2Icon } from 'lucide-react'

import { TrackType } from '../../../@types/track'

import { Dialog, DialogTrigger } from '../ui/dialog'
import ToggleLikeDropdownItem from './ToggleLikeDropdownItem'

import ShareTrackDialogContent from './ShareTrackDialogContent'

type Props = {
    track: TrackType
}

export default function TrackCardMenu({ track }: Props) {
    return (
        <Dialog>
            <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                    <Button variant={'ghost'}>
                        <EllipsisVerticalIcon />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    {/* Playlists */}
                    <DropdownMenuGroup>
                        <DropdownMenuLabel>Playlists</DropdownMenuLabel>
                        <DropdownMenuItem>in-progress</DropdownMenuItem>
                    </DropdownMenuGroup>

                    <DropdownMenuSeparator />

                    {/* Share track dialog trigger*/}
                    <DialogTrigger asChild>
                        <DropdownMenuItem>
                            <Share2Icon /> Share track
                        </DropdownMenuItem>
                    </DialogTrigger>

                    {/* Toggle like */}
                    <ToggleLikeDropdownItem track={track} />
                </DropdownMenuContent>
            </DropdownMenu>

            <ShareTrackDialogContent track={track} />
        </Dialog>
    )
}

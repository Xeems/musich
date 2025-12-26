import React, { useState } from 'react'
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

import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'
import ToggleLikeDropdownItem from './ToggleLikeDropdownItem'

import ShareTrackDialogContent from './ShareTrackDialogContent'

type Props = {
    track: TrackType
}

export default function TrackCardMenu({ track }: Props) {
    const [open, setOpen] = useState(false)
    const [menu, setMenu] = useState(false)

    return (
        <div>
            <DropdownMenu open={menu} onOpenChange={setMenu}>
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
                    <DropdownMenuItem
                        onClick={(e) => {
                            e.preventDefault()
                            setMenu(false)
                            setOpen(true)
                        }}>
                        <Share2Icon /> Share track
                    </DropdownMenuItem>

                    {/* Toggle like */}
                    <ToggleLikeDropdownItem track={track} />
                </DropdownMenuContent>
            </DropdownMenu>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <ShareTrackDialogContent track={track} />
                </DialogContent>
            </Dialog>
        </div>
    )
}

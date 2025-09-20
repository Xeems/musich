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

export default function TrackCardMenu() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant={'ghost'}
                    onClick={(e) => {
                        e.stopPropagation()
                    }}>
                    <EllipsisVerticalIcon />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuGroup>
                    <DropdownMenuLabel>Playlists</DropdownMenuLabel>
                    <DropdownMenuItem>in-progress</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Trash2Icon className="text-destructive" />
                    Delete from мy library
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

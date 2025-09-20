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
import { EllipsisVerticalIcon } from 'lucide-react'

export default function TrackCardMenu() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Button>
                    <EllipsisVerticalIcon />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuGroup>
                    <DropdownMenuLabel>Playlists</DropdownMenuLabel>
                    <DropdownMenuItem>in-progress</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Delete from by library</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { LogOutIcon } from 'lucide-react'
import { MinimalUserType } from '../../@types/user'
import SignOut from '@/authentification/actions/signOut'

export default function UserInfo({ user }: { user: MinimalUserType }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <p>{user.username}</p>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuGroup>
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={SignOut}
                    className="flex flex-row items-center justify-between">
                    Sign Out
                    <LogOutIcon className="text-secondary-foreground" />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

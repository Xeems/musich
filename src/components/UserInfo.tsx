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
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import {
    DesktopWrapper,
    MobileWrapper,
    ResponsiveWrapper,
} from './ResponsiveWrapper'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from './ui/accordion'

export default function UserInfo({ user }: { user: MinimalUserType }) {
    console.log(user)
    return (
        <ResponsiveWrapper>
            <MobileWrapper>
                <Accordion
                    type="single"
                    collapsible
                    className="bg-muted rounded-md border">
                    <AccordionItem value="item-1">
                        <AccordionTrigger className="flex w-full flex-row items-center justify-between px-4">
                            <div className="flex flex-row items-center gap-x-4">
                                <Avatar>
                                    <AvatarImage src={user.picture} alt="" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <p>{user.username}</p>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-4"></AccordionContent>
                    </AccordionItem>
                </Accordion>
            </MobileWrapper>

            <DesktopWrapper>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant={'ghost'}
                            className="bg-muted w-full justify-start border px-4 py-8 md:border-none md:bg-transparent md:py-4">
                            <Avatar>
                                <AvatarImage src={user.picture} alt="" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <p>{user.username}</p>
                        </Button>
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
            </DesktopWrapper>
        </ResponsiveWrapper>
    )
}

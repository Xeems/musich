import React from 'react'
import UserCard from '../user/UserCard'
import { LogOutIcon, MenuIcon } from 'lucide-react'
import MainNav from './MainNav'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '../ui/sheet'
import { Button } from '../ui/button'
import SignOut from '@/authentification/actions/signOut'
import Logo from './Logo'

export default function Header() {
    return (
        <header className="border-primary w-full border-b bg-gradient-to-r via-orange-50/80 px-4 backdrop-blur-sm">
            <div className="mx-auto flex max-w-6xl flex-row items-center justify-between gap-x-4 py-2">
                <Logo />

                <div className="md:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="bg-muted border">
                                <MenuIcon className="h-6 w-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent>
                            <SheetHeader>
                                <SheetTitle>Musich App</SheetTitle>
                                <SheetDescription></SheetDescription>
                            </SheetHeader>
                            <div className="flex flex-col gap-y-4 px-4">
                                <UserCard />
                                <MainNav />
                            </div>
                            <SheetFooter>
                                <Button
                                    onClick={SignOut}
                                    variant={'destructive'}>
                                    <LogOutIcon />
                                    Sign Out
                                </Button>
                            </SheetFooter>
                        </SheetContent>
                    </Sheet>
                </div>

                <div className="hidden md:flex">
                    <MainNav />
                </div>
                <div className="hidden md:flex">
                    <UserCard />
                </div>
            </div>
        </header>
    )
}

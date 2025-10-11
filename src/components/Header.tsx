import React from 'react'
import UserCard from './UserCard'
import { LogOutIcon, MenuIcon, MusicIcon } from 'lucide-react'
import MainNav from './MainNav'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from './ui/sheet'
import { Button } from './ui/button'
import {
    DesktopWrapper,
    MobileWrapper,
    ResponsiveWrapper,
} from './ResponsiveWrapper'
import SignOut from '@/authentification/actions/signOut'

export default function Header() {
    return (
        <header className="border-primary w-full border-b bg-gradient-to-r via-orange-50/80 px-4 backdrop-blur-sm">
            <div className="mx-auto flex max-w-6xl flex-row items-center justify-between gap-x-4 py-2">
                <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-gradient-to-br from-orange-200 to-orange-300 p-2.5 shadow-md">
                        <MusicIcon className="h-6 w-6 text-orange-700" />
                    </div>
                    <div>
                        <h1 className="text-brand-primary text-xl font-bold">
                            Musich
                        </h1>
                        <p className="text-muted-content text-xs">
                            Share your sound
                        </p>
                    </div>
                </div>

                <ResponsiveWrapper>
                    <MobileWrapper>
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
                    </MobileWrapper>

                    <DesktopWrapper>
                        <MainNav />
                        <UserCard />
                    </DesktopWrapper>
                </ResponsiveWrapper>
            </div>
        </header>
    )
}

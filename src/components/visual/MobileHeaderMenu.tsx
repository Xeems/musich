'use client'
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
import { LogOutIcon, MenuIcon } from 'lucide-react'
import UserCard from '../user/UserCard'
import MainNav from './MainNav'
import SignOut from '@/authentification/actions/signOut'

export default function MobileHeaderMenu() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="bg-muted border">
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
                    <Button onClick={SignOut} variant={'destructive'}>
                        <LogOutIcon />
                        Sign Out
                    </Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}

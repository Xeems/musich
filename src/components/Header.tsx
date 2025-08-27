import React from 'react'
import UserInfoCard from './UserInfoCard'
import { MusicIcon } from 'lucide-react'
import MainNav from './MainNav'

export default function Header() {
    return (
        <header className="border-primary w-full border-b bg-gradient-to-r via-orange-50/80 backdrop-blur-sm">
            <div className="mx-auto flex max-w-6xl flex-row items-center justify-between gap-x-4 py-2">
                {/* Logo */}
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

                <MainNav />

                <UserInfoCard />
            </div>
        </header>
    )
}

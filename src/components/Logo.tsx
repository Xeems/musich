import { MusicIcon } from 'lucide-react'
import React from 'react'

export default function Logo() {
    return (
        <div className="flex w-fit items-center justify-center gap-3">
            <div className="rounded-xl bg-gradient-to-br from-orange-200 to-orange-300 p-2.5 shadow-md">
                <MusicIcon className="h-6 w-6 text-orange-700" />
            </div>
            <div className="w-full">
                <h1 className="text-brand-primary text-xl font-bold">Musich</h1>
                <p className="text-muted-content line-clamp-1 text-xs">
                    Share your sound
                </p>
            </div>
        </div>
    )
}

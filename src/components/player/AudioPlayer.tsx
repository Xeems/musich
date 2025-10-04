'use client'

import TrackCover from '../TrackCover'
import { useRef } from 'react'
import { usePlayerStore } from '@/store/playerStore'
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card'
import TrackTimeSlider from './TrackTimeSlider'
import PlayerModeToggle from './PlayerModeToggle'
import PlayerVolume from './PlayerVolume'

export default function AudioPlayer() {
    const audioRef = useRef<HTMLAudioElement>(null)

    const currentTrack = usePlayerStore((s) => s.currentTrack)

    return (
        <Card className="fixed inset-x-0 bottom-0 z-50 flex w-full flex-row items-center rounded-none px-3 py-3">
            <audio ref={audioRef} />
            <div className="mx-auto flex w-full flex-row items-center justify-center gap-2 xl:max-w-[90%]">
                <TrackCover imageName={currentTrack?.imageName} size="small" />
                <CardHeader className="mx-2 flex w-100 flex-col justify-center px-0">
                    <CardTitle className="line-clamp-1 w-full">
                        {currentTrack?.name}
                    </CardTitle>
                    <CardDescription className="">
                        {currentTrack?.author}
                    </CardDescription>
                </CardHeader>

                <PlayerModeToggle audioRef={audioRef} />

                <TrackTimeSlider audioRef={audioRef} track={currentTrack} />

                <PlayerVolume audioRef={audioRef} />
            </div>
        </Card>
    )
}

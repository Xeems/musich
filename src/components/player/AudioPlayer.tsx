'use client'

import { useRef } from 'react'
import { usePlayerStore } from '@/store/playerStore'
import { Card } from '../ui/card'
import TrackTimeSlider from './TrackTimeSlider'
import PlayerModeToggle from './PlayerModeToggle'
import PlayerVolume from './PlayerVolume'
import TrackInfo from './TrackInfo'
import PlayerControls from './PlayerControls'

export default function AudioPlayer() {
    const audioRef = useRef<HTMLAudioElement>(null)

    const currentTrack = usePlayerStore((s) => s.currentTrack)

    return (
        <Card className="@container fixed inset-x-0 bottom-0 z-50 flex w-full flex-row items-center justify-center rounded-none border-none p-0 md:border-t md:border-solid md:p-3">
            <audio ref={audioRef} />
            <div className="grid w-full auto-rows-min grid-cols-[auto] grid-rows-[auto_auto] gap-2 md:grid-rows-1 md:items-center lg:max-w-[100%] xl:max-w-[90%]">
                <div className="row-start-2 flex flex-row items-start justify-between px-2 pb-2">
                    <TrackInfo track={currentTrack} />

                    <div className="hidden md:block">
                        <PlayerModeToggle audioRef={audioRef} />
                    </div>
                    <PlayerControls audioRef={audioRef} track={currentTrack} />
                </div>

                <div className="row-start-1 h-fit w-full md:col-auto md:row-auto">
                    <TrackTimeSlider audioRef={audioRef} track={currentTrack} />
                </div>

                <div className="hidden lg:block">
                    <PlayerVolume audioRef={audioRef} />
                </div>
            </div>
        </Card>
    )
}

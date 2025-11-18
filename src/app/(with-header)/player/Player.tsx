'use client'

import PlayerControls from '@/components/player/PlayerControls'
import PlayerModeToggle from '@/components/player/PlayerModeToggle'
import PlayerVolume from '@/components/player/PlayerVolume'
import TrackTimeSlider from '@/components/player/TrackTimeSlider'
import TrackCover from '@/components/TrackCover'
import { usePlayerStore } from '@/store/playerStore'
import React from 'react'

export default function Player() {
    const currentTrack = usePlayerStore((s) => s.currentTrack)

    return (
        <div className="w-full">
            <div className="flex flex-col gap-y-8">
                <div className="flex flex-row gap-x-8">
                    <div>
                        <TrackCover
                            imageName={currentTrack?.imageName}
                            size="large"
                        />
                    </div>

                    <div className="flex flex-col justify-between">
                        <div className="flex flex-col">
                            <h2 className="text-player-title mb-2 text-4xl font-bold text-balance">
                                {currentTrack?.name}
                            </h2>
                            <p className="text-player-artist text-muted-foreground text-2xl">
                                {currentTrack?.author}
                            </p>
                        </div>
                        <div className="flex flex-row items-center justify-between">
                            <PlayerModeToggle />
                            <PlayerControls track={currentTrack} />
                            <PlayerVolume />
                        </div>
                    </div>
                </div>

                <TrackTimeSlider track={currentTrack} />
            </div>
        </div>
    )
}

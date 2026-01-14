'use client'

import PlayerControls from '@/components/player/PlayerControls'
import PlayerModeToggle from '@/components/player/PlayerModeToggle'
import PlayerVolume from '@/components/player/PlayerVolume'
import TrackTimeSlider from '@/components/player/TrackTimeSlider'
import TrackCover from '@/components/TrackCover'

import { usePlayerStore } from '@/store/playerStore'
import { useEffect } from 'react'
import { TrackType } from '../../../@types/track'
import { useShallow } from 'zustand/shallow'

type PlayerProps = {
    initialTrack?: TrackType
}

export default function PagePlayer({ initialTrack }: PlayerProps) {
    const { currentTrack, tracks, source, setCurrentTrack } = usePlayerStore(
        useShallow((s) => ({
            currentTrack: s.currentTrack,
            tracks: s.queue,
            source: s.queueSource,
            setCurrentTrack: s.setCurrentTrack,
        })),
    )

    useEffect(() => {
        if (initialTrack) {
            setCurrentTrack(initialTrack)
        }
    }, [initialTrack, setCurrentTrack])

    return (
        <div className="flex w-full flex-col items-center justify-center gap-y-10">
            <div className="flex w-full justify-center">
                <TrackCover
                    imageName={currentTrack?.imageName}
                    size="full"
                    quality={100}
                />
            </div>

            <div className="flex h-full w-full flex-col items-stretch justify-between gap-y-8">
                <div className="flex flex-col items-center">
                    <h1 className="text-player-title mb-2 text-4xl font-bold text-balance">
                        {currentTrack?.name}
                    </h1>
                    <p className="text-player-artist text-muted-foreground text-2xl">
                        {currentTrack?.author}
                    </p>
                </div>
                <div className="flex flex-row items-center justify-between">
                    <PlayerModeToggle />
                    <PlayerControls size="large" />
                    <PlayerVolume isSliderHidden />
                </div>
            </div>

            <div className="col-span-2 row-start-2 w-full">
                <TrackTimeSlider />
            </div>
        </div>
    )
}

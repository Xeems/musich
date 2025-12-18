'use client'

import PlayerControls from '@/components/player/PlayerControls'
import PlayerModeToggle from '@/components/player/PlayerModeToggle'
import PlayerVolume from '@/components/player/PlayerVolume'
import TrackTimeSlider from '@/components/player/TrackTimeSlider'
import TrackList from '@/components/track-list/TrackList'
import { TrackListProvider } from '@/components/track-list/TrackListContext'
import TrackListInfiniteScrollTrigger from '@/components/track-list/TrackListInfiniteScrollTrigger'
import TrackCover from '@/components/TrackCover'
import { ScrollArea } from '@/components/ui/scroll-area'
import { usePlayerStore } from '@/store/playerStore'
import React from 'react'

export default function Player() {
    const currentTrack = usePlayerStore((s) => s.currentTrack)
    const tracks = usePlayerStore((s) => s.queue)
    const source = usePlayerStore((s) => s.queueSource)

    return (
        <div className="w-full space-y-8">
            <div className="flex flex-col gap-y-8">
                <div className="flex flex-row gap-x-8">
                    <div>
                        <TrackCover
                            imageName={currentTrack?.imageName}
                            size="large"
                        />
                    </div>

                    <div className="flex w-full flex-col justify-between">
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
                            <PlayerControls />
                            <PlayerVolume isSliderHidden={true} />
                        </div>
                    </div>
                </div>

                <TrackTimeSlider />
            </div>
            <div>
                <p className="text-lg font-medium">Queue</p>
                <ScrollArea className="h-80">
                    <TrackListProvider
                        initialState={{
                            source: source,
                            tracks: tracks,
                        }}>
                        <TrackList />
                        <TrackListInfiniteScrollTrigger />
                    </TrackListProvider>
                </ScrollArea>
            </div>
        </div>
    )
}

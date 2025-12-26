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
import React, { useEffect } from 'react'
import { TrackType } from '../../../@types/track'
import { useShallow } from 'zustand/shallow'

type PlayerProps = {
    initialTrack?: TrackType
}

export default function Player({ initialTrack }: PlayerProps) {
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
        <div className="@container flex w-full flex-1 flex-col space-y-8">
            <div className="flex min-h-svw flex-col items-center justify-center gap-y-10 @md:grid @md:min-h-fit @md:grid-cols-[auto_1fr] @md:grid-rows-[auto_1fr] @md:gap-4">
                <div className="flex w-full justify-center @md:size-36 @md:w-fit">
                    <TrackCover
                        imageName={currentTrack?.imageName}
                        size="full"
                        quality={100}
                    />
                </div>

                <div className="flex h-full w-full flex-col items-stretch justify-between gap-y-8 @md:gap-4">
                    <div className="flex flex-col items-center @md:items-start">
                        <h1 className="text-player-title mb-2 text-4xl font-bold text-balance">
                            {currentTrack?.name}
                        </h1>
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

                <div className="col-span-2 row-start-2 w-full">
                    <TrackTimeSlider />
                </div>
            </div>

            {tracks.length > 1 && (
                <div>
                    <p className="text-lg font-medium">Queue</p>
                    <TrackListProvider
                        initialState={{
                            source: source,
                            tracks: tracks,
                        }}>
                        <TrackList />
                        <TrackListInfiniteScrollTrigger />
                    </TrackListProvider>
                </div>
            )}
        </div>
    )
}

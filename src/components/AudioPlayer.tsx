'use client'

import {
    PauseIcon,
    PlayIcon,
    SkipBackIcon,
    SkipForwardIcon,
    Volume2Icon,
    VolumeXIcon,
} from 'lucide-react'
import { Button } from './ui/button'
import { Slider } from './ui/slider'
import { milSecToMins } from '@/lib/utils'
import TrackCover from './TrackCover'
import React, { useRef } from 'react'
import { usePlayerStore } from '@/store'
import { useAudioLoader } from '@/hooks/useAudioLoader'
import { usePlayerControls } from '@/hooks/usePlayerControls'
import { Card, CardDescription, CardHeader, CardTitle } from './ui/card'
import { useTrackQueue } from '@/hooks/useTrackQueue'

export default function AudioPlayer() {
    const audioRef = useRef<HTMLAudioElement>(null)

    const currentTrack = usePlayerStore((s) => s.currentTrack)

    const { bufferedPercent, duration } = useAudioLoader(currentTrack, audioRef)

    const {
        isPlaying,
        currentTrackTime,
        volume,
        togglePlay,
        handleSeek,
        setVolume,
    } = usePlayerControls(audioRef)

    const { playNext, playPrev } = useTrackQueue(audioRef)

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

                <div className="flex flex-row items-center justify-center"></div>
                <div className="flex flex-row items-center justify-center gap-x-2">
                    <Button
                        onClick={playPrev}
                        variant="ghost"
                        className="h-8 w-8 rounded-full p-0">
                        <SkipBackIcon />
                    </Button>
                    <Button
                        disabled={!currentTrack}
                        onClick={togglePlay}
                        className="flex h-10 w-10 items-center justify-center rounded-4xl p-0">
                        {isPlaying ? (
                            <PauseIcon className="size-6" />
                        ) : (
                            <PlayIcon className="size-6" />
                        )}
                    </Button>
                    <Button
                        variant="ghost"
                        className="h-8 w-8 rounded-full p-0"
                        onClick={playNext}>
                        <SkipForwardIcon />
                    </Button>
                </div>

                <div className="flex w-full flex-row gap-x-4">
                    <Slider
                        value={[currentTrackTime]}
                        onValueChange={handleSeek}
                        max={duration || 100}
                        step={1}
                        className="z-10 hover:cursor-pointer"
                        buffered={bufferedPercent}
                    />
                    <p>{milSecToMins(currentTrackTime)}</p>
                </div>

                <div className="flex flex-row items-center gap-x-4">
                    {volume !== 0 ? (
                        <Volume2Icon className="size-6" />
                    ) : (
                        <VolumeXIcon className="size-6" />
                    )}
                    <Slider
                        className="w-20"
                        max={1.0}
                        min={0.0}
                        step={0.01}
                        value={[volume]}
                        onValueChange={(value) => setVolume(value[0])}
                    />
                </div>
            </div>
        </Card>
    )
}

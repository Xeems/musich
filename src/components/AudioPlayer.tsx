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
import { Card } from './ui/card'
//import { useTrackQueue } from '@/hooks/useTrackQueue'

function AudioPlayer() {
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

    //const { playNextTrack, playTrackByIndex } = useTrackQueue(audioRef)

    return (
        <Card className="fixed bottom-4 mx-20 flex w-2/3 flex-row items-center justify-center gap-2 px-4 py-3">
            <audio ref={audioRef} />

            <TrackCover imageName={currentTrack?.imageName} />
            <div>
                <span>{currentTrack?.name}</span>
                <span>{currentTrack?.author}</span>
            </div>

            <div className="flex flex-row gap-x-2">
                <Button variant="ghost">
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
                <Button variant="ghost">
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
        </Card>
    )
}

export default React.memo(AudioPlayer)

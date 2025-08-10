'use client'

import { PauseIcon, PlayIcon, Volume2Icon, VolumeXIcon } from 'lucide-react'
import { Button } from './ui/button'
import { Slider } from './ui/slider'
import { milSecToMins } from '@/lib/utils'
import TrackCover from './TrackCover'
import React, { useRef } from 'react'
import { usePlayerStore } from '@/store'
import { useAudioLoader } from '@/hooks/useAudioLoader'
import { usePlayerControls } from '@/hooks/usePlayerControls'
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
        <div className="flex w-full flex-col items-center justify-center">
            <h1 className="text-lg font-semibold">{currentTrack?.name}</h1>

            <audio ref={audioRef} autoPlay />

            <div className="flex w-1/3 flex-row items-center gap-2">
                <TrackCover imageName={currentTrack?.imageName} />

                <Button
                    disabled={!currentTrack}
                    onClick={togglePlay}
                    variant="ghost"
                    className="flex h-10 w-10 items-center justify-center p-0">
                    {isPlaying ? (
                        <PauseIcon className="size-6" />
                    ) : (
                        <PlayIcon className="size-6" />
                    )}
                </Button>

                <div className="w-full">
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
        </div>
    )
}

export default React.memo(AudioPlayer)

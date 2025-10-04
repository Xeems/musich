import React from 'react'
import { Slider } from '../ui/slider'
import { usePlayerControls } from '@/hooks/player/usePlayerControls'
import { useAudioLoader } from '@/hooks/player/useAudioLoader'
import { milSecToMins } from '@/lib/utils'
import { TrackType } from '../../../@types/track'
import { Button } from '../ui/button'
import {
    PauseIcon,
    PlayIcon,
    SkipBackIcon,
    SkipForwardIcon,
} from 'lucide-react'
import { useTrackQueue } from '@/hooks/player/useTrackQueue'

type Props = {
    audioRef: React.RefObject<HTMLAudioElement | null>
    track: TrackType | null
}

export default function TrackTimeSlider({ audioRef, track }: Props) {
    const {
        currentTrackTime,
        sliderValue,
        commitSeek,
        startSeek,
        togglePlay,
        isPlaying,
    } = usePlayerControls(audioRef)

    const { bufferedPercent, duration } = useAudioLoader(track, audioRef)
    const { playNext, playPrev, togglePlayMode, playMode } =
        useTrackQueue(audioRef)

    return (
        <>
            <div className="flex flex-row items-center justify-center gap-x-2">
                <Button
                    onClick={playPrev}
                    variant="ghost"
                    className="h-8 w-8 rounded-full p-0">
                    <SkipBackIcon />
                </Button>
                <Button
                    disabled={!track}
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
                    value={[sliderValue]}
                    onValueChange={(val) => startSeek(val[0])}
                    onValueCommit={(val) => commitSeek(val[0])}
                    max={duration || 100}
                    step={0.1}
                    className="z-10 hover:cursor-pointer"
                    buffered={bufferedPercent}
                />
                <p>{milSecToMins(currentTrackTime)}</p>
            </div>
        </>
    )
}

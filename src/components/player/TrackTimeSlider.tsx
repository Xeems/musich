import React from 'react'
import { Slider } from '../ui/slider'
import { usePlayerControls } from '@/hooks/usePlayerControls'
import { useAudioLoader } from '@/hooks/useAudioLoader'
import { milSecToMins } from '@/lib/utils'
import { TrackType } from '../../../@types/track'

type Props = {
    audioRef: React.RefObject<HTMLAudioElement | null>
    track: TrackType | null
}

export default function TrackTimeSlider({ audioRef, track }: Props) {
    const { currentTrackTime, sliderValue, commitSeek, startSeek } =
        usePlayerControls(audioRef)

    const { bufferedPercent, duration } = useAudioLoader(track, audioRef)

    return (
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
    )
}

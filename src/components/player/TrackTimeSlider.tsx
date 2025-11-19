'use client'

import React, { useState } from 'react'
import { Slider } from '../ui/slider'
import { milSecToMins } from '@/lib/utils'
import { usePlayerStore } from '@/store/playerStore'

export default function TrackTimeSlider() {
    const setCurrentTrackTime = usePlayerStore((s) => s.setCurrentTrackTime)
    const currentTrackTime = usePlayerStore((s) => s.currentTrackTime)
    const duration = usePlayerStore((s) => s.currentTrack?.duration)

    const [seekingValue, setSeekingValue] = useState<number | null>(null)

    const startSeek = (seconds: number) => {
        setSeekingValue(seconds)
    }

    const commitSeek = (seconds: number) => {
        setCurrentTrackTime(seconds)
        setSeekingValue(null)
    }

    return (
        <div className="flex w-full flex-row items-center">
            <div className="flex w-full flex-row items-center gap-x-4">
                <Slider
                    value={[seekingValue ?? currentTrackTime]}
                    onValueChange={(val) => startSeek(val[0])}
                    onValueCommit={(val) => commitSeek(val[0])}
                    max={duration || 100}
                    step={0.1}
                    className="z-10 hover:cursor-pointer"
                    //buffered={bufferedPercent}
                />
                <p className="hidden font-medium md:block">
                    {milSecToMins(currentTrackTime)}
                </p>
            </div>
        </div>
    )
}

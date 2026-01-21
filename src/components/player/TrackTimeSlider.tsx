'use client'

import { useState } from 'react'
import { Slider } from '../ui/slider'
import { milSecToMins } from '@/lib/utils'
import { usePlayerStore } from '@/store/playerStore'
import { motion } from 'framer-motion'

export default function TrackTimeSlider() {
    const [seekingValue, setSeekingValue] = useState<number | null>(null)
    const currentTrackTime = usePlayerStore((s) => s.currentTrackTime)
    const duration = usePlayerStore((s) => s.currentTrack?.duration)
    const bufferedPercent = usePlayerStore((s) => s.currentTrackBufferedPercent)
    const setCurrentTrackTime = usePlayerStore((s) => s.setCurrentTrackTime)

    const startSeek = (seconds: number) => {
        setSeekingValue(seconds)
    }

    const commitSeek = (seconds: number) => {
        setCurrentTrackTime(seconds)
        setSeekingValue(null)
    }

    return (
        <div className="flex w-full flex-row items-center">
            <div
                onPointerDown={(e) => e.stopPropagation()}
                onPointerMove={(e) => e.stopPropagation()}
                className="flex w-full flex-row items-center gap-x-4">
                <Slider
                    onPointerDown={(e) => e.stopPropagation}
                    value={[seekingValue ?? currentTrackTime]}
                    onValueChange={(val) => startSeek(val[0])}
                    onValueCommit={(val) => commitSeek(val[0])}
                    max={duration || 100}
                    step={0.1}
                    className="z-10 hover:cursor-pointer"
                    buffered={bufferedPercent}
                />
                <p className="hidden font-medium md:block">
                    {milSecToMins(currentTrackTime)}
                </p>
            </div>
        </div>
    )
}

'use client'

import PlayerControls from '@/components/player/PlayerControls'
import PlayerVolume from '@/components/player/PlayerVolume'
import TrackTimeSlider from '@/components/player/TrackTimeSlider'
import { usePlayerStore } from '@/store/playerStore'
import React from 'react'

export default function Player() {
    const currentTrack = usePlayerStore((s) => s.currentTrack)

    return (
        <div>
            <PlayerControls track={currentTrack} />
            <TrackTimeSlider track={currentTrack} />
            <PlayerVolume />
        </div>
    )
}

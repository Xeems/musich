'use client'
import { useAudioLoader } from '@/hooks/player/useAudioLoader'
import { usePlayerStore } from '@/store/playerStore'
import React, { useEffect, useRef } from 'react'

export default function GlobalAudio() {
    const audioRef = useRef<HTMLAudioElement>(null)
    const setAudioRef = usePlayerStore((s) => s.setAudioRef)
    const track = usePlayerStore((s) => s.currentTrack)

    const { bufferedPercent, duration } = useAudioLoader(track, audioRef)

    useEffect(() => {
        if (audioRef.current) {
            setAudioRef(audioRef as React.RefObject<HTMLAudioElement>)
        }
    }, [audioRef])

    return <audio ref={audioRef} />
}

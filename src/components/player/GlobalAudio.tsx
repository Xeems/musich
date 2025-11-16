'use client'
import { usePlayerStore } from '@/store/playerStore'
import React, { useEffect, useRef } from 'react'

export default function GlobalAudio() {
    const audioRef = useRef<HTMLAudioElement>(null)
    const setAudioRef = usePlayerStore((s) => s.setAudioRef)

    useEffect(() => {
        if (audioRef.current) {
            setAudioRef(audioRef as React.RefObject<HTMLAudioElement>)
        }
    }, [audioRef])

    return <audio ref={audioRef} />
}

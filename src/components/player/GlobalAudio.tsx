'use client'
import { useAudioLoader } from '@/hooks/player/useAudioLoader'
import { usePlayerStore } from '@/store/playerStore'
import React, { RefObject, useEffect, useLayoutEffect, useRef } from 'react'

export default function GlobalAudio() {
    const audioRef = useRef<HTMLAudioElement>(null)
    const track = usePlayerStore((s) => s.currentTrack)
    const setAudioRef = usePlayerStore((s) => s.setAudioRef)

    const { bufferedPercent } = useAudioLoader(track, audioRef)

    useLayoutEffect(() => {
        const audio = audioRef.current
        if (!audio) return

        setAudioRef(audioRef as RefObject<HTMLAudioElement>)

        const handleTimeUpdate = () =>
            usePlayerStore.setState({ currentTrackTime: audio.currentTime })

        audio.addEventListener('timeupdate', handleTimeUpdate)

        return () => audio.removeEventListener('timeupdate', handleTimeUpdate)
    })

    useEffect(() => {
        usePlayerStore.setState({
            currentTrackBufferedPercent: bufferedPercent,
        })
    }, [bufferedPercent])

    return <audio ref={audioRef} />
}

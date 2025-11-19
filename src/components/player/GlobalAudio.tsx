'use client'
import { useAudioLoader } from '@/hooks/player/useAudioLoader'
import { usePlayerStore } from '@/store/playerStore'
import React, { useEffect, useRef } from 'react'

export default function GlobalAudio() {
    const audioRef = useRef<HTMLAudioElement>(null)
    const track = usePlayerStore((s) => s.currentTrack)
    const setAudioRef = usePlayerStore((s) => s.setAudioRef)

    const { bufferedPercent, duration } = useAudioLoader(track, audioRef)

    useEffect(() => {
        if (audioRef.current) {
            setAudioRef(audioRef as React.RefObject<HTMLAudioElement>)
        }
    }, [audioRef])

    useEffect(() => {
        const audio = audioRef.current
        if (!audio) return

        const handleTimeUpdate = () =>
            usePlayerStore.setState({
                currentTrackTime: audio.currentTime,
            })
        //const handleLoaded = () => setDuration(audio.duration)

        audio.addEventListener('timeupdate', handleTimeUpdate)
        //audio.addEventListener('loadedmetadata', handleLoaded)

        return () => {
            audio.removeEventListener('timeupdate', handleTimeUpdate)
            //audio.removeEventListener('loadedmetadata', handleLoaded)
        }
    }, [audioRef])

    return <audio ref={audioRef} />
}

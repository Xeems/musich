import { usePlayerStore } from '@/store'
import { RefObject, useEffect, useState } from 'react'

export function usePlayerControls(
    audioRef: RefObject<HTMLAudioElement | null>,
) {
    const isPlaying = usePlayerStore((s) => s.isPlaying)
    const currentTrackTime = usePlayerStore((s) => s.currentTrackTime)
    const setIsPlaying = usePlayerStore((s) => s.setIsPlaying)
    const setCurrentTrackTime = usePlayerStore((s) => s.setCurrentTrackTime)

    const [volume, setVolume] = useState(0.7)
    const [seekingValue, setSeekingValue] = useState<number | null>(null)

    useEffect(() => {
        const audio = audioRef.current
        if (!audio) return

        const updateTime = () => setCurrentTrackTime(audio.currentTime)
        const handlePlay = () => setIsPlaying(true)
        const handlePause = () => setIsPlaying(false)
        const handleEnded = () => setIsPlaying(false)

        audio.addEventListener('timeupdate', updateTime)
        audio.addEventListener('play', handlePlay)
        audio.addEventListener('pause', handlePause)
        audio.addEventListener('ended', handleEnded)

        return () => {
            audio.removeEventListener('timeupdate', updateTime)
            audio.removeEventListener('play', handlePlay)
            audio.removeEventListener('pause', handlePause)
            audio.removeEventListener('ended', handleEnded)
        }
    }, [audioRef, setCurrentTrackTime, setIsPlaying])

    const togglePlay = () => {
        const audio = audioRef.current
        if (!audio) return
        if (audio.paused) {
            audio.play()
        } else {
            audio.pause()
        }
    }

    const handleSeek = (seconds: number) => {
        const audio = audioRef.current
        if (!audio) return

        audio.currentTime = seconds
    }

    const startSeek = (seconds: number) => {
        setSeekingValue(seconds)
    }

    const commitSeek = (seconds: number) => {
        handleSeek(seconds)
        setCurrentTrackTime(seconds)
        setSeekingValue(null)
    }

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume
        }
    }, [volume, audioRef])

    return {
        isPlaying,
        togglePlay,
        handleSeek,
        startSeek,
        commitSeek,
        setVolume,
        currentTrackTime,
        volume,
        seekingValue,
        sliderValue: seekingValue ?? currentTrackTime,
    }
}

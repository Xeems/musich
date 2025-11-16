import { usePlayerStore } from '@/store/playerStore'
import { useEffect, useState } from 'react'

export function usePlayerControls(audioRef: HTMLAudioElement | null) {
    const isPlaying = usePlayerStore((s) => s.isPlaying)
    const currentTrackTime = usePlayerStore((s) => s.currentTrackTime)
    const setIsPlaying = usePlayerStore((s) => s.setIsPlaying)
    const setCurrentTrackTime = usePlayerStore((s) => s.setCurrentTrackTime)

    const [seekingValue, setSeekingValue] = useState<number | null>(null)

    const togglePlay = () => {
        const audio = audioRef
        if (!audio) return
        if (audio.paused) {
            audio.play()
        } else {
            audio.pause()
        }
    }

    useEffect(() => {
        const audio = audioRef
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

    const handleSeek = (seconds: number) => {
        const audio = audioRef
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

    return {
        isPlaying,
        togglePlay,
        handleSeek,
        startSeek,
        commitSeek,
        currentTrackTime,
        seekingValue,
        sliderValue: seekingValue ?? currentTrackTime,
    }
}

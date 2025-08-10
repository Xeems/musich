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

    useEffect(() => {
        const audio = audioRef.current
        if (!audio) return
        const updateTime = () => setCurrentTrackTime(audio.currentTime)
        audio.addEventListener('timeupdate', updateTime)
        return () => audio.removeEventListener('timeupdate', updateTime)
    }, [])

    const togglePlay = () => {
        const audio = audioRef.current
        if (!audio) return
        if (audio.paused) {
            audio.play()
            setIsPlaying(true)
        } else {
            audio.pause()
            setIsPlaying(false)
        }
    }

    const handleSeek = (seconds: number[]) => {
        if (audioRef.current) {
            audioRef.current.currentTime = seconds[0]
        }
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
        setVolume,
        currentTrackTime,
        volume,
    }
}

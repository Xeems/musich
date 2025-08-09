'use client'

import { useEffect, useRef, useState } from 'react'
import Hls from 'hls.js'
import { usePlayerStore } from '@/store'

export function useAudioController() {
    const audioRef = useRef<HTMLAudioElement | null>(null)
    const currentTrack = usePlayerStore((s) => s.currentTrack)
    const isPlaying = usePlayerStore((s) => s.isPlaying)
    const setIsPlaying = usePlayerStore((s) => s.setIsPlaying)
    const currentTrackTime = usePlayerStore((s) => s.currentTrackTime)
    const setCurrentTrackTime = usePlayerStore((s) => s.setCurrentTrackTime)

    const [bufferedPercent, setBufferedPercent] = useState(0)
    const [duration, setDuration] = useState(0)
    const [volume, setVolume] = useState(0.7)

    useEffect(() => {
        if (!currentTrack || !audioRef.current) return
        const hls = new Hls()
        hls.loadSource(`/api/hls/${currentTrack.trackDir}/index.m3u8`)
        hls.attachMedia(audioRef.current)
        return () => hls.destroy()
    }, [currentTrack])

    useEffect(() => {
        const audio = audioRef.current
        if (!audio) return
        const updateTime = () => setCurrentTrackTime(audio.currentTime)
        audio.addEventListener('timeupdate', updateTime)
        return () => audio.removeEventListener('timeupdate', updateTime)
    }, [])

    useEffect(() => {
        const audio = audioRef.current
        if (!audio) return
        const updateBuffer = () => {
            try {
                const buffered = audio.buffered
                const current = audio.currentTime
                for (let i = 0; i < buffered.length; i++) {
                    if (
                        buffered.start(i) <= current &&
                        buffered.end(i) >= current
                    ) {
                        const bufferEnd = buffered.end(i)
                        const realDuration =
                            audio.seekable.length > 0
                                ? audio.seekable.end(0)
                                : audio.duration
                        setDuration(realDuration)
                        setBufferedPercent((bufferEnd / realDuration) * 100)
                        break
                    }
                }
            } catch {}
        }
        audio.addEventListener('progress', updateBuffer)
        audio.addEventListener('loadedmetadata', updateBuffer)
        return () => {
            audio.removeEventListener('progress', updateBuffer)
            audio.removeEventListener('loadedmetadata', updateBuffer)
        }
    }, [])

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume
        }
    }, [volume])

    const handleSeek = (value: number[]) => {
        if (audioRef.current) {
            audioRef.current.currentTime = value[0]
        }
    }

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

    return {
        audioRef,
        currentTrack,
        isPlaying,
        currentTrackTime,
        bufferedPercent,
        duration,
        volume,
        setVolume,
        handleSeek,
        togglePlay,
    }
}

'use client'

import { usePlayerStore } from '@/store'
import Hls from 'hls.js'
import { useEffect, useRef, useState } from 'react'
import { Slider } from './ui/slider'

export default function AudioPlayer() {
    const audioRef = useRef<HTMLAudioElement | null>(null)
    const { currentTrack, setIsPlaying } = usePlayerStore()
    const [currentTrackTime, setCurrentTrackTime] = useState<number>(0)
    const [bufferedPercent, setBufferedPercent] = useState<number>(0)
    const [duration, setDuration] = useState<number>(0)

    // Подключение HLS
    useEffect(() => {
        if (!currentTrack || !audioRef.current) return

        const hls = new Hls()
        hls.loadSource(`/api/hls/${currentTrack.trackDir}/index.m3u8`)
        hls.attachMedia(audioRef.current)

        return () => hls.destroy()
    }, [currentTrack])

    // Время воспроизведения
    useEffect(() => {
        const audio = audioRef.current
        if (!audio) return

        const updateTime = () => setCurrentTrackTime(audio.currentTime)
        audio.addEventListener('timeupdate', updateTime)
        return () => audio.removeEventListener('timeupdate', updateTime)
    }, [])

    // Буферизация
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
            } catch (e) {
                console.error('buffer parse error', e)
            }
        }

        audio.addEventListener('progress', updateBuffer)
        audio.addEventListener('loadedmetadata', updateBuffer)
        return () => {
            audio.removeEventListener('progress', updateBuffer)
            audio.removeEventListener('loadedmetadata', updateBuffer)
        }
    }, [])

    const handleSeek = (value: number[]) => {
        if (audioRef.current) {
            audioRef.current.currentTime = value[0]
        }
    }

    return (
        <div className="w-full space-y-4">
            <h1 className="text-lg font-semibold">{currentTrack?.name}</h1>

            <audio
                ref={audioRef}
                controls
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                className="w-full"
            />

            <div className="w-full">
                <Slider
                    value={[currentTrackTime]}
                    onValueChange={handleSeek}
                    max={duration || 100}
                    step={1}
                    className="z-10"
                    buffered={bufferedPercent}
                />
            </div>
        </div>
    )
}

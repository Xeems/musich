'use client'

import { usePlayerStore } from '@/store'
import Hls from 'hls.js'
import { useEffect, useRef, useState } from 'react'
import { Slider } from './ui/slider'
import { PauseIcon, PlayIcon, Volume2Icon, VolumeXIcon } from 'lucide-react'
import { Button } from './ui/button'
import Image from 'next/image'
import { milSecToMins } from '@/lib/utils'

export default function AudioPlayer() {
    const audioRef = useRef<HTMLAudioElement | null>(null)
    const {
        currentTrack,
        setIsPlaying,
        isPlaying,
        currentTrackTime,
        setCurrentTrackTime,
    } = usePlayerStore()

    const [bufferedPercent, setBufferedPercent] = useState<number>(0)
    const [duration, setDuration] = useState<number>(0)
    const [volume, setVolume] = useState<number>(0.7)

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

    const handlePauseClick = () => {
        const audio = audioRef.current

        if (!audio) return

        if (audio.paused) {
            audioRef.current?.play()
            setIsPlaying(true)
        } else {
            audioRef.current?.pause()
            setIsPlaying(false)
        }
    }

    useEffect(() => {
        if (!audioRef.current) return
        audioRef.current.volume = volume
    }, [volume])

    return (
        <div className="flex w-full flex-col items-center justify-center">
            <h1 className="text-lg font-semibold">{currentTrack?.name}</h1>

            <audio ref={audioRef} />

            <div className="flex w-1/3 flex-row items-center gap-2">
                {currentTrack && (
                    <div className="relative aspect-square h-16 w-16">
                        <Image
                            src={`/api/images/${currentTrack.imageName}`}
                            alt={currentTrack?.name}
                            fill
                            className="rounded-sm object-cover"
                            quality={75}
                        />
                    </div>
                )}

                <Button
                    disabled={!currentTrack}
                    onClick={handlePauseClick}
                    variant={'ghost'}
                    className="flex h-10 w-10 items-center justify-center p-0">
                    {isPlaying ? (
                        <PauseIcon className="size-6" />
                    ) : (
                        <PlayIcon className="size-6" />
                    )}
                </Button>

                <div className="w-full">
                    <Slider
                        value={[currentTrackTime]}
                        onValueChange={handleSeek}
                        max={duration || 100}
                        step={1}
                        className="z-10 hover:cursor-pointer"
                        buffered={bufferedPercent}
                    />
                    <p>{milSecToMins(currentTrackTime)}</p>
                </div>
                <div className="flex flex-row items-center gap-x-4">
                    {volume !== 0.0 ? (
                        <Volume2Icon className="size-6" />
                    ) : (
                        <VolumeXIcon className="size-6" />
                    )}
                    <Slider
                        className="w-20"
                        max={1.0}
                        min={0.0}
                        step={0.01}
                        defaultValue={[volume]}
                        onValueChange={(value) => setVolume(value[0])}
                    />
                </div>
            </div>
        </div>
    )
}

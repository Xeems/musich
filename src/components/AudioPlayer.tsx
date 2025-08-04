'use client'

import { usePlayerStore } from '@/store'
import Hls from 'hls.js'
import { useEffect, useRef } from 'react'

export default function AudioPlayer() {
    const audioRef = useRef<HTMLAudioElement | null>(null)
    const { currentTrack, setIsPlaying } = usePlayerStore()

    useEffect(() => {
        if (Hls.isSupported()) {
            const hls = new Hls()
            hls.loadSource(`/api/hls/${currentTrack?.trackDir}/index`)
            hls.attachMedia(audioRef.current!)
            return () => hls.destroy()
        }
    }, [currentTrack])

    return (
        <div>
            <h1>{currentTrack?.name}</h1>
            <audio
                ref={audioRef}
                controls
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                className="w-full"
            />
        </div>
    )
}

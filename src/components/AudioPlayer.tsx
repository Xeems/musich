'use client'

import Hls from 'hls.js'
import { useEffect, useRef, useState } from 'react'

export default function AudioPlayer() {
    const audioRef = useRef<HTMLAudioElement | null>(null)
    const [currentTrack, setCurrentTrack] = useState<string | null>(
        'track_355c596e-0e97-49ab-a7d7-f95f3ebaccf0_Persona_5_OST_-_Beneath_the_Mask_rain_(SkySound.cc).mp3',
    )
    const [isPlaying, setIsPlaying] = useState(false)

    useEffect(() => {
        if (Hls.isSupported()) {
            const hls = new Hls()
            hls.loadSource(`/api/hls/${currentTrack}/index`)
            hls.attachMedia(audioRef.current!)
            return () => hls.destroy()
        }
    }, [currentTrack])

    return (
        <div>
            <audio
                ref={audioRef}
                controls
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                style={{ width: '100%' }}
            />
        </div>
    )
}

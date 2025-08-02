'use client'

import Hls from 'hls.js'
import { useEffect, useRef, useState } from 'react'

export default function AudioPlayer() {
    const audioRef = useRef<HTMLAudioElement | null>(null)
    const [currentTrack, setCurrentTrack] = useState<string | null>(
        'track_251be8b5-89e0-4a31-ab04-3a4a48a8d422_Edvard_Maya_Vika_Gigulina_-_Stereo_Love_74482819.mp3',
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

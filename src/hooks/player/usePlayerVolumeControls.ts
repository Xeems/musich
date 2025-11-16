import { RefObject, useEffect, useState } from 'react'

export default function usePlayerVolumeControls(
    audioRef: RefObject<HTMLAudioElement> | null,
) {
    const [volume, setVolume] = useState(0.7)
    const [isMuted, setIsMuted] = useState(false)

    useEffect(() => {
        const audio = audioRef?.current
        if (!audio) return

        audio.volume = volume
        audio.muted = isMuted
    }, [volume, isMuted])

    return { volume, setVolume, isMuted, setIsMuted }
}

import { useCallback, useEffect, useState } from 'react'
import { usePlayerStore } from '@/store'
import { RefObject } from 'react'

type PlayModeType = 'queue' | 'random' | 'loop'

export function useTrackQueue(audioRef: RefObject<HTMLAudioElement | null>) {
    const [playMode, setPlayMode] = useState<PlayModeType>('queue')
    const queue = usePlayerStore((s) => s.queue)
    const currentTrack = usePlayerStore((s) => s.currentTrack)
    const setCurrentTrack = usePlayerStore((s) => s.setCurrentTrack)

    const playTrackByIndex = useCallback(
        (index: number) => {
            if (queue.length === 0) return
            setCurrentTrack(queue[(index + queue.length) % queue.length])
        },
        [queue, setCurrentTrack],
    )

    const playNext = () => {
        const currentIndex = getCurrentTrackIndex()
        if (currentIndex === undefined) return
        playTrackByIndex(currentIndex + 1)
    }

    const playPrev = () => {
        const currentIndex = getCurrentTrackIndex()
        if (currentIndex === undefined) return
        playTrackByIndex(currentIndex - 1)
    }

    const getCurrentTrackIndex = useCallback(() => {
        if (!currentTrack || queue.length === 0) return undefined
        return queue.findIndex((t) => t.id === currentTrack.id)
    }, [currentTrack, queue])

    const playNextTrack = useCallback(() => {
        const currentIndex = getCurrentTrackIndex()
        const audio = audioRef.current
        if (currentIndex === undefined || !audio) return

        switch (playMode) {
            case 'loop':
                audio.play()
                break
            case 'queue':
                playTrackByIndex(currentIndex + 1)
                break
            case 'random':
                const randomIndex = Math.floor(Math.random() * queue.length)
                playTrackByIndex(randomIndex)
                break
        }
        audio.onloadeddata = () => audio.play().catch(() => {})
    }, [audioRef, playMode, queue, getCurrentTrackIndex, playTrackByIndex])

    useEffect(() => {
        const audio = audioRef.current
        if (!audio) return

        const handleEnded = () => {
            playNextTrack()
        }

        audio.addEventListener('ended', handleEnded)
        return () => {
            audio.removeEventListener('ended', handleEnded)
        }
    }, [audioRef, playNextTrack])

    const togglePlayMode = useCallback(() => {
        setPlayMode((prev) =>
            prev === 'queue' ? 'random' : prev === 'random' ? 'loop' : 'queue',
        )
    }, [])

    return {
        playNextTrack,
        playTrackByIndex,
        playNext,
        playPrev,
        playMode,
        togglePlayMode,
    }
}

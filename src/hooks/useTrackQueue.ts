import { useCallback, useEffect } from 'react'
import { usePlayerStore } from '@/store'
import { RefObject } from 'react'

export function useTrackQueue(audioRef: RefObject<HTMLAudioElement | null>) {
    const queue = usePlayerStore((s) => s.queue)
    const currentTrack = usePlayerStore((s) => s.currentTrack)
    const setCurrentTrack = usePlayerStore((s) => s.setCurrentTrack)
    const playMode = usePlayerStore((s) => s.playMode)

    const getCurrentTrackIndex = () => {
        if (!currentTrack || queue.length === 0) return undefined
        return queue.findIndex((t) => t.id === currentTrack.id)
    }

    const playTrackByIndex = (index: number) => {
        if (queue.length === 0) return
        setCurrentTrack(queue[(index + queue.length) % queue.length]) // защита от отрицательных
    }

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

    const playNextTrack = useCallback(() => {
        const currentIndex = getCurrentTrackIndex()
        if (currentIndex === undefined) return

        switch (playMode) {
            case 'loop':
                audioRef.current?.play()
                break
            case 'queue':
                playTrackByIndex(currentIndex + 1)
                audioRef.current?.play()
                break
            case 'random':
                const randomIndex = Math.floor(Math.random() * queue.length)
                playTrackByIndex(randomIndex)
                audioRef.current?.play()
                break
        }
    }, [
        audioRef,
        getCurrentTrackIndex,
        playMode,
        playTrackByIndex,
        queue.length,
    ])

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
    }, [audioRef, currentTrack, playMode, queue])

    return { playNextTrack, playTrackByIndex, playNext, playPrev }
}

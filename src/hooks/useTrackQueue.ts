import { usePlayerStore } from '@/store'
import { RefObject } from 'react'

export function useTrackQueue(audioRef: RefObject<HTMLAudioElement | null>) {
    const queue = usePlayerStore((s) => s.queue)
    const currentTrack = usePlayerStore((s) => s.currentTrack)
    const setCurrentTrack = usePlayerStore((s) => s.setCurrentTrack)
    const playMode = usePlayerStore((s) => s.playMode)

    const playTrackByIndex = (index: number) => {
        if (queue.length === 0) return
        setCurrentTrack(queue[index % queue.length])
    }

    const playNextTrack = () => {
        if (!currentTrack || queue.length === 0) return
        const currentIndex = queue.findIndex((t) => t.id === currentTrack.id)

        switch (playMode) {
            case 'loop':
                audioRef.current?.play()
                break
            case 'queue':
                playTrackByIndex((currentIndex + 1) % queue.length)
                audioRef.current?.play()
                break
            case 'random':
                const randomIndex = Math.floor(Math.random() * queue.length)
                playTrackByIndex(randomIndex)
                break
        }
    }

    return { playNextTrack, playTrackByIndex }
}

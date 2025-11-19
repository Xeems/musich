import { RefObject } from 'react'
import { TrackType } from '../../@types/track'
import { create } from 'zustand'

type Store = {
    audioRef: RefObject<HTMLAudioElement> | null
    currentTrack: TrackType | null
    isPlaying: boolean
    currentTrackTime: number
    queue: TrackType[]

    setAudioRef: (ref: RefObject<HTMLAudioElement>) => void
    setCurrentTrack: (track: TrackType) => void
    togglePlay: () => void
    setQueue: (tracks: TrackType[]) => void
    setCurrentTrackTime: (time: number) => void
    clearQueue: () => void
}

export const usePlayerStore = create<Store>((set, get) => ({
    audioRef: null,
    currentTrack: null,
    isPlaying: false,
    currentTrackTime: 0,
    queue: [],

    setAudioRef: (ref) => set({ audioRef: ref }),

    setCurrentTrack: (track) => set({ currentTrack: track }),

    togglePlay: () => {
        const { audioRef, isPlaying } = get()
        if (!audioRef?.current) return

        if (isPlaying) {
            audioRef.current.pause()
        } else {
            audioRef.current.play()
        }

        set({ isPlaying: !isPlaying })
    },

    setQueue: (tracks) => set({ queue: tracks }),

    setCurrentTrackTime: (time) => {
        const { audioRef } = get()
        if (!audioRef?.current) return
        audioRef.current.currentTime = time
        set({ currentTrackTime: time })
    },

    clearQueue: () => set({ queue: [] }),
}))

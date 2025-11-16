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
    setIsPlaying: (isPlaying: boolean) => void
    setQueue: (tracks: TrackType[]) => void
    setCurrentTrackTime: (time: number) => void
    clearQueue: () => void
}

export const usePlayerStore = create<Store>((set) => ({
    audioRef: null,
    currentTrack: null,
    isPlaying: false,
    currentTrackTime: 0,
    queue: [],

    setAudioRef: (ref) => set({ audioRef: ref }),
    setCurrentTrack: (track) => set({ currentTrack: track }),
    setIsPlaying: (isPlaying) => set({ isPlaying: isPlaying }),
    setQueue: (tracks) => set({ queue: tracks }),
    setCurrentTrackTime: (time) => set({ currentTrackTime: time }),
    clearQueue: () => set({ queue: [] }),
}))

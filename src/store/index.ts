import { TrackType } from '../../@types/track'
import { create } from 'zustand'

type Store = {
    currentTrack: TrackType | null
    isPlaying: boolean
    queue: TrackType[]

    setCurrentTrack: (track: TrackType) => void
    setIsPlaying: (isPlaying: boolean) => void
    setQueue: (tracks: TrackType[]) => void
    clearQueue: () => void
}

export const usePlayerStore = create<Store>((set) => ({
    currentTrack: null,
    isPlaying: false,
    queue: [],

    setCurrentTrack: (track) => set({ currentTrack: track }),
    setIsPlaying: (isPlaying) => set({ isPlaying: isPlaying }),
    setQueue: (tracks) => set({ queue: tracks }),
    clearQueue: () => set({ queue: [] }),
}))

import { TrackType } from '../../@types/track'
import { create } from 'zustand'

type Store = {
    currentTrack: TrackType | null
    queue: TrackType[]

    setCurrentTrack: (track: TrackType) => void
    setQueue: (tracks: TrackType[]) => void
    clearQueue: () => void
}

export const usePlayerStore = create<Store>((set) => ({
    currentTrack: null,
    queue: [],

    setCurrentTrack: (track) => set({ currentTrack: track }),
    setQueue: (tracks) => set({ queue: tracks }),
    clearQueue: () => set({ queue: [] }),
}))

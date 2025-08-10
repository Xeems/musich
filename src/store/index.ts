import { TrackType } from '../../@types/track'
import { create } from 'zustand'

type PlayModeType = 'queue' | 'random' | 'loop'

type Store = {
    currentTrack: TrackType | null
    isPlaying: boolean
    currentTrackTime: number
    queue: TrackType[]
    playMode: PlayModeType

    setCurrentTrack: (track: TrackType) => void
    setIsPlaying: (isPlaying: boolean) => void
    setQueue: (tracks: TrackType[]) => void
    setCurrentTrackTime: (time: number) => void
    clearQueue: () => void
    setPlayMode: (mode: PlayModeType) => void
}

export const usePlayerStore = create<Store>((set) => ({
    currentTrack: null,
    isPlaying: false,
    currentTrackTime: 0,
    queue: [],
    playMode: 'queue',

    setCurrentTrack: (track) => set({ currentTrack: track }),
    setIsPlaying: (isPlaying) => set({ isPlaying: isPlaying }),
    setQueue: (tracks) => set({ queue: tracks }),
    setCurrentTrackTime: (time) => set({ currentTrackTime: time }),
    clearQueue: () => set({ queue: [] }),
    setPlayMode: (mode) => set({ playMode: mode }),
}))

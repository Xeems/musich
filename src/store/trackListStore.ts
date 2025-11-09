'use client'

import { create } from 'zustand'
import { TrackType } from '../../@types/track'

export type TrackListDisplayOption = 'default' | 'user'

type State = {
    tracks: TrackType[]
    source: string
    offset: number
    limit: number
    hasMore: boolean
    loading: boolean
    displayOption?: TrackListDisplayOption

    setInitial: (tracks: TrackType[], limit?: number) => void
    setSource: (url: string) => void
    setDisplayOption: (displauOption: TrackListDisplayOption) => void
    loadMore: () => Promise<void>
    deleteTrackFromList: (trackId: string) => void
}

const DEFFAULTLIMIT = 20 as const

export const useTrackListStore = create<State>((set, get) => ({
    tracks: [],
    source: '',
    offset: 0,
    limit: DEFFAULTLIMIT,
    hasMore: true,
    loading: false,
    displayOption: 'default',

    setInitial: (tracks, limit = DEFFAULTLIMIT) =>
        set(() => ({
            tracks,
            offset: tracks.length || 0,
            limit,
            hasMore: tracks.length === limit,
        })),

    loadMore: async () => {
        const { loading, hasMore, offset, limit, source } = get()
        if (loading || !hasMore || !source) return

        set({ loading: true })

        try {
            const url = new URL(source, window.location.origin)

            url.searchParams.set('offset', offset.toString())
            url.searchParams.set('limit', limit.toString())

            const res = await fetch(url.toString())
            const data: TrackType[] = await res.json()

            if (data.length === 0) {
                set({ hasMore: false })
            } else {
                set((state) => ({
                    tracks: [...state.tracks, ...data],
                    offset: state.offset + data.length,
                    hasMore: data.length === state.limit,
                }))
            }
        } finally {
            set({ loading: false })
        }
    },

    setSource: (url) => {
        set(() => ({
            source: url,
            tracks: [],
            offset: 0,
            hasMore: true,
        }))
        get().loadMore()
    },

    setDisplayOption: (option: TrackListDisplayOption) =>
        set({ displayOption: option }),

    deleteTrackFromList: (trackId) => {
        set((state) => ({
            tracks: state.tracks.filter((track) => track.id !== trackId),
            offset: Math.max(state.offset - 1, 0),
        }))
    },
}))

'use client'

import { create } from 'zustand'
import { TrackType } from '../../@types/track'

type State = {
    tracks: TrackType[]
    source: string
    offset: number
    limit: number
    hasMore: boolean
    loading: boolean

    setInitial: (tracks: TrackType[], limit?: number) => void
    loadMore: () => Promise<void>
    setSource: (url: string, limit?: number) => void
}

const DEFFAULTLIMIT = 1 as const

export const useTracksStore = create<State>((set, get) => ({
    tracks: [],
    source: '',
    offset: 0,
    limit: DEFFAULTLIMIT,
    hasMore: true,
    loading: false,

    setInitial: (tracks, limit = DEFFAULTLIMIT) =>
        set(() => ({
            tracks,
            offset: tracks.length || 0,
            limit,
            hasMore: tracks.length === limit,
        })),

    loadMore: async () => {
        const { loading, hasMore, offset, limit, source } = get()
        if (loading || !hasMore) return

        set({ loading: true })

        try {
            const res = await fetch(`${source}?offset=${offset}&limit=${limit}`)
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

    setSource: (url, limit = DEFFAULTLIMIT) => {
        set(() => ({
            source: url,
            tracks: [],
            offset: 0,
            limit,
            hasMore: true,
        }))
        get().loadMore()
    },
}))

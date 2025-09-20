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

    setInitial?: (tracks: TrackType[], source: string, limit?: number) => void
    loadMore: () => Promise<void>
    setSource: (url: string, limit?: number) => void
}

export const useTracksStore = create<State>((set, get) => ({
    tracks: [],
    source: '',
    offset: 0,
    limit: 1,
    hasMore: true,
    loading: false,

    setInitial: (tracks, source, limit = 20) =>
        set({
            tracks,
            source,
            offset: tracks.length || 0,
            limit,
            hasMore: tracks.length === limit,
        }),

    loadMore: async () => {
        const { loading, hasMore, offset, limit, source, tracks } = get()
        if (loading || !hasMore) return

        set({ loading: true })

        const res = await fetch(`${source}?offset=${offset}&limit=${limit}`)
        const data: TrackType[] = await res.json()

        if (data.length === 0) {
            set({ hasMore: false })
        } else {
            set({
                tracks: [...tracks, ...data],
                offset: offset + data.length,
                hasMore: data.length === limit,
            })
        }

        set({ loading: false })
    },

    setSource: (url, limit = 1) => {
        set({
            source: url,
            tracks: [],
            offset: 0,
            limit,
            hasMore: true,
        })
        get().loadMore()
    },
}))

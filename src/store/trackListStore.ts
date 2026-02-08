'use client'

import { create } from 'zustand'
import { TrackType } from '../../@types/track'
import { getTracks } from '@/lib/api/getTracks'

export type TrackListDisplayModeType = 'default' | 'user'

export type TrackListStoreType = {
    tracks: TrackType[]
    source: string
    offset: number
    limit: number
    hasMore: boolean
    loading: boolean
    displayMode: TrackListDisplayModeType

    setQueue: (tracks: TrackType[], limit?: number) => void
    setSource: (url: string) => void
    setDisplayMode: (displayMode: TrackListDisplayModeType) => void
    loadMore: () => Promise<void>
    toggleLike: (id: string, liked: boolean) => void
    deleteTrackFromList: (trackId: string) => void
}

const DEFFAULTLIMIT = 2 as const

export const createTrackListStore = (
    initialState?: Partial<TrackListStoreType>,
) => {
    const initialTracks = initialState?.tracks ?? []

    return create<TrackListStoreType>((set, get) => ({
        tracks: initialTracks,
        source: initialState?.source ?? '',
        offset: initialTracks.length,
        limit: initialState?.limit ?? DEFFAULTLIMIT,
        hasMore:
            initialTracks.length > 0
                ? initialTracks.length ===
                  (initialState?.limit ?? DEFFAULTLIMIT)
                : true,
        loading: false,
        displayMode: initialState?.displayMode ?? 'default',

        setQueue: (tracks, limit = DEFFAULTLIMIT) =>
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
            console.log(source)

            try {
                const data = await getTracks({ url: source, limit, offset })

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

        setDisplayMode: (option: TrackListDisplayModeType) =>
            set({ displayMode: option }),

        toggleLike: (id, liked) =>
            set((state) => ({
                tracks: state.tracks.map((t) =>
                    t.id === id
                        ? {
                              ...t,
                              isLikedByCurrentUser: liked,
                              likesCount: t.likesCount + (liked ? 1 : -1),
                          }
                        : t,
                ),
            })),

        deleteTrackFromList: (trackId) => {
            set((state) => ({
                tracks: state.tracks.filter((track) => track.id !== trackId),
                offset: Math.max(state.offset - 1, 0),
            }))
        },
    }))
}

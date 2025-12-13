'use client'

import {
    createTrackListStore,
    TrackListStoreType,
} from '@/store/trackListStore'
import { createContext, useContext, useRef, type ReactNode } from 'react'
import { useStore, type StoreApi } from 'zustand'

const TrackListContext = createContext<StoreApi<TrackListStoreType> | null>(
    null,
)

interface TrackListProviderProps {
    children: ReactNode
    initialState?: Partial<TrackListStoreType>
}

export function TrackListProvider({
    children,
    initialState,
}: TrackListProviderProps) {
    const storeRef = useRef<StoreApi<TrackListStoreType> | null>(null)

    if (!storeRef.current) {
        storeRef.current = createTrackListStore(initialState)
    }

    return (
        <TrackListContext.Provider value={storeRef.current}>
            {children}
        </TrackListContext.Provider>
    )
}

export function useTrackListStore<T>(
    selector: (state: TrackListStoreType) => T,
): T {
    const store = useContext(TrackListContext)

    if (!store) {
        throw new Error('useTrackListStore must be used within an Provider')
    }

    return useStore(store, selector)
}

export function useTrackList() {
    return useTrackListStore((state) => state)
}

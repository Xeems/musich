'use client'

import {
    createTrackListStore,
    TrackListStoreType,
} from '@/store/trackListStore'
import { createContext, useContext, useEffect, useRef } from 'react'
import TrackList from './TrackList'
import { useStore } from 'zustand'

const TrackListStoreContext = createContext(null)

type TrackListStoreSelector<SelectedState> = (
    state: TrackListStoreType,
) => SelectedState

export function useTrackListStore<SelectedState>(
    selector: TrackListStoreSelector<SelectedState>,
): SelectedState {
    const store = useContext(TrackListStoreContext)
    if (!store) {
        throw new Error('Missing TrackListStoreProvider')
    }
    return useStore(store, selector)
}

type Props = {
    source?: string
}

export default function TrackListStoreProvider({ source }: Props) {
    const storeRef = useRef(null)

    if (storeRef.current === null) {
        storeRef.current = createTrackListStore()
    }

    useEffect(() => {
        const store = storeRef.current.getState()

        if (source) {
            store.setSource(source)
        }
    }, [source])

    return (
        <TrackListStoreContext.Provider value={storeRef.current}>
            <TrackList />
        </TrackListStoreContext.Provider>
    )
}

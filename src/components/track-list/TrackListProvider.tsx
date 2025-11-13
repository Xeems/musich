'use client'

import {
    TrackListDisplayModeType,
    useTrackListStore,
} from '@/store/trackListStore'
import { useEffect } from 'react'
import TrackList from './TrackList'
import { TrackType } from '../../../@types/track'

type Props = {
    source: string
    displayMode?: TrackListDisplayModeType
    initialTracks?: TrackType[]
}

export default function TrackListProvider({
    source,
    displayMode,
    initialTracks,
}: Props) {
    const { setSource, setInitial, setDisplayMode } = useTrackListStore()

    useEffect(() => {
        if (Array.isArray(initialTracks)) setInitial(initialTracks)
        setSource(source)
        if (displayMode) setDisplayMode(displayMode)
    }, [source])

    return <TrackList />
}

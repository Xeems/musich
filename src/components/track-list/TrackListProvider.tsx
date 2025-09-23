'use client'

import {
    TrackListDisplayOption,
    useTrackListStore,
} from '@/store/trackListStore'
import { useEffect } from 'react'
import TrackList from './TrackList'
import { TrackType } from '../../../@types/track'

type Props = {
    source: string
    displayOption?: TrackListDisplayOption
    initialTracks?: TrackType[]
}

export default function TrackListProvider({
    source,
    displayOption,
    initialTracks,
}: Props) {
    const { setSource, setInitial, setDisplayOption } = useTrackListStore()

    useEffect(() => {
        if (Array.isArray(initialTracks)) setInitial(initialTracks)
        setSource(source)
        if (displayOption) setDisplayOption(displayOption)
    }, [source])

    return <TrackList />
}

'use client'

import { useTracksStore } from '@/store/trackListStore'
import { useEffect } from 'react'
import TrackList from './TrackList'
import { TrackType } from '../../../@types/track'

type Props = {
    initialTracks?: TrackType[]
    source: string
}

export default function TrackListProvider({ initialTracks, source }: Props) {
    const { setSource } = useTracksStore()

    useEffect(() => {
        setSource(source)
    }, [source])

    return <TrackList />
}

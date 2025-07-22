import { Card } from '@/components/ui/card'
import React from 'react'
import { TrackType } from './TrackList'

export default function TrackCard({ track }: { track: TrackType }) {
    console.log(track)
    return <Card>{track.name}</Card>
}

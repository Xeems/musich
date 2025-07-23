import { Card } from '@/components/ui/card'
import React from 'react'
import { TrackType } from './TrackList'

export default function TrackCard({ track }: { track: TrackType }) {
    return <Card>{track.name}</Card>
}

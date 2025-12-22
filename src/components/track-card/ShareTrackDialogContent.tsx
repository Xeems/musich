import React from 'react'
import { DialogContent, DialogTitle } from '../ui/dialog'
import { CopyInput } from '../CopyInput'
import { TrackType } from '../../../@types/track'

type Props = {
    track: TrackType
}

export default function ShareTrackDialogContent({ track }: Props) {
    if (typeof window === 'undefined') return ''

    const origin = window.location.origin

    const link = `${origin}/player?track=${track.id}`
    return (
        <DialogContent className="z-[51]">
            <DialogTitle>Share track</DialogTitle>
            <CopyInput value={link} />
        </DialogContent>
    )
}

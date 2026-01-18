import { DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog'
import { CopyInput } from '../functional/CopyInput'
import { TrackType } from '../../../@types/track'

type Props = {
    track: TrackType
}

export default function ShareTrackDialogContent({ track }: Props) {
    const origin = typeof window !== 'undefined' ? window.location.origin : ''

    const link = `${origin}/player?track=${track.id}`
    return (
        <>
            <DialogHeader>
                <DialogTitle>Share track</DialogTitle>
                <DialogDescription />
            </DialogHeader>

            <CopyInput value={link} />
        </>
    )
}

import { use } from 'react'
import AddTrackComponent from './addTrack'
import TrackPlayerComponent from './trackPlayer'

export default function Listener({
    params,
}: {
    params: Promise<{ streamId: string }>
}) {
    const { streamId: roomId } = use(params)

    return (
        <div className="flex items-center w-full flex-col">
            <p className="text-7xl font-semibold">{roomId}</p>
            <TrackPlayerComponent />
            <AddTrackComponent />
        </div>
    )
}

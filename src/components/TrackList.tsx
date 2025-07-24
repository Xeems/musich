import getTracks from '@/actions/getTracks'
import { TrackType } from '../../@types/track'
import TrackCard from './TrackCard'
import TrackListLoader from './TrackListLoader'

const INITIAL_LIMIT = 20

export default async function TrackList() {
    const initialTracks: TrackType[] = await getTracks(0, INITIAL_LIMIT)

    return (
        <div className="flex w-full flex-col space-y-2">
            {initialTracks.map((track) => (
                <TrackCard key={track.id} track={track} />
            ))}

            <TrackListLoader initialOffset={INITIAL_LIMIT} />
        </div>
    )
}

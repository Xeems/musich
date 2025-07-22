import TrackCard from './TrackCard'

export type TrackType = {
    id: string
    name: string
    author: string
    coverImage: File | URL
}

type Props = {
    tracks: TrackType[]
}

export default function TrackList({ tracks }: Props) {
    return (
        <div>
            {tracks &&
                tracks.map((track) => (
                    <TrackCard key={track.id} track={track} />
                ))}
        </div>
    )
}

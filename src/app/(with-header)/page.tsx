import TrackListProvider from '@/components/track-list/TrackListProvider'

// const fetchTracks = async (offset: number, limit: number) => {
//     const res = await fetch(`/api/track/list?offset=${offset}&limit=${limit}`)
//     if (!res.ok) throw new Error('Failed to fetch tracks')
//     return res.json()
// }

export default function MainPage() {
    return (
        <div className="flex h-full w-full flex-col items-center gap-7 bg-white p-16">
            <TrackListProvider source="/api/track/list" />
        </div>
    )
}


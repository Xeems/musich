import TrackListProvider from '@/components/track-list/TrackListProvider'

export default function MainPage() {
    return (
        <div className="flex h-full w-full flex-col items-center gap-7 bg-white p-16">
            <TrackListProvider source="/api/track/list" />
        </div>
    )
}


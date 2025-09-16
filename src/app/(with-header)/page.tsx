import TrackList from '@/components/TrackList'

export default async function MainPage() {
    return (
        <div className="flex h-full w-full flex-col items-center gap-7 bg-white p-16">
            <TrackList />
        </div>
    )
}


import TrackListProvider from '@/components/track-list/TrackListProvider'

export default function MainPage() {
    return (
        <div className="flex w-full flex-col sm:px-6 md:px-10 lg:px-20 xl:mx-auto xl:max-w-4xl">
            <TrackListProvider
                source="/api/track/list"
                displayOption="default"
            />
        </div>
    )
}


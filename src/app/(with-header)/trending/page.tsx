import TrackList from '@/components/track-list/TrackList'
import { TrackListProvider } from '@/components/track-list/TrackListContext'
import TrackListInfiniteScrollTrigger from '@/components/track-list/TrackListInfiniteScrollTrigger'

const loadSource = '/api/track/list' as const

export default async function TrendingPage() {
    return (
        <main className="flex w-full flex-col sm:px-6 md:px-10 lg:px-20 xl:mx-auto xl:max-w-4xl">
            <TrackListProvider initialState={{ source: loadSource }}>
                <TrackList />
                <TrackListInfiniteScrollTrigger />
            </TrackListProvider>
        </main>
    )
}

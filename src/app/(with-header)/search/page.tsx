import SearchBar from './SearchBar'

import SearchTrackList from './SearchTrackList'

export default async function page({
    searchParams,
}: {
    searchParams: { search?: string }
}) {
    await searchParams

    return (
        <main className="flex w-full flex-col sm:px-6 md:px-10 lg:px-20 xl:mx-auto xl:max-w-4xl">
            <div className="my-4">
                <SearchBar />
            </div>
            <SearchTrackList />
        </main>
    )
}

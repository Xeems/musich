import React from 'react'
import TrackUploadForm from './TrackUploadDialog'
import getUserBySession from '@/authentification/actions/getUserBySession'
import { redirect } from 'next/navigation'
import { TrackListProvider } from '@/components/track-list/TrackListContext'
import TrackList from '@/components/track-list/TrackList'

export default async function TracksPage() {
    const user = await getUserBySession()
    if (!user) redirect('/auth/signin')
    return (
        <main className="flex w-full flex-col sm:px-6 md:px-10 lg:px-20 xl:mx-auto xl:max-w-4xl">
            <h1 className="my-4 text-4xl font-bold">My music library</h1>
            <div className="">
                <TrackUploadForm />
                <TrackListProvider
                    initialState={{ source: 'api/track/list?type=user' }}>
                    <TrackList />
                </TrackListProvider>
            </div>
        </main>
    )
}

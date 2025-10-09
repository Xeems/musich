import React from 'react'
import TrackUploadForm from './TrackUploadDialog'
import TrackListProvider from '@/components/track-list/TrackListProvider'
import getUserBySession from '@/authentification/actions/getUserBySession'
import { redirect } from 'next/navigation'

export default async function TracksPage() {
    const user = await getUserBySession()
    if (!user) redirect('/auth/signin')
    return (
        <div className="flex h-full w-full flex-col items-center">
            <div className="flex w-full flex-col md:px-20 lg:w-1/2">
                <h1 className="my-4 text-4xl font-bold">My music library</h1>
                {/* <PlaylistList /> */}
                <div className="">
                    <TrackUploadForm />
                    <TrackListProvider
                        displayOption="userLibary"
                        source="/api/track/list/user"
                    />
                </div>
            </div>
        </div>
    )
}

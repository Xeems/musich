import React from 'react'
import TrackUploadForm from './TrackUploadDialog'
import TrackList from '@/components/TrackList'
import getCurrentUserTracks from '@/actions/getCurrentUserTracks'

export default async function TracksPage() {
    //const user = await getUserBySession()

    return (
        <div className="flex h-full w-full flex-col items-center">
            <div className="flex w-full flex-col md:px-20 lg:w-1/2">
                <h1 className="my-4 text-4xl font-bold">My music library</h1>
                {/* <PlaylistList /> */}
                <div className="">
                    <TrackUploadForm />
                    <TrackList fetchDataAction={getCurrentUserTracks} />
                </div>
            </div>
        </div>
    )
}

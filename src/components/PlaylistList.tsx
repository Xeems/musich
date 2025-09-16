import getUserPlaylists from '@/actions/getUserPlaylists'
import React from 'react'
import PlaylistCard from './PlaylistCard'
import { PlaylistType } from '../../@types/playlist'

// to-do find a better name for component
export default async function PlaylistList() {
    const response = await getUserPlaylists()
    const playlists: PlaylistType[] =
        response.success && response.data ? response.data : []

    return (
        <div>
            {Array.isArray(playlists) &&
                playlists.map((playlist) => (
                    <PlaylistCard key={playlist.id} playlist={playlist} />
                ))}
        </div>
    )
}

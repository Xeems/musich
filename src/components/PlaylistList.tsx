import getUserPlaylists from '@/actions/getUserPlaylists'
import React from 'react'
import { Card } from './ui/card'

// to-do find a better name for component
export default async function PlaylistList() {
    const playlists = await getUserPlaylists()

    console.log(playlists)
    return (
        <div>
            {Array.isArray(playlists) &&
                playlists.map((playlist) => (
                    <Card key={playlist.id}>{playlist.name}</Card>
                ))}
        </div>
    )
}

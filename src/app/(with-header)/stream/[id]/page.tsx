'use client'

import TrackList from '@/components/track-list/TrackList'
import { TrackListProvider } from '@/components/track-list/TrackListContext'
import TrackListInfiniteScrollTrigger from '@/components/track-list/TrackListInfiniteScrollTrigger'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { usePlayerStore } from '@/store/playerStore'
import { useEffect } from 'react'
import { useShallow } from 'zustand/shallow'

export default function page() {
    const { setCurrentTrackById, setCurrentTrackTime } = usePlayerStore(
        useShallow((s) => ({
            setCurrentTrackById: s.setCurrentTrackById,
            setCurrentTrackTime: s.setCurrentTrackTime,
        })),
    )
    useEffect(() => {
        const socket = new WebSocket('ws://localhost:3001')

        socket.onmessage = (event) => {
            const trackId = JSON.parse(event.data).trackId
            const time = JSON.parse(event.data).time
            if (trackId) {
                setCurrentTrackById(trackId)
                setCurrentTrackTime(time)
            }
        }

        return () => socket.close()
    }, [])
    return (
        <main>
            <Dialog>
                <DialogTrigger asChild>
                    <Button>Add tracks</Button>
                </DialogTrigger>
                <DialogContent className="flex h-dvh max-h-screen w-dvw max-w-screen rounded-none p-0 sm:max-w-screen lg:max-h-[80dvh] lg:max-w-5xl lg:rounded-lg">
                    <ScrollArea className="flex-1">
                        <TrackListProvider
                            initialState={{ displayMode: 'stream' }}>
                            <TrackList />
                            <TrackListInfiniteScrollTrigger />
                        </TrackListProvider>
                    </ScrollArea>
                </DialogContent>
            </Dialog>
        </main>
    )
}

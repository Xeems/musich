'use client'

import { Input } from '@/components/ui/input'
import { useEffect, useRef, useState } from 'react'

// const addTrack = async (track: File) => {
//     const reader = track.stream().getReader()

//     const socket = new WebSocket('ws://localhost:4000/upload')
//     socket.binaryType = 'arraybuffer'

//     socket.onopen = async () => {
//         while (true) {
//             const { done, value } = await reader.read()
//             if (done) {
//                 socket.close()
//                 break
//             }
//             if (value) socket.send(value)
//         }
//     }
// }

export default function AddTrackComponent() {
    const [url, setUrl] = useState<string | null>(null)
    const songInputRef = useRef<HTMLInputElement | null>(null)

    useEffect(() => {
        setUrl(
            `${window.location.protocol}//${window.location.hostname}:${window.location.port}`,
        )
        console.log(url)
    }, [url])

    return (
        <div className="flex h-full w-full flex-col items-center gap-7 bg-white p-16">
            <Input
                ref={songInputRef}
                className="max-w-2xs border border-amber-300"
                type="file"
                accept="audio/mp3"
            />
            {/* <Button onClick={() => addTrack(songInputRef.current?.files[0])}>
                Send song
            </Button> */}
        </div>
    )
}

'use client'

import { useEffect, useRef } from 'react'

export default function TrackPlayerComponent() {
    const audioRef = useRef<HTMLAudioElement>(null)

    useEffect(() => {
        const mediaSource = new MediaSource()
        const audio = audioRef.current!
        audio.src = URL.createObjectURL(mediaSource)

        mediaSource.addEventListener('sourceopen', () => {
            const sourceBuffer = mediaSource.addSourceBuffer('audio/mpeg')

            const socket = new WebSocket('ws://localhost:4000/stream')
            console.log(socket)
            socket.binaryType = 'arraybuffer'

            socket.onmessage = (event) => {
                console.log(event)
                if (!sourceBuffer.updating) {
                    sourceBuffer.appendBuffer(new Uint8Array(event.data))
                }
            }

            socket.onclose = () => {
                console.log('close connection')
                mediaSource.endOfStream()
            }
        })
    }, [])

    return <audio ref={audioRef} controls autoPlay />
}

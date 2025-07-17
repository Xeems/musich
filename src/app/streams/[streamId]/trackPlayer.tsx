'use client'

import { useEffect, useRef } from 'react'

export default function TrackPlayerComponent() {
    const audioRef = useRef<HTMLAudioElement>(null)

    useEffect(() => {
        const mediaSource = new MediaSource()
        const audio = audioRef.current!
        audio.src = URL.createObjectURL(mediaSource)

        let sourceBuffer: SourceBuffer | null = null
        let socket: WebSocket
        const queue: Uint8Array[] = []
        let isAppending = false
        let isMediaSourceOpen = false

        const appendNext = () => {
            if (
                !sourceBuffer ||
                isAppending ||
                queue.length === 0 ||
                sourceBuffer.updating
            )
                return
            isAppending = true
            const chunk = queue.shift()!
            try {
                sourceBuffer.appendBuffer(chunk)
            } catch (e) {
                console.error('appendBuffer error:', e)
                isAppending = false
            }
        }

        mediaSource.addEventListener('sourceopen', () => {
            isMediaSourceOpen = true

            try {
                sourceBuffer = mediaSource.addSourceBuffer('audio/mpeg') // MIME type
            } catch (err) {
                console.error('Failed to add SourceBuffer:', err)
                return
            }

            sourceBuffer.mode = 'sequence' // important for streaming audio
            sourceBuffer.addEventListener('updateend', () => {
                isAppending = false
                appendNext()
            })

            // Подключаемся к сокету только после открытия sourceBuffer
            socket = new WebSocket('ws://localhost:4000/')
            socket.binaryType = 'arraybuffer'

            socket.onmessage = (event) => {
                const chunk = new Uint8Array(event.data)
                queue.push(chunk)
                appendNext()
            }

            socket.onerror = (err) => {
                console.error('WebSocket error:', err)
            }

            socket.onclose = () => {
                console.log('WebSocket closed')
                if (mediaSource.readyState === 'open') {
                    try {
                        mediaSource.endOfStream()
                    } catch (err) {
                        console.warn('Cannot end MediaSource stream:', err)
                    }
                }
            }
        })

        return () => {
            if (socket && socket.readyState === WebSocket.OPEN) {
                socket.close()
            }
        }
    }, [])

    return <audio ref={audioRef} controls autoPlay />
}

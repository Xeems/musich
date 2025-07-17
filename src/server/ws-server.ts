import { WebSocketServer, WebSocket } from 'ws'
import { spawn } from 'child_process'

const wss = new WebSocketServer({ port: 4000 })

wss.on('connection', (ws, req) => {
    const isUploader = req.url?.includes('upload')

    const ffmpeg = spawn('ffmpeg', [
        '-hide_banner',
        '-loglevel',
        'error', // suppress mp3 warning
        '-i',
        'pipe:0',
        '-f',
        'mp3',
        '-b:a',
        '128k',
        '-content_type',
        'audio/mpeg',
        'pipe:1',
    ])

    let isClosed = false
    let stdinEnded = false

    ffmpeg.stderr.on('data', (data) => {
        console.warn('[FFmpeg stderr]', data.toString())
    })

    ffmpeg.on('exit', (code, signal) => {
        console.log(`[FFmpeg exited] code: ${code}, signal: ${signal}`)
    })

    ffmpeg.stdin.on('error', (err) => {
        if (!stdinEnded) {
            console.error('[FFmpeg stdin error]', err)
        }
    })

    ws.on('message', (chunk) => {
        if (isClosed || stdinEnded) return
        if (ffmpeg.stdin.writable) {
            try {
                ffmpeg.stdin.write(chunk)
            } catch (err) {
                console.error('[FFmpeg write error]', err)
            }
        }
    })

    ffmpeg.stdout.on('data', (encodedChunk) => {
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(encodedChunk)
            }
        })
    })

    ws.on('close', () => {
        console.log('[WebSocket] closed, terminating ffmpeg')
        isClosed = true

        if (!stdinEnded) {
            try {
                ffmpeg.stdin.end()
                stdinEnded = true
            } catch (e) {
                console.warn('stdin.end() failed:', e)
            }
        }

        ffmpeg.kill('SIGTERM') // мягкое завершение
    })

    ws.on('error', (err) => {
        console.error('[WebSocket error]', err)
    })
})

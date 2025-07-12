import { WebSocketServer } from 'ws'
import http from 'http'
import { registerListener } from './stream-manager'

const server = http.createServer()
const wss = new WebSocketServer({ noServer: true })

wss.on('connection', (ws) => {
    registerListener(ws)
})

server.on('upgrade', (req, socket, head) => {
    const path = req.url || ''
    if (path === '/stream') {
        wss.handleUpgrade(req, socket, head, (ws) => {
            wss.emit('connection', ws, req)
        })
    } else {
        socket.destroy()
    }
})

server.listen(4000, () => {
    console.log('WS server listening on ws://localhost:4000/stream')
})

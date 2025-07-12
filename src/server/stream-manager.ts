import WebSocket from 'ws'

const listeners = new Set<WebSocket>()

export function registerListener(ws: WebSocket) {
    listeners.add(ws)
    ws.on('close', () => listeners.delete(ws))
}

export const globalStreamDispatcher = {
    broadcast(chunk: Uint8Array) {
        for (const client of listeners) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(chunk)
            }
        }
    },
    end() {
        console.log('Глобальный стрим завершён')
    },
}

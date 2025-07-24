import { clsx, type ClassValue } from 'clsx'
import { parseBuffer } from 'music-metadata'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function milSecToMins(duration: number) {
    const mins = Math.floor(duration / 60)
    const secs = Math.floor(duration % 60)

    return `${mins}:${secs.toString().padStart(2, '0')}`
}

export async function getAudioMetadata(source: Buffer | ArrayBuffer) {
    if (typeof window !== 'undefined') return

    const buffer =
        source instanceof Buffer ? source : Buffer.from(source as ArrayBuffer)
    const metadata = await parseBuffer(buffer, 'audio/mpeg')
    return metadata
}


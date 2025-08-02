import { spawn } from 'child_process'
import fs from 'fs'
import path from 'path'

export function ensureHLSStream(trackName: string, sourcePath: string) {
    const outDir = path.resolve('D:/musichFiles/hls', trackName)
    const indexPath = path.join(outDir, 'index.m3u8')

    if (fs.existsSync(indexPath)) {
        return outDir
    }

    fs.mkdirSync(outDir, { recursive: true })

    spawn('ffmpeg', [
        '-i',
        sourcePath,
        '-c:a',
        'aac',
        '-b:a',
        '128k',
        '-f',
        'hls',
        '-hls_time',
        '5',
        '-hls_list_size',
        '6',
        '-hls_flags',
        'delete_segments',
        '-hls_segment_type',
        'mpegts',
        '-force_key_frames',
        'expr:gte(t,n_forced*5)',
        '-hls_segment_filename',
        path.join(outDir, 'segment%d.ts'),
        indexPath,
    ])

    return outDir
}

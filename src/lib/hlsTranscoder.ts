import ffmpeg from 'fluent-ffmpeg'
import fs from 'fs'
import path from 'path'

export function ensureHLSStream(trackName: string, sourcePath: string): string {
    const outDir = path.resolve('D:/musichFiles/hls', trackName)
    const indexPath = path.join(outDir, 'index.m3u8')

    if (!fs.existsSync(indexPath)) {
        fs.mkdirSync(outDir, { recursive: true })

        ffmpeg(sourcePath)
            .audioCodec('aac')
            .audioBitrate('128k')
            .format('hls')
            .outputOptions([
                '-hls_time 5',
                '-hls_list_size 0',
                '-hls_flags delete_segments+independent_segments',
                '-hls_segment_type mpegts',
                `-hls_segment_filename ${path.join(outDir, 'segment%d.ts')}`,
            ])
            .output(indexPath)
            .on('start', (cmd) => console.log('FFmpeg запущен:', cmd))
            .on('error', (err) => console.error('FFmpeg ошибка:', err))
            .on('end', () => console.log('HLS поток создан:', outDir))
            .run()
    }

    return outDir
}

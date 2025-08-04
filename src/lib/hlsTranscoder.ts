import ffmpeg from 'fluent-ffmpeg'
import fs from 'fs'
import path from 'path'
import { Readable } from 'stream'

export async function convertToHLS(trackFile: File): Promise<string> {
    const outDir = path.resolve(process.env.TRACK_DIR!, trackFile.name)
    const indexPath = path.join(outDir, 'index.m3u8')

    const buffer = Buffer.from(await trackFile.arrayBuffer())
    const stream = Readable.from(buffer)

    if (!fs.existsSync(indexPath)) {
        fs.mkdirSync(outDir, { recursive: true })

        ffmpeg(stream)
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

    return trackFile.name
}

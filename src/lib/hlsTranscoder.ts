import ffmpeg from 'fluent-ffmpeg'
import fs from 'fs'
import path from 'path'
import { PassThrough } from 'stream'
import sanitize from 'sanitize-filename'

export async function convertToHLS(trackFile: File): Promise<string> {
    const safeBaseName = sanitize(trackFile.name.replace(/\.[^/.]+$/, ''))
    const folderName = `${safeBaseName}_${Date.now()}`
    const outDir = path.resolve(process.env.TRACK_DIR!, folderName)
    const indexPath = path.join(outDir, 'index.m3u8')

    const buffer = Buffer.from(await trackFile.arrayBuffer())
    const stream = new PassThrough()
    stream.end(buffer)

    if (!fs.existsSync(indexPath)) {
        fs.mkdirSync(outDir, { recursive: true })
        const segmentFileName = path
            .join(outDir, 'segment%d.ts')
            .replace(/\\/g, '/')

        await new Promise<void>((resolve, reject) => {
            ffmpeg(stream)
                .audioCodec('aac')
                .audioBitrate('128k')
                .format('hls')
                .outputOptions([
                    '-hls_time 5',
                    '-hls_list_size 0',
                    '-hls_flags delete_segments+independent_segments',
                    '-hls_segment_type mpegts',
                    `-hls_segment_filename`,
                    segmentFileName,
                ])
                .output(indexPath)
                .on('start', (cmd) => console.log('FFmpeg запущен:', cmd))
                .on('error', (err) => {
                    console.error('FFmpeg ошибка:', err)
                    reject(err)
                })
                .on('end', () => {
                    console.log('HLS поток создан:', outDir)
                    resolve()
                })
                .run()
        })
    }

    return folderName
}

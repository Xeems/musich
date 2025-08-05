import ffmpeg from 'fluent-ffmpeg'
import path from 'path'
import fs from 'fs/promises'
import sanitize from 'sanitize-filename'
import { Readable } from 'stream'

export async function convertToHLS(
    trackFile: File,
): Promise<string | undefined> {
    const safeBaseName = sanitize(
        trackFile.name.replace(/\.[^/.]+$/, '').replace(/\s+/g, '_'),
    )
    const folderName = `${safeBaseName}_${Date.now()}`
    const outDir = path.resolve(
        process.env.TRACK_DIR!,
        `${safeBaseName}_${Date.now()}`,
    )

    const buffer = Buffer.from(await trackFile.arrayBuffer())
    const redable = Readable.from(buffer)
    await fs.mkdir(outDir, { recursive: true })

    const segmentFileName = path
        .join(outDir, 'segment%d.ts')
        .replace(/\\/g, '/')
    const indexPath = path.join(outDir, 'index.m3u8')

    try {
        await new Promise<void>((resolve, reject) => {
            ffmpeg(redable)
                .audioCodec('aac')
                .audioBitrate('128k')
                .format('hls')
                .outputOptions([
                    '-hls_time 5',
                    '-hls_list_size 0',
                    '-hls_flags delete_segments+independent_segments',
                    '-hls_segment_type mpegts',
                    '-hls_playlist_type vod',
                    `-hls_segment_filename`,
                    `${segmentFileName}`,
                    //`${segmentFileName} `, // не трогать пробел в конце строки, без него не работает если в нзвании файла есть пробелы
                ])
                .output(indexPath)
                .on('start', (cmd) => console.log('[ffmpeg] Запущен:', cmd))
                .on('stderr', (line) => console.log('[ffmpeg stderr]:', line))
                .on('error', (err) => {
                    console.error('[ffmpeg] Ошибка:', err)
                    reject(err)
                })
                .on('end', () => {
                    console.log('[ffmpeg] Успешно завершено:', outDir)
                    resolve()
                })
                .run()
        })

        return folderName
    } catch (error) {
        console.log(error)
    }
}

import ffmpeg from 'fluent-ffmpeg'
import fs from 'fs/promises'
import path from 'path'
import { randomUUID } from 'crypto'
import sanitize from 'sanitize-filename'

export async function convertToHLS(trackFile: File): Promise<string> {
    const safeBaseName = sanitize(trackFile.name.replace(/\.[^/.]+$/, ''))
    const folderName = `${safeBaseName}_${Date.now()}`
    const outDir = path.resolve(process.env.TRACK_DIR!, folderName)
    const indexPath = path.join(outDir, 'index.m3u8')
    const tempInputPath = path.resolve(
        process.env.TRACK_DIR!,
        `${randomUUID()}.input`,
    )

    const buffer = Buffer.from(await trackFile.arrayBuffer())
    await fs.writeFile(tempInputPath, buffer)

    try {
        if (!(await fileExists(indexPath))) {
            await fs.mkdir(outDir, { recursive: true })
            const segmentFileName = path
                .join(outDir, 'segment%d.ts')
                .replace(/\\/g, '/')

            await new Promise<void>((resolve, reject) => {
                ffmpeg(tempInputPath)
                    .audioCodec('aac')
                    .audioBitrate('128k')
                    .format('hls')
                    .outputOptions([
                        '-hls_time 5',
                        '-hls_list_size 0',
                        '-hls_flags delete_segments+independent_segments',
                        '-hls_segment_type mpegts',
                        '-hls_segment_filename',
                        `${segmentFileName} `, // не трогать пробел в конце строки, без него не работает если в нзвании файла есть пробелы
                        // боже, два ебанных часа
                        // за что?
                        // почему именно пробел?
                        // Как это вообще нахуй работает?
                        // Я уже ничего не понимаю
                        // Ну хотябы я нашел причину
                    ])
                    .output(indexPath)
                    .on('start', (cmd) => console.log('[ffmpeg] Запущен:', cmd))
                    .on('stderr', (line) =>
                        console.log('[ffmpeg stderr]:', line),
                    )
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
        }

        return folderName
    } finally {
        await fs.unlink(tempInputPath).catch(() => {})
    }
}

async function fileExists(path: string): Promise<boolean> {
    try {
        await fs.access(path)
        return true
    } catch {
        return false
    }
}

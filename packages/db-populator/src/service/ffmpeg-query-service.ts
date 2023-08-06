import path from 'path'
import { v5 as uuid } from 'uuid'
import { execFileSync } from 'child_process'
import { ScreenshotFile } from '../model/ScreenshotFile'
import { VideoFile } from '../model/VideoFile'
import { File } from '../model/File'
import { spent } from '../utils/spent'
import fs from 'fs'

export class FfmpegQueryService {
  takeScreenshotSync(file: VideoFile): ScreenshotFile {
    const { SCREENSHOT_ROOT_DIR } = process.env
    if (!SCREENSHOT_ROOT_DIR) {
      throw new Error('directory variable is absent')
    }
    const screenshotFileName = `${file.id}-1`
    const screenshotFilePath = path.resolve(SCREENSHOT_ROOT_DIR, `${screenshotFileName}.jpg`)

    //find length of video file in format 00:05:05

    try {
      spent(() =>
        execFileSync('ffmpeg', [
          '-ss',
          '00:05:05', // TODO eliminate hardcoded value, use percentage of video length
          '-i',
          `${file.path}/${file.name}`,
          '-vframes',
          '1',
          '-q:v',
          '2',
          `${SCREENSHOT_ROOT_DIR}/${screenshotFileName}.jpg`,
          '-y',
        ])
      )
      const stat = fs.statSync(screenshotFilePath)

      return new ScreenshotFile(
        screenshotFileName,
        screenshotFilePath,
        new Date(Date.now()).toISOString(),
        file.id,
        stat.size,
        uuid(screenshotFileName, uuid.DNS)
      )
    } catch (err) {
      console.log('-- take screenshot catch error', err)
      throw err
    }
  }

  convertVideoFile(file: File): void {
    try {
      const { FILE_ROOT_DIR } = process.env
      if (!FILE_ROOT_DIR) {
        throw new Error('screenshot directory variable is absent')
      }
      const name = file.name.split('.')
      const nameWithoutExtension = name.slice(0, name.length - 1).join('.')

      // the fastest option
      spent(() =>
        execFileSync('ffmpeg', [
          '-i',
          `${file.path}/${file.name}`,
          '-c:v',
          'h264_nvenc',
          '-preset',
          'veryfast',
          '-cq',
          '20',
          '-c:a',
          'aac',
          '-b:a',
          '192k',
          `${FILE_ROOT_DIR}/${nameWithoutExtension}.mp4`,
        ])
      )
    } catch (err) {
      console.log('------ convertVideoFile catch error', err)
      throw err
    }
  }

  getLength(file: File): string {
    try {
      const { FILE_ROOT_DIR } = process.env
      if (!FILE_ROOT_DIR) {
        throw new Error('directory variable is absent')
      }

      const result = spent(() =>
        execFileSync('ffprobe', [
          '-v',
          'error',
          '-show_entries',
          'format=duration',
          '-of',
          'default=noprint_wrappers=1:nokey=1',
          '-sexagesimal',
          `${file.path}/${file.name}`,
        ])
      )
      console.log('----result --->', result)
      return ''
    } catch (err) {
      console.log('------ getLength catch error', err)
      throw err
    }
  }
}

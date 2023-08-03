import path from 'path'
import { v5 as uuid } from 'uuid'
import { execFileSync } from 'child_process'
import { ScreenshotFile } from '../model/screenshot'
import { File } from '../model/File'
import { spent } from '../utils/spent'
import fs from 'fs'

export class VideoService {
  takeScreenshotSync(file: File): ScreenshotFile {
    const { SCREENSHOT_ROOT_DIR } = process.env
    if (!SCREENSHOT_ROOT_DIR) {
      throw new Error('screenshot directory variable is absent')
    }
    const screenshotFileName = `${file.id}-1`
    const screenshotFilePath = path.resolve(SCREENSHOT_ROOT_DIR, `${screenshotFileName}.jpg`)
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
      console.log('------ take screenshot catch error', err)
      throw err
    }
  }

  /* retrieve specific video info from a mp4 file */
  getVideoInfo(file: File): void {}
}

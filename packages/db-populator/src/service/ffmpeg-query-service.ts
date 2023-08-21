import path, { resolve } from 'path'
import { v5 as uuid } from 'uuid'
import { execFile, execFileSync } from 'child_process'
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

    //find length of video file in format 00:05:32

    try {
      spent(() =>
        execFileSync('ffmpeg', [
          '-ss',
          file.getPercentagePositionOfLength(0.4),
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

  takeScreenshotAsync(file: VideoFile): Promise<ScreenshotFile> {
    const { SCREENSHOT_ROOT_DIR } = process.env
    if (!SCREENSHOT_ROOT_DIR) {
      throw new Error('directory variable is absent')
    }
    const screenshotFileName = `${file.id}-1`
    const screenshotFilePath = path.resolve(SCREENSHOT_ROOT_DIR, `${screenshotFileName}.jpg`)

    return new Promise((resolve, reject) => {
      try {
        execFile('ffmpeg', [
          '-ss',
          file.getPercentagePositionOfLength(0.4),
          '-i',
          `${file.path}/${file.name}`,
          '-vframes',
          '1',
          '-q:v',
          '2',
          `${SCREENSHOT_ROOT_DIR}/${screenshotFileName}.jpg`,
          '-y',
        ])

        const stat = fs.statSync(screenshotFilePath)

        resolve(
          new ScreenshotFile(
            screenshotFileName,
            screenshotFilePath,
            new Date(Date.now()).toISOString(),
            file.id,
            stat.size,
            uuid(screenshotFileName, uuid.DNS)
          )
        )
      } catch (err) {
        console.log('-- take screenshot catch error', err)
        reject(err)
      }
    })
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

  getLengthSync(file: File): string {
    try {
      const { FILE_ROOT_DIR } = process.env
      if (!FILE_ROOT_DIR) {
        throw new Error('directory variable is absent')
      }

      const result = execFileSync('ffprobe', [
        '-v',
        'error',
        '-show_entries',
        'format=duration',
        '-of',
        'default=noprint_wrappers=1:nokey=1',
        '-sexagesimal',
        `${file.path}/${file.name}`,
      ])
      return result.toString()
    } catch (err) {
      console.log('------ getLength catch error', err)
      throw err
    }
  }

  getLengthAsync(file: File): Promise<string> {
    const { FILE_ROOT_DIR } = process.env
    if (!FILE_ROOT_DIR) {
      throw new Error('directory variable is absent')
    }

    return new Promise((resolve, reject) => {
      try {
        const result = execFile('ffprobe', [
          '-v',
          'error',
          '-show_entries',
          'format=duration',
          '-of',
          'default=noprint_wrappers=1:nokey=1',
          '-sexagesimal',
          `${file.path}/${file.name}`,
        ])
        resolve(result.toString())
      } catch (err) {
        console.log('------ getLength async catch error', err)
        reject(err)
      }
    })
  }
}

import path from 'path'
import fs from 'fs'
import { v5 as uuid } from 'uuid'
import { execFileSync } from 'child_process'
import { ScreenshotFile } from '../model/ScreenshotFile'
import { VideoFile } from '../model/VideoFile'
import { File } from '../model/File'
import { spent } from '../utils/spent'

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
          'libx264',
          '-preset',
          'medium',
          '-crf', 
          '23',
          '-c:a',
          'aac',
          '-b:a', 
          '128k', 
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
      return result.toString()
    } catch (err) {
      console.log('------ getLength catch error', err);
      throw err;
    }
  }
}

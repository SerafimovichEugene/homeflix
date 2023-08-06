import { config } from 'dotenv'
import path from 'path'
import { ScreenshotFile } from './model/ScreenshotFile'
import { FileService, FileExtension } from './service/file-service'
import { FfmpegQueryService } from './service/ffmpeg-query-service'
import { PostgresService } from './service/postgres-service'
import { VideoFileService } from './service/video-file-service'

config({ path: path.resolve(__dirname, '../../../.env') })

const fileService = new FileService()
const ffmpegService = new FfmpegQueryService()
const videoFileService = new VideoFileService(ffmpegService)
const postgresService = new PostgresService()

const populate = async () => {
  await postgresService.initConnection()

  const mp4Files = fileService.getFiles([FileExtension.mp4])
  const videoFiles = videoFileService.getVideoFiles(mp4Files)

  const screenshots: ScreenshotFile[] = []
  for (let index = 0; index < mp4Files.length; index++) {
    console.log('--> ', index)
    const video = videoFiles[index]
    try {
      screenshots.push(ffmpegService.takeScreenshotSync(video))
    } catch (err) {
      console.log('Can not create screenshot for', video.path, video.name)
    }
  }
  await postgresService.createScreenshots(screenshots)
  return screenshots
}

populate()
  .then(() => {
    console.log('--Finished')
    process.exit(0)
  })
  .catch(async (error) => {
    console.log('--Error')
    console.log(error)
    process.exit(1)
  })

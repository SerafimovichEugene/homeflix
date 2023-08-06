import dotenv from 'dotenv'
import path from 'path'
import { FileService, FileExtension } from './service/file-service'
import { FfmpegQueryService } from './service/ffmpeg-query-service'

dotenv.config({ path: path.resolve(__dirname, '../../../.env') })

const fileService = new FileService()
const ffmpegService = new FfmpegQueryService()

const transcode = () => {
  console.log('-- start transcoding')
  const files = fileService.getFiles([FileExtension.avi, FileExtension.mkv])
  console.log('-- files ', files)

  for (let index = 0; index < files.length; index++) {
    console.log('--> converting', files[index].name)
    ffmpegService.convertVideoFile(files[index])
    console.log('--> converted', index + 1)
  }
}

try {
  transcode()
} catch (err) {
  console.log('--> transcode error', err)
}

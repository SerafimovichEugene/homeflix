import { File } from '../model/File'
import { FfmpegQueryService } from './ffmpeg-query-service'
import { VideoFile } from '../model/VideoFile'

export class VideoFileService {
  private ffmpegService: FfmpegQueryService

  constructor(ffmpegService: FfmpegQueryService) {
    this.ffmpegService = ffmpegService
  }

  getVideoFilesSync(files: File[]): VideoFile[] {
    console.log(`--> start reading length of each video`)
    return files.map<VideoFile>((f) => {
      const length = this.ffmpegService.getLengthSync(f)
      const { id, name, path, created, size } = f
      return new VideoFile(name, path, created, size, length, id)
    })
  }

  getVideoFilesAsync(files: File[]): Promise<VideoFile[]> {
    console.log(`--> start reading length of each video`)
    const res = Promise.all(
      files.map((f) =>
        this.ffmpegService.getLengthAsync(f).then((length) => {
          const { id, name, path, created, size } = f
          return new VideoFile(name, path, created, size, length, id)
        })
      )
    )
    return res;
  }
}

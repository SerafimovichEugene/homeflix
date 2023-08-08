import { File } from '../model/File'
import { FfmpegQueryService } from './ffmpeg-query-service'
import { VideoFile } from '../model/VideoFile'

export class VideoFileService {
  private ffmpegService: FfmpegQueryService

  constructor(ffmpegService: FfmpegQueryService) {
    this.ffmpegService = ffmpegService
  }

  getVideoFiles(files: File[]): VideoFile[] {
    return files.map<VideoFile>((f) => {
      const length = this.ffmpegService.getLength(f)
      const { id, name, path, created, size } = f
      return new VideoFile(name, path, created, size, length, id)
    })
  }
}

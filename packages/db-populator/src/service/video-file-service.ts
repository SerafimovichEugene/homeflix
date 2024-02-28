import { File } from '../model/File'
import { FfmpegQueryService } from './ffmpeg-query-service'
import { VideoFile } from '../model/VideoFile'

export class VideoFileService {
  private ffmpegService: FfmpegQueryService

  constructor(ffmpegService: FfmpegQueryService) {
    this.ffmpegService = ffmpegService
  }

  getVideoFiles(files: File[]): VideoFile[] {
    return files.reduce<VideoFile[]>((acc, f) => {
      try {
        const length = this.ffmpegService.getLength(f)
        const { id, name, path, created, size } = f
        acc.push(new VideoFile(name, path, created, size, length, id));
        return acc;
      } catch (error) {
        console.log('can NOT get a length of video file', f);
        return acc;
      }
    }, [])
  }
}

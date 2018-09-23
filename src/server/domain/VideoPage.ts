import { Video } from '../domain/Video';

export class VideoPage {
  public videos: Video[]
  public size: number
  public pageNumber: number
  public totalVideos: number
  public totalPages: number

  constructor(videos: Video[]) {
    this.totalVideos = videos.length;
  }
}

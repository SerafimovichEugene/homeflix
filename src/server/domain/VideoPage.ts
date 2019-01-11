import { Video } from '../domain/Video';

export class VideoPage {
  public videos: Video[] = [];
  public size: number = 20;
  public pageNumber: number = 0;
  public totalVideos: number = 0;
  public totalPages: number = 0;

  constructor(videos: Video[]) {
    this.totalVideos = videos.length;
  }
}

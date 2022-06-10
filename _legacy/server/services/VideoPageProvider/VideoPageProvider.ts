import { VideoPage } from "../../domain/VideoPage";
import { Video } from "../../domain/Video";
import { IVideoListProvider } from '../VideoListProvider/IVideoListProvider';

export class VideoPageProvider {
  private videoListProvider: IVideoListProvider
  private cachedVideos: Video[]
  private cachedVideosMap: Map<string, Video>
  constructor(provider?: IVideoListProvider) {
    this.videoListProvider = provider;
    this.cachedVideos = this.videoListProvider.getVideos();
    this.cachedVideosMap = this.buildMap(this.cachedVideos);
  }

  public getVideoPage(page = 0, size = 20): VideoPage {
    const videos: Video[] = this.cachedVideos;
    const newPage = new VideoPage(videos);
    const totalVideosNum = videos.length;
    newPage.videos = videos.slice(page * size, (page * size) + size);
    newPage.size = size;
    newPage.pageNumber = page;
    newPage.totalPages = this.getTotalsPages(totalVideosNum, size);
    return newPage;
  }

  public getCachedVideosMap(): Map<string, Video> {
    return this.cachedVideosMap;
  }

  public getTotalsPages(totalItems: number, size: number): number {
    if (totalItems % size === 0) {
      return totalItems / size;
    }
    const div = Math.trunc(totalItems / size);
    return div + 1;
  }

  private buildMap(items: Video[]): Map<string, Video> {
    const newMap = new Map();
    items.forEach(item => {
      const id = item.id;
      newMap.set(id, item);
    });
    return newMap;
  }
}

import { VideoPage } from "../../domain/VideoPage";
import { Video } from "../../domain/Video";
import { IVideoListProvider } from '../VideoListProvider/IVideoListProvider';

export class VideoPageProvider {

  private videoListProvider: IVideoListProvider
  private cachedVideos: Video[] = []
  private cachedVideosMap: Map<string, Video> = new Map()

  constructor(provider: IVideoListProvider) {
    this.videoListProvider = provider;
    this.videoListProvider.getVideos()
      .then(res => {
        this.cachedVideos = res;
        this.cachedVideosMap = this.buildMap(res);
      });
  }

  public getVideoPage(page = 0, size = 20): VideoPage {
    const videos: Video[] = this.cachedVideos;
    const newPage = new VideoPage(videos);
    newPage.videos = videos.slice(page * size, (page * size) + size);
    newPage.size = size;
    newPage.pageNumber = page;
    newPage.totalPages = this.getTotalsPages(videos.length, size);
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

import { VideoPage } from "../domain/VideoPage";
import { Video } from "../domain/Video";
import { VideoLocalListProvider } from './VideoListProvider/VideoLocalListProvider';
import { IVideoListProvider } from './VideoListProvider/IVideoListProvider';

export class VideoPageProvider {
  private videoListProvider: IVideoListProvider
  constructor(provider: IVideoListProvider) {
    this.videoListProvider = provider;
  }
  public getVidePage(videos: Video[], page = 0, size = 20): VideoPage {
    const newPage = new VideoPage(videos);
    newPage.size = 20;
    newPage.pageNumber = page;
    newPage.totalPages = 20;
    return newPage;
  }
}

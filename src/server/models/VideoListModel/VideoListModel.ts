import { Video } from '../../domain/Video';
import { VideoPage } from '../../domain/VideoPage';
import { VideoPageProvider } from '../../services/VideoPageProvider/VideoPageProvider';
import { VideoLocalListProvider } from '../../services/VideoListProvider/VideoLocalListProvider';

export class VideoListModel {

  private provider: VideoPageProvider;

  constructor() {
    this.provider = new VideoPageProvider(new VideoLocalListProvider());
    // this.provider = new VideoPageProvider(new VideoDBListProvider());
  }

  public getPage(page: number, size: number): VideoPage {
    return this.provider.getVideoPage(page, size);
  }

  public getCachedVideosMap(): Map<string, Video> {
    return this.provider.getCachedVideosMap();
  }

  public escapeSingleQuote(str: string): string {
    return str.split('\'').join('\'\'');
  }
}

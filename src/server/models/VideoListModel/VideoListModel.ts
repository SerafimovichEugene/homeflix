import { Sequelize } from 'sequelize';
import { DBConnector } from '../DBConnector';
import { Video } from '../../domain/Video';
import { VideoPage } from '../../domain/VideoPage';
import { VideoPageProvider } from '../../services/VideoPageProvider/VideoPageProvider';
import { VideoLocalListProvider } from '../../services/VideoListProvider/VideoLocalListProvider';

export class VideoListModel {
  private provider: VideoPageProvider;
  constructor() {
    this.provider = new VideoPageProvider(new VideoLocalListProvider());
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

  // public insertVideosBatch(videos: Video[]): any {
  //   const values: string = videos
  //     .map(video => {
  //       const fileName = video.fileName.split('\'').join('\'\'');
  //       return ` ('${video.path}/${fileName}')`;
  //     })
  //     .join(',');
  //   return this.sequalize.query(`INSERT files(path) VALUES ${values};`)
  //     .then(res => res)
  //     .catch(err => {
  //       console.log('insertVideo error -->>, ', err);
  //       return Promise.reject(err);
  //     });
  // }
}

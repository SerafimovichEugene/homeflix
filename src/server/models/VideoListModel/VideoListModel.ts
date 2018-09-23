import { Sequelize } from 'sequelize';
import { DBConnector } from '../DBConnector';
import { Video } from '../../domain/Video';
import { VideoListProvider } from '../../services/VideoListProvider';

export class VideoListModel {
  private sequalize: Sequelize
  private videoListCached: Map<string, Video>;
  constructor() {
    this.sequalize = DBConnector.getConnector();
    this.refreshVideoListCached();
  }

  public getAllVideos(): any {
    return this.sequalize.query('SELECT * from files');
  }

  private buildMap(items: Video[]): Map<string, Video> {
    const newMap = new Map();
    items.forEach(item => {
      const id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      newMap.set(id, item);
    });
    return newMap;
  }

  public refreshVideoListCached() {
    this.videoListCached = this.buildMap(VideoListProvider.getMp4Videos());
  }

  public getLocalvideos(): Map<string, Video> {
    return this.videoListCached;
  }

  public escapeSingleQuote(str: string): string {
    return str.split('\'').join('\'\'');
  }

  public insertVideosBatch(videos: Video[]): any {
    const values: string = videos
      .map(video => {
        const fileName = video.fileName.split('\'').join('\'\'');
        return ` ('${video.path}/${fileName}')`;
      })
      .join(',');
    return this.sequalize.query(`INSERT files(path) VALUES ${values};`)
      .then(res => res)
      .catch(err => {
        console.log('insertVideo error -->>, ', err);
        return Promise.reject(err);
      });
  }
}

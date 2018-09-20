import { Sequelize } from 'sequelize';
import { DBConnector } from '../DBConnector';
import { Video } from '../../domain/Video';

export class VideoListModel {
  private sequalize: Sequelize
  constructor() {
    this.sequalize = DBConnector.getConnector();
  }

  public getAllVideos(): any {
    return this.sequalize.query('SELECT * from files')
      .then(res => res);
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
      .then(res => console.log(res))
      .catch(err => console.log('insertVideo error -->>, ', err));
  }
}

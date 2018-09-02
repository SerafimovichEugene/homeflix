import { DBConnector } from './DBConnector';
import { Video } from '../domain/Video';
import { Sequelize } from 'sequelize';

export class VideoListModel {
  private sequalize: Sequelize
  constructor() {
    this.sequalize = DBConnector.getConnector();
  }

  public getAllVideos(): any {
    return this.sequalize.query('SELECT * from files')
      .then(res => res);
  }

  public insertVideosBatch(videos: Video[]): any {
    // const values: string = videos
    //   .map(video => ` ('${video.path}/${video.fileName}')`)
    //   .join(',');
    videos.forEach((video) => {
      this.sequalize.query(`INSERT files(path) VALUES ('${video.path}/${video.fileName}');`);
    });

  //   return this.sequalize.query(
  //     `INSERT files(path)
  //     VALUES
  //     ${values};`
  //   )
  //     .then(res => console.log(res))
  //     .catch(err => console.log('insertVideo error -->>, ', err));
  // }
}

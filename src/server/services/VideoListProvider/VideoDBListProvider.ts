import { Sequelize } from 'sequelize';
import { DBConnector } from '../DBConnector';
import { IVideoListProvider } from './IVideoListProvider';
import { Video } from "../../domain/Video";


export class VideoDBListProvider implements IVideoListProvider {
  private sequalize: Sequelize
  constructor() {
    this.sequalize = DBConnector.getConnector();
  }

  public async getVideos(): Promise<Video[]> {
    const l: object[][] =  await this.sequalize.query('SELECT * from files');
    const videos = l[0].map((textRow: any) => new Video(textRow.path));
    return videos;
  }

  public getAllVideos(): any {
    return this.sequalize.query('SELECT * from files');
  }
}

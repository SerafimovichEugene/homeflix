import { Sequelize } from 'sequelize';
import { DBConnector } from '../DBConnector';
import { IVideoListProvider } from './IVideoListProvider';
import { Video } from "../../domain/Video";
// import * as Promi se from 'bluebird';


export class VideoDBListProvider implements IVideoListProvider {
  private sequalize: Sequelize
  constructor() {
    this.sequalize = DBConnector.getConnector();
  }

  public async getVideos(): Video[] {
    const l = await this.sequalize.query('SELECT * from files');
    return l;
  }

  public getAllVideos(): any {
    return this.sequalize.query('SELECT * from files');
  }


}

// import * as fs from 'fs';
// import * as path from 'path';
// import { Video } from '../domain/Video';
import { VideoListModel } from '../models/VideoListModel/VideoListModel';

export default class VideoListController {
  private videListModel: VideoListModel
  constructor(model: VideoListModel) {
    this.videListModel = model;
    this.getVideos = this.getVideos.bind(this);
  }

  public getVideos(req: any, res: any) {
    const page = req.params['page'];
    const size = req.params['size'];
    const videoPage = this.videListModel.getPage(page, size);
    res.send(videoPage);
  }
}

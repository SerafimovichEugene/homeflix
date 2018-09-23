import { VideoListModel } from '../models/VideoListModel/VideoListModel';

export default class VideoListController {
  private videListModel: VideoListModel
  constructor(model: VideoListModel) {
    this.videListModel = model;
    this.getVideos = this.getVideos.bind(this);
  }

  public getVideos(req: any, res: any) {
    const page = req.query['page'];
    console.log('req.query --> ', req.query);
    const size = req.query['size'];
    const videoPage = this.videListModel.getPage(page, size);
    res.send(videoPage);
  }
}

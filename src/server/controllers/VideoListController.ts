import { VideoListModel } from '../models/VideoListModel/VideoListModel';

export default class VideoListController {
  private videListModel: VideoListModel
  constructor(model: VideoListModel) {
    this.videListModel = model;
    this.getVideos = this.getVideos.bind(this);
  }

  public getVideos(req: any, res: any) {
    let page = req.query['page'];
    const size = req.query['size'];
    const query = req.query['query'];
    page = page || 0;
    const videoPage = this.videListModel.getPage(+page, +size);
    res.send(videoPage);
  }
}

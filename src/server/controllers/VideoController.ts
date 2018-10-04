import * as fs from 'fs';
import { Video } from '../domain/Video';
import { VideoListModel } from '../models/VideoListModel/VideoListModel';

export default class VideoController {
  private videListModel: VideoListModel
  // private videoList: Map<string, Video>;
  constructor(model: VideoListModel) {
    this.videListModel = model;
    this.getVideo = this.getVideo.bind(this);
  }

  public getVideo(req: any, res: any, next: any) {
    const videosMap = this.videListModel.getCachedVideosMap();
    const id = req.param('id');
    const video = videosMap.get(id);
    const path = video.path;
    const stat = fs.statSync(path);
    const fileSize = stat.size;
    const range = req.headers.range;
    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1]
        ? parseInt(parts[1], 10)
        : fileSize-1;
      const chunksize = (end-start)+1;
      const file = fs.createReadStream(path, {start, end});
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'video/mp4',
      };
      res.writeHead(206, head);
      file.pipe(res);
    } else {
      const head = {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
      }
      res.writeHead(200, head);
      fs.createReadStream(path).pipe(res);
    }
  }
}

import * as fs from 'fs';
import * as path from 'path';
import { Video } from '../domain/Video';
import { VideoListModel } from '../models/VideoListModel';

export default class VideoListController {
  private videListModel: VideoListModel
  constructor() {
    this.videListModel = new VideoListModel();
    this.getVideos = this.getVideos.bind(this);
  }

  public getVideos(req: any, res: any, next: any) {
    const videos = this.readFilesListFromFolder();
    this.videListModel.insertVideosBatch(videos);
    res.send('123');
    // this.videListModel.getAllVideos()
    //   .then(videos => {
    //     res.send(videos);
    //   });
    // const videos = this.readFilesListFromFolder();
  }

  private readFilesListFromFolder(): Video[] {
    const videofiles = this.readFilesRecoursevly(process.env.ROOT_PATH_DERICTORY, []);
    const mp4Videos = videofiles.filter((item) => {
      const arr = item.fileName.split('.');
      return arr[arr.length - 1] === 'mp4';
    });
    return mp4Videos;
  }

  private readFilesRecoursevly(dir: string, fileList: Video[]): Video[] {
    fileList = fileList || [];
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      if (fs.statSync(path.join(dir, file)).isDirectory()) {
        fileList = this.readFilesRecoursevly(path.join(dir, file), fileList);
      } else {
        fileList.push(new Video(dir, file));
      }
    });
    return fileList;
  }
}

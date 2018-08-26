import * as fs from 'fs';
import * as path from 'path';
import { VideoPathName } from '../domain/VideoPathName';

export default class VideoListController {

  constructor() {
    this.getVideos = this.getVideos.bind(this);
  }

  public getVideos(req: any, res: any, next: any) {
    const videos = this.readFilesListFromFolder();
    res.send(videos);
  }

  public refreshVideos(req: any, res: any, next: any) {
    const videos = this.readFilesListFromFolder();
    res.send(videos);
  }

  private readFilesListFromFolder(): VideoPathName[] {
    const videofiles = this.readFilesRecoursevly(process.env.ROOT_PATH_DERICTORY, []);
    const mp4Videos = videofiles.filter((item) => {
      const arr = item.fileName.split('.');
      return arr[arr.length - 1] === 'mp4';
    });
    return mp4Videos;
  }

  private readFilesRecoursevly(dir: string, fileList: VideoPathName[]): VideoPathName[] {
    fileList = fileList || [];
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      if (fs.statSync(path.join(dir, file)).isDirectory()) {
        fileList = this.readFilesRecoursevly(path.join(dir, file), fileList);
      } else {
        fileList.push(new VideoPathName(dir, file));
      }
    });
    return fileList;
  }
}

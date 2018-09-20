import * as fs from 'fs';
import * as path from 'path';
import { Video } from "../domain/Video";

export class VideoListProvider {
  static getMp4Videos(): Video[] {
    const videofiles = VideoListProvider.readFilesRecoursevly(process.env.ROOT_PATH_DERICTORY, []);
    return videofiles.filter((item) => {
      const arr = item.fileName.split('.');
      return arr[arr.length - 1] === 'mp4';
    });
  }

  private static readFilesRecoursevly(dir: string, fileList: Video[]): Video[] {
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

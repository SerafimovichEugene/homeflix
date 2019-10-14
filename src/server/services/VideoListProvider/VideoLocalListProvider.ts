import * as fs from 'fs';
import * as path from 'path';
import { IVideoListProvider } from './IVideoListProvider';
import { Video } from "../../domain/Video";

export class VideoLocalListProvider implements IVideoListProvider {

  static getMp4Videos(path: string): Video[] {
    const videofiles = VideoLocalListProvider.readFilesRecoursevly(path, []);
    return videofiles.filter((item) => {
      const arr = item.fileName.split('.');
      return arr[arr.length - 1] === 'mp4';
    });
  }

  public async getVideos (): Promise<Video[]> {
    const paths = process.env.ROOT_PATH_DIRECTORY!;
    return VideoLocalListProvider.getMp4Videos(paths[0]);
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

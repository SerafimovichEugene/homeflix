import fs from "fs";
import path from "path";
import { File, VideoFile } from "../model/file";

export enum VideoFileExtension {
  "mp4" = "mp4",
  "webm" = "webm",
  "avi" = "avi",
  "mkv" = "mkv",
}

export class FileService {
  private getEnvVariable() {
    const { FILE_ROOT_DIR } = process.env;
    if (!FILE_ROOT_DIR) {
      throw new Error("directory variable is absent");
    }
    return FILE_ROOT_DIR;
  }

  public getFiles(extensions: VideoFileExtension[]): VideoFile[] {
    const dir = this.getEnvVariable();
    return FileService.readFiles(dir, [])
      .filter((item) => {
        const arr = item.name.split(".");
        return extensions.some((ex) => arr[arr.length - 1] === ex);
      })
      .map(({ id, name, path }) => {
        // TODO take length (00:32:12) of video file
        return new VideoFile(name, path, 0, id);
      });
  }

  private static readFiles(dir: string, fileList: File[]): File[] {
    fileList = fileList || [];
    const files = fs.readdirSync(dir);
    files.forEach((fileName) => {
      if (fs.statSync(path.join(dir, fileName)).isDirectory()) {
        fileList = this.readFiles(path.join(dir, fileName), fileList);
      } else {
        console.log("-- fileName ", fileName);
        fileList.push(new File(fileName, dir));
      }
    });
    return fileList;
  }
}

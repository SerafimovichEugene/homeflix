import fs from "fs";
import path from "path";
import { File, VideoFile } from "../model/file";

export class FileService {
  private getEnvVariable() {
    const { FILE_ROOT_DIR } = process.env;
    if (!FILE_ROOT_DIR) {
      throw new Error("directory variable is absent");
    }
    return FILE_ROOT_DIR;
  }

  public getFiles(extensions: string[]): VideoFile[] {
    const defaultExtensions = ['mp4', 'webm', 'avi', 'mkv'];

    if(!extensions.every((ex) => defaultExtensions.includes(ex))) {
      throw new Error('invalid extension');
    }
    const dir = this.getEnvVariable();
    return FileService.readFiles(dir, [])
      .filter((item) => {
        const arr = item.name.split(".");
        return extensions.some(ex => arr[arr.length - 1] === ex);
      })
      .map(({ id, name, path }) => new VideoFile(name, path, 0, id));
  }

  private static readFiles(dir: string, fileList: File[]): File[] {
    fileList = fileList || [];
    const files = fs.readdirSync(dir);
    files.forEach((fileName) => {
      if (fs.statSync(path.join(dir, fileName)).isDirectory()) {
        fileList = this.readFiles(path.join(dir, fileName), fileList);
      } else {
        fileList.push(new File(fileName, dir));
      }
    });
    return fileList;
  }
}

import fs from "fs";
import path from "path";
import { File, VideoFile } from "../model/file";
import { ScreenshotService } from "./screenshot-service";
import { ScreenshotFile } from "../model/screenshot";

export class FileService {
  private ss: ScreenshotService;
  constructor() {
    this.ss = new ScreenshotService();
  }
  public getFiles(): VideoFile[] {
    const { FILE_ROOT_DIR } = process.env;

    if (!FILE_ROOT_DIR) {
      throw new Error("directory variable is absent");
    }

    return FileService.readFiles(FILE_ROOT_DIR, [])
      .filter((item) => {
        const arr = item.name.split(".");
        return arr[arr.length - 1] === "mp4";
      })
      .map(({ id, name, path }) => new VideoFile(name, path, 0, id));
  }

  public createScreenshots(): ScreenshotFile[] {
    const videoFiles = this.getFiles();
    console.log('-- total video files ', videoFiles.length)
    const arr: ScreenshotFile[] = [];
    
    for (let index = 0; index < videoFiles.length; index++) {
      console.log('--> ', index);
      const s = this.ss.takeScreenshotSync(videoFiles[index]);
      arr.push(s);
    }

    return arr;
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

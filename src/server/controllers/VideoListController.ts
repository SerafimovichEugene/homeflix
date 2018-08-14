import * as fs from 'fs';
import * as path from 'path';

export default class VideoListController {

  public readFilesListFromFolder(): string[] {
    return this.readFilesRecoursevly(process.env.ROOT_PATH_DERICTORY, []);
  }

  private readFilesRecoursevly(dir: string, fileList: string[]): string[] {
    fileList = fileList || [];
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      if (fs.statSync(path.join(dir, file)).isDirectory()) {
        fileList = this.readFilesRecoursevly(path.join(dir, file), fileList);
      } else {
        fileList.push(file);
      }
    });
    return fileList;
  }
}

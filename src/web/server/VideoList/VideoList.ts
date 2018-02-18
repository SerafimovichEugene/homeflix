import * as express from 'express';
import * as fs from 'fs';
import * as path from 'path';
import { Router } from 'express';

export default class VideoList {
  private router: Router;
  constructor() {
    this.router = express.Router();
    this.configureRouter();
  }

  public getRouterInstance(): Router {
    return this.router;
  }

  private readFilesListFromFolder(req, res, next) {
    const startPath = '/media/evgen/Новый\ том/video';
    const arr = this.readFilesRecoursevly(startPath, []);
    res.send(arr);
  }

  configureRouter(): void {
    this.router.get('/videos', this.readFilesListFromFolder.bind(this));
  }

  private readFilesRecoursevly(dir, fileList): string[] {
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

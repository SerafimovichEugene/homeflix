import * as express from 'express';
import * as fs from 'fs';
import { Router } from 'express';

export default class Video {
  private router: Router;
  constructor() {
    this.router = express.Router();
    this.configureRouter();
  }

  public getRouterInstance(): Router {
    return this.router;
  }

  configureRouter(): void {
    this.router.get('/videos', (req, res, next) => {
      const path = '/media/evgen/Новый\ том/video';
      fs.readdir(path, (err, files) => {
        files.forEach(file => {
          console.log(file);
        });
        res.send(files);
      });
    });
  }

  private readFilesRecoursevly(path): string[] {
    return [];
  }
}

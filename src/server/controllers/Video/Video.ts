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
    this.router.get('/video', this.videoController);
  }

  private videoController(req: any, res: any, next: any) {
    const path = '/media/evgen/Новый\ том/video/nvz.mp4';
    const stat = fs.statSync(path);
    const fileSize = stat.size;
    const range = req.headers.range;
    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1]
        ? parseInt(parts[1], 10)
        : fileSize-1;
      const chunksize = (end-start)+1;
      const file = fs.createReadStream(path, {start, end});
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'video/mp4',
      };
      res.writeHead(206, head);
      file.pipe(res);
    } else {
      const head = {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
      }
      res.writeHead(200, head);
      fs.createReadStream(path).pipe(res);
    }
  }
}

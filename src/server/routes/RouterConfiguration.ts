import * as express from 'express';
import { Router } from 'express';
import * as path from 'path';
import videoListConroller from '../controllers/VideoListController';

export default class RouterConfiguration {
  public router: Router;
  constructor() {
    this.router = express.Router();
    this.config();
  }

  private config(): void {
    const controller = new videoListConroller();

    this.router.use('/api/videos/', (req, res, next) => {
      const videos = controller.readFilesListFromFolder();
      const mp4Videos = videos.filter();
      res.send(videos);
    });

    this.router.get('/', (req, res, next) => {
      res.sendFile(path.join(`/${__dirname}/../../public/index.html`));
    });
  }
}

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
    const videoListController = new videoListConroller();

    this.router.use('/api/videos/', videoListController.getVideos);
    this.router.use('/api/refresh/', videoListController.refreshVideos);

    this.router.get('/', (req, res, next) => {
      res.sendFile(path.join(`/${__dirname}/../../public/index.html`));
    });
  }
}

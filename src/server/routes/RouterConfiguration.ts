import * as express from 'express';
import { Router } from 'express';
import * as path from 'path';
import videoListConroller from '../controllers/VideoListController';
import videoConroller from '../controllers/VideoController';
import { VideoListModel } from '../models/VideoListModel/VideoListModel';

export default class RouterConfiguration {
  public router: Router;
  constructor() {
    this.router = express.Router();
    this.config();
  }

  private config(): void {
    const videListModel = new VideoListModel();
    const videoListController = new videoListConroller(videListModel);
    const videoController = new videoConroller(videListModel);

    this.router.use('/api/videos/', videoListController.getVideos);
    this.router.use('/api/video/:id', videoController.getVideo);
    this.router.use('/api/refresh/', videoListController.refreshVideos);

    this.router.get('/', (req, res, next) => {
      res.sendFile(path.join(`/${__dirname}/../../public/index.html`));
    });
  }
}

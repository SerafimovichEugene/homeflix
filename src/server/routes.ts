import path from 'path';
import { Router } from 'express';

import { VideoListModel } from './models/VideoListModel/VideoListModel';
import VideoListController from './controllers/VideoListController';
import VideoController from './controllers/VideoController';

const router: Router = Router();

export default (): Router => {

  const videListModel = new VideoListModel();
  const videoListController = new VideoListController(videListModel);
  const videoController = new VideoController(videListModel);

  router.use('/api/videos/', videoListController.getVideos);
  router.use('/api/video/:id', videoController.getVideo);

  router.get('*', (_req: any, res: any, _next: any) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
  });

  return router;
};

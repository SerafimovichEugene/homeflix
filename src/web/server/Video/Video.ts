import * as express from 'express';
import { Router } from 'express';
import { videoController } from './videoController';

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
    this.router.get('/video', videoController);
  }
}

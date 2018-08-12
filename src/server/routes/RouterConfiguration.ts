import * as express from 'express';
import { Router } from 'express';
import * as path from 'path';
// import videoListConroller from '../controllers/VideoList/VideoList';

export default class RouterConfiguration {
  public router: Router;
  constructor() {
    this.router = express.Router();
    this.config();
  }

  private config(): void {
    this.router.use('/videos', (req, res, next) => {
      res.send('ok');
    });
    this.router.get('/', (req, res, next) => {
      res.sendFile(path.join(`/${__dirname}/../../public/index.html`));
    });
  }
}

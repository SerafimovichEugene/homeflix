import * as express from 'express';
import { Application, Request, Response, NextFunction, Router } from 'express';
import * as path from 'path';
import * as fs from 'fs';
import Video from './Video/Video';
import VideoList from './VideoList/VideoList';

const port = 8080;

export class Server {
  private app: Application;
  private router: Router;
  constructor() {
    this.app = express();
    this.router = express.Router();
    this.configureServer();
    this.configureRoutes();
  }

  private configureServer(): void {
    this.app.use(express.static(path.join(__dirname + '/public')));
  }

  private configureRoutes() {
    this.app.get('/', (req, res) => {
      res.sendFile(path.join(__dirname + '/public/index.html'));
    });
    this.app.use(new Video().getRouterInstance());
    this.app.use(new VideoList().getRouterInstance());
    this.app.all('*', (req, res) => {
      res.write('ooops...something went wrong');
      res.end();
    });
  }

  public runServer(port): void {
    this.app.listen(port, () => {
        console.log(`listen on ${port}`);
    });
  }
}

import * as express from 'express';
import { Application } from 'express';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

import RouterConfiguration from './routes/RouterConfiguration';

export class Server {
  private app: Application;
  constructor() {
    this.app = express();
    this.configureServer();
    this.configureRoutes();
  }

  private configureServer(): void {
    this.app.use(express.static(path.join(__dirname, '/../public')));
  }

  private configureRoutes() {
    this.app.use('/', new RouterConfiguration().router);
  }

  public run(port: number): void {
    this.app.listen(port, () => {
        console.log(`listen on ${port}`);
    });
  }
}

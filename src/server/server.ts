import * as express from 'express';
import { Application } from 'express';
import * as path from 'path';
import RouterConfiguration from './routes/RouterConfiguration';
import { DBConnector } from './models/DBConnector';

export class Server {
  private app: Application;
  constructor() {
    this.app = express();
    this.configureServer();
    this.configureRoutes();
    this.configureDB();
  }

  private configureServer(): void {
    this.app.use(express.static(path.join(__dirname, '/../public')));
  }

  private configureRoutes() {
    this.app.use('/', new RouterConfiguration().router);
  }

  private configureDB() {
    const sequalize = DBConnector.getConnector();
    sequalize.authenticate()
      .then(() => {
        console.log('Connection has been established successfully.');
      })
      .catch((err: any) => {
        console.error('Unable to connect to the database:', err);
      });
  }

  public run(port: number): void {
    this.app.listen(port, () => {
        console.log(`listen on ${port}`);
    });
  }
}

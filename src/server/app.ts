import path from 'path';
// import { Connection } from 'typeorm';
import express, { Application } from 'express';
import bodyParser from 'body-parser';
import routes from './routes';
import { setLogger } from './configs/logger';
import errorHandler from './controllers/error-controller';


const createApp = async (): Promise<Application> => {
  // await connectDb();
  const app = express();
  app.use(setLogger);
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(routes());
  app.use(errorHandler);
  app.use(express.static(path.join(__dirname, 'public')));

  return app;
};

export default createApp;

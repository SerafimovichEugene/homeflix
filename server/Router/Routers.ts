import * as express from 'express';
import { Request, Response, Application, NextFunction, Router } from 'express';

export default class Routers {
  constructor() {
    this.router = express.Router();
  }
  public router: Router;
}

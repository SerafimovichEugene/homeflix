import * as dotenv from 'dotenv';
import { Server } from './server';

dotenv.config();

new Server().run(+process.env.PORT!);

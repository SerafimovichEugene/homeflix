import * as dotenv from 'dotenv';
import { Server } from './server';

dotenv.config();

const serverInstace = new Server();
serverInstace.run(+process.env.PORT);

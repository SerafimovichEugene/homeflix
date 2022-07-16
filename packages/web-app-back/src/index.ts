import dotenv from 'dotenv';
import path from 'path';
import express from 'express';

//should happen as earlier
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

import { getListFile } from './routes/get-list-file';

const main = async () => {
  const app = express();
  const port = 8282;

  app.use(express.static(path.join(__dirname, '/public')));

  app.get('/', (req, res) => {
    res.send('Hello World!');
  })

  app.get('/list', async (req, res) => {
    try {
      const page = req.query['page'] ? Number(req.query['page']) : 1;
      const limit = req.query['limit'] ? Number(req.query['limit']) : 10;
      const result = await getListFile(page, limit);
      res.send(result);
    } catch (error) {
      console.log('--list route err');
      console.log(error.stack);
      res.status(500).send(error.stack);
    }
  })

  app.listen(port, () => {
    console.log(`app listening on port ${port}`);
  })
}

main().catch((err: Error) => {
  console.log('--Error');
  console.log('--name and message', err.name, err.message, err.stack);
  console.log('--stack', err.stack);
});



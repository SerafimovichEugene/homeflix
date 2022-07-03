import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import { getListFile } from './routes/get-list-file';

dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

const main = async () => {
  const app = express();
  const port = 3000;

  app.use(express.static(path.join(__dirname, '/public')));

  app.get('/', (req, res) => {
    res.send('Hello World!');
  })

  app.get('/list', async (req, res) => {
    try {
      const page = Number(req.query['page']) ?? 0;
      const limit = Number(req.query['limit']) ?? 10;

      const result = await getListFile(page, limit);

      res.send(result);

    } catch (error) {
      console.log('--/list route err');
      console.log(error);
    }
  })

  app.listen(port, () => {
    console.log(`app listening on port ${port}`);
  })
}

main().catch(err => {
  console.log('--Error');
  console.log(err);
});



import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';

//should happen as earlier
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

import { PostgresDataService } from "./service/postgres.service";
import { MemoryDataService } from "./service/memory-data.service";
import fs from "fs";

const main = async () => {
  const app = express();
  const port = 8282;
  const pgDataProvider = new PostgresDataService();
  const memoryDataProvider = new MemoryDataService(pgDataProvider);
  await memoryDataProvider.refreshFiles();

  app.use(cors({ origin: '*' }));
  app.use(express.static(path.join(__dirname, '/public')));

  app.get('/', (req, res) => {
    res.send('Hello World!');
  })

  app.get('/list', async (req, res) => {
    try {
      const page = req.query['page'] ? Number(req.query['page']) : 1;
      const limit = req.query['limit'] ? Number(req.query['limit']) : 10;
      const search = req.query['search'] as string ?? '';
      const result = await memoryDataProvider.getFileEntities(page, limit, search);
      res.send({
        items: result,
        page,
        limit,
      });
    } catch (error) {
      console.log('--list route err');
      console.log(error.stack);
      res.status(500).send();
    }
  })

  app.get('/list/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const file = await memoryDataProvider.getFileEntity(id);
      const path = `${file.path}/${file.name}`;
      const stat = fs.statSync(path);
      const fileSize = stat.size;
      const range = req.headers.range;

      if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1]
          ? parseInt(parts[1], 10)
          : fileSize-1;
        const chunksize = (end - start) + 1;
        const file = fs.createReadStream(path, { start, end });
        const head = {
          'Content-Range': `bytes ${start}-${end}/${fileSize}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': chunksize,
          'Content-Type': 'video/mp4',
        };
        res.writeHead(206, head);
        file.pipe(res);
      }

      else {
        const head = {
          'Content-Length': fileSize,
          'Content-Type': 'video/mp4',
        }
        res.writeHead(200, head);
        fs.createReadStream(path).pipe(res);
      }
    } catch (error) {
      console.log('--item by id route err');
      console.log(error.stack);
      res.status(500).send();
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



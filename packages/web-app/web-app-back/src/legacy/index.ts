import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import express from 'express';
// import cors from 'cors';

dotenv.config({ path: path.resolve(__dirname, '../../../../.env') });

// import { PostgresDataService } from './service/postgres.service';
// import { MemoryDataService } from './service/memory-data.service';

const main = async () => {
  const app = express();
  const port = 8282;
  // const pgDataProvider = new PostgresDataService();
  // const memoryDataProvider = new MemoryDataService(pgDataProvider);
  // await memoryDataProvider.refreshFiles();

  // app.use(cors({ origin: '*' }));

  app.use(express.static(path.resolve(__dirname, '../../web-app-front/public')));

  app.get('/api/list', async (req, res) => {
    try {
      const re = Boolean(req.query['re']);
      const page = req.query['page'] ? Number(req.query['page']) : 1;
      const limit = req.query['limit'] ? Number(req.query['limit']) : 10;
      const search = (req.query['search'] as string) ?? '';
      if (re) {
        console.log('--refresh');
        // await memoryDataProvider.refreshFiles();
        console.log('--list from pg');
        res.send({
          // items: await pgDataProvider.getFileEntities(page, limit),
          page,
          limit,
        });
      } else {
        console.log('--list from memory');
        res.send({
          // items: await memoryDataProvider.getFileEntities(page, limit, search),
          page,
          limit,
        });
      }
    } catch (error) {
      console.log('--list route err');
      console.log(error.stack);
      res.status(500).send();
    }
  });

  app.get('/api/list/:id', async (req, res) => {
    try {
      const id = req.params.id;
      // const file = await memoryDataProvider.getFileEntity(id);
      // const path = `${file.path}/${file.name}`;
      // const stat = fs.statSync(path);
      // const fileSize = stat.size;
      // const range = req.headers.range;
      //
      // if (range) {
      //   const parts = range.replace(/bytes=/, "").split("-");
      //   const start = parseInt(parts[0], 10);
      //   const end = parts[1]
      //     ? parseInt(parts[1], 10)
      //     : fileSize-1;
      //   const chunksize = (end - start) + 1;
      //   const file = fs.createReadStream(path, { start, end });
      //   const head = {
      //     'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      //     'Accept-Ranges': 'bytes',
      //     'Content-Length': chunksize,
      //     'Content-Type': 'video/mp4',
      //   };
      //   res.writeHead(206, head);
      //   file.pipe(res);
      // }
      //
      // else {
      //   const head = {
      //     'Content-Length': fileSize,
      //     'Content-Type': 'video/mp4',
      //   }
      //   res.writeHead(200, head);
      //   fs.createReadStream(path).pipe(res);
      // }
    } catch (error) {
      console.log('--item by id route err');
      console.log(error.stack);
      res.status(500).send();
    }
  });

  app.get('*', function (req, res) {
    res.sendFile('index.html', { root: path.resolve(__dirname, '../../web-app-front/public') });
  });

  app.listen(port, () => {
    console.log(`app listening on port ${port}`);
  });
};

main().catch((err: Error) => {
  console.log('--Error');
  console.log('--name and message', err.name, err.message);
  console.log('--stack', err.stack);
});

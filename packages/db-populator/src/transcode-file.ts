import dotenv from 'dotenv';
import path from 'path';

import { PGProvider } from './model/db';
import { FileService } from './service/file-service';
import { VideoService } from './service/screenshot-service';

dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

const fileService = new FileService();
const pgProvider = new PGProvider();
const videoService = new VideoService();

const populate = async () => {
  // we always add, not remove
  console.log('start populating--');

  await pgProvider.initConnection();
  console.log('--connected');

//   const dbFiles = await pgProvider.getFiles();

  const files = fileService.getFiles(['avi', 'mkv']);

  for (let index = 0; index < files.length; index++) {
    console.log("--> ", index);
    videoService.convertVideoFile(files[index]);
    console.log("--> converted", index);
  }

}

populate()
  .then(() => {
    console.log('--Finished');
    process.exit(0);
  })
  .catch(async (error) => {
    console.log('--Error');
    console.log(error);
    process.exit(1);
  })
  .finally(async () => {
    await pgProvider.client.end();
  });


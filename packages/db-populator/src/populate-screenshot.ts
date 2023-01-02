import dotenv from 'dotenv';
import path from 'path';
import { FileService } from './service/file-service';

dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

const fileSystemProvider = new FileService();

const populate = async () => {
  const ss = await fileSystemProvider.createScreenshots();
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
    // await pgProvider.client.end();
  });


import dotenv from 'dotenv';
import path from 'path';
import { FileService } from './service/file-service';
import { VideoService } from './service/screenshot-service';

dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

const fileService = new FileService();
const videoService = new VideoService();

const transcode = async () => {
  console.log('-- start trascoding');
  const files = fileService.getFiles(['avi', 'mkv']);

  console.log('-- files ', files);

  for (let index = 0; index < files.length; index++) {
    console.log("--> ", index);
    videoService.convertVideoFile(files[index]);
    console.log("--> converted", index);
  }
}

transcode()
  .then(() => {
    console.log('--Finished');
    process.exit(0);
  })
  .catch(async (error) => {
    console.log('--Error');
    console.log(error);
    process.exit(1);
  });

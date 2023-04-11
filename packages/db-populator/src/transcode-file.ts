import dotenv from "dotenv";
import path from "path";
import { FileService, VideoFileExtension } from "./service/file-service";
import { VideoService } from "./service/screenshot-service";

dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

const fileService = new FileService();
const videoService = new VideoService();

const transcode = () => {
  console.log("-- start trascoding");
  const files = fileService.getFiles([VideoFileExtension.avi, VideoFileExtension.mkv]);
  console.log("-- files ", files);

  for (let index = 0; index < files.length; index++) {
    console.log("--> converting", files[index].name);
    videoService.convertVideoFile(files[index]);
    console.log("--> converted", index + 1);
  }
};

try {
  transcode();
} catch (err) {
  console.log('--> transcode error', err);
}


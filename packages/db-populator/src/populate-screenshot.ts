import { config } from "dotenv";
import path from "path";
import { FileService } from "./service/file-service";
import { PGProvider } from "./model/db";
import { ScreenshotFile } from "./model/screenshot";
import { VideoService } from "./service/screenshot-service";

config({ path: path.resolve(__dirname, "../../../.env") });

const fileService = new FileService();
const videoService = new VideoService();
const pgProvider = new PGProvider();

const populate = async () => {
  await pgProvider.initConnection();
  const videoFiles = fileService.getFiles();
  console.log("-- total video files ", videoFiles.length);
  const screenshots: ScreenshotFile[] = [];
  for (let index = 0; index < videoFiles.length; index++) {
    console.log("--> ", index);
    screenshots.push(videoService.takeScreenshotSync(videoFiles[index]));
  }
  await pgProvider.createScreenshots(screenshots);
  return screenshots;
};

populate()
  .then(() => {
    console.log("--Finished");
    process.exit(0);
  })
  .catch(async (error) => {
    console.log("--Error");
    console.log(error);
    process.exit(1);
  });

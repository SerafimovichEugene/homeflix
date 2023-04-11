import path from "path";
import { v5 as uuid } from "uuid";
import { execFileSync } from "child_process";
import { ScreenshotFile } from "../model/screenshot";
import { File } from "../model/file";
import { spent } from "../utils/spent";

export class VideoService {
  takeScreenshotSync(file: File): ScreenshotFile {
    const { SCREENSHOT_ROOT_DIR } = process.env;
    if (!SCREENSHOT_ROOT_DIR) {
      throw new Error("screenshot directory variable is absent");
    }
    const screenshotFileName = `${file.id}-1`;
    const screenshotFilePath = path.resolve(SCREENSHOT_ROOT_DIR, `${screenshotFileName}.jpg`);
    try {
      spent(() => execFileSync("ffmpeg", [
        "-ss",
        "00:05:05", // TODO eliminate hardcoded value, use percentage of video length
        "-i",
        `${file.path}/${file.name}`,
        "-vframes",
        "1",
        "-q:v",
        "2",
        `${SCREENSHOT_ROOT_DIR}/${screenshotFileName}.jpg`,
        "-y",
      ]));
      return new ScreenshotFile(screenshotFileName, screenshotFilePath, new Date(Date.now()).toISOString(), file.id, uuid(screenshotFileName, uuid.DNS));
    } catch (err) {
      console.log("-- take screenshot catch error", err);
      throw err;
    }
  }

  convertVideoFile(file: File): void {
    try {
      const { FILE_ROOT_DIR } = process.env;
      if (!FILE_ROOT_DIR) {
        throw new Error("screenshot directory variable is absent");
      }
      const name = file.name.split(".");
      const nameWithoutExtension = name.slice(0, name.length - 1).join('.');
      console.log(nameWithoutExtension);

      // execFileSync("ffmpeg", [
      //   "-i",
      //   `${file.path}/${file.name}`,
      //   "-c:v",
      //   "libx264",
      //   "-crf",
      //   "18",
      //   "-preset",
      //   "veryslow",
      //   "-c:a",
      //   "aac",
      //   "-b:a",
      //   "320k",
      //   `${FILE_ROOT_DIR}/${name}.mp4`,
      // ]);

      // execFileSync("ffmpeg", [
      //   "-i",
      //   `${file.path}/${file.name}`,
      //   "-c:v",
      //   "libx264",
      //   "-crf",
      //   "23",
      //   "-preset",
      //   "medium",
      //   "-c:a",
      //   "aac",
      //   "-b:a",
      //   "320k",
      //   `${FILE_ROOT_DIR}/${name}.mp4`,
      // ]);
      
      // spent(() => execFileSync("ffmpeg", [
      //   "-i",
      //   `${file.path}/${file.name}`,
      //   "-c:v",
      //   "libx264",
      //   "-preset",
      //   "slow",
      //   "-crf", 
      //   "18",
      //   "-c:a",
      //   "copy",
      //   `${FILE_ROOT_DIR}/${nameWithoutExtension}.mp4`,
      // ]));
      

      // the fastest option
      spent(() => execFileSync("ffmpeg", [
        "-i",
        `${file.path}/${file.name}`,
        "-c:v",
        "h264_nvenc",
        "-preset",
        "slow",
        "-cq", 
        "20",
        "-c:a",
        "aac",
        "-b:a",
        "192k",
        `${FILE_ROOT_DIR}/${nameWithoutExtension}.mp4`,
      ]));

      // spent(() => execFileSync("ffmpeg", [
      //   "-i",
      //   `${file.path}/${file.name}`,
      //   "-c:v",
      //   "libx264",
      //   "-preset",
      //   "medium",
      //   "-crf", 
      //   "20",
      //   "-c:a",
      //   "aac",
      //   "-b:a",
      //   "192k",
      //   "-movflags",
      //   "+faststart",
      //   `${FILE_ROOT_DIR}/${nameWithoutExtension}.mp4`,
      // ]));


    } catch (err) {
      console.log("------ take screenshot catch error", err);
      throw err;
    }

  }

  // ffmpeg -i input.mkv -c:v libx264 -crf 18 -preset veryslow -c:a aac -b:a 320k output.mp4  too slow
  // ffmpeg -i input.mkv -c:v libx264 -crf 23 -preset medium -c:a aac -b:a 192k output.mp4    
  // ffmpeg -i input.mkv -c:v h264_nvenc -preset slow -cq 20 -c:a aac -b:a 192k output.mp4
  // ffmpeg -i input.avi -c:v libx264 -preset slow -crf 18 -c:a copy output.mp4
  // ffmpeg -i input.avi -c:v libx264 -preset slow -crf 18 -c:a aac -b:a 192k -movflags +faststart output.mp4

  /* retrieve specific video info from a mp4 file */
  getVideoInfo(file: File): void {}
}

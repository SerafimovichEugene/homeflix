import path from "path";
import { v5 as uuid } from "uuid";
import { execFileSync } from "child_process";
import { ScreenshotFile } from "../model/screenshot";
import { File } from "../model/file";

export class VideoService {
  takeScreenshotSync(file: File): ScreenshotFile {
    const { SCREENSHOT_ROOT_DIR } = process.env;
    if (!SCREENSHOT_ROOT_DIR) {
      throw new Error("screenshot directory variable is absent");
    }
    const screenshotFileName = `${file.id}-1`;
    const screenshotFilePath = path.resolve(SCREENSHOT_ROOT_DIR, `${screenshotFileName}.jpg`);
    try {
      execFileSync("ffmpeg", [
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
      ]);
      return new ScreenshotFile(screenshotFileName, screenshotFilePath, new Date(Date.now()).toISOString(), file.id, uuid(screenshotFileName, uuid.DNS));
    } catch (err) {
      console.log("-- take screenshot catch error", err);
      throw err;
    }
  }

  /* re-mux video file from target format to .mp4*/
  convertVideoFile(file: File): void {
    try {
      const { FILE_ROOT_DIR } = process.env;
      if (!FILE_ROOT_DIR) {
        throw new Error("screenshot directory variable is absent");
      }
      const name = file.name.split(".")[0];
      execFileSync("ffmpeg", [
        "-i",
        `${file.path}/${file.name}`,
        "-strict",
        "-2",
        `${FILE_ROOT_DIR}/${name}.mp4`,
        "-y",
      ]);
    } catch (err) {
      console.log("------ take screenshot catch error", err);
      throw err;
    }
  }

  /* retrieve specific video info from a mp4 file */
  getVideoInfo(file: File): void {}
}

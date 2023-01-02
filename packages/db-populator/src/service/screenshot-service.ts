
import path from "path";
import { promisify } from "util";
import { v5 as uuid } from 'uuid';
import { exec } from "child_process";
import { ScreenshotFile } from "../model/screenshot";
import { File } from "../model/file";

export const execute = async (comand: string) => {
    const response = await promisify(exec)(comand);
    process.stdout.write(response.stdout);
    process.stderr.write(response.stderr);
}

export class ScreeenshotService {
    async takeScreenshot(file: File): Promise<ScreenshotFile> {
        const { SCREENSHOT_ROOT_DIR } = process.env;
        if (!SCREENSHOT_ROOT_DIR) {
            throw new Error('screenshot directory variable is absent');
        }
        const screenshotFileName = `${file.id}-1`;
        const screenshotFilePath = path.resolve(SCREENSHOT_ROOT_DIR, `${screenshotFileName}.jpg`);
        try {
            await execute(`ffmpeg -ss 00:03:05 -i "${file.path}/${file.name}" -frames:v 1 -q:v 2 "${SCREENSHOT_ROOT_DIR}/${screenshotFileName}.jpg" -y`);
            return new ScreenshotFile(screenshotFileName, screenshotFilePath, uuid(screenshotFileName, uuid.DNS));
        } catch(err) {
            console.log('-- take screenshot catch error', err)
            throw err;
        }
    }
}
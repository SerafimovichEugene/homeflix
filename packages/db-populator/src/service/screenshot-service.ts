
import path from "path";
import { promisify } from "util";
import { File } from "../model/file";
import { ScreenshotFile } from "../model/screenshot";
import { v5 as uuid } from 'uuid';

export class ScreeenshotService {

    // ffmpeg -ss 00:19:45 -i test_1.mp4 -frames:v 1 -q:v 2 output3.jpg 

    async takeScreenshot(file: File): Promise<ScreenshotFile> {
        const { SCREENSHOT_ROOT_DIR } = process.env;

        if (!SCREENSHOT_ROOT_DIR) {
            throw new Error('screenshot directory variable is absent');
        }


        const screenshotFileName = `${file.id}-1`;
        const screenshotFilePath = path.resolve(SCREENSHOT_ROOT_DIR, `${screenshotFileName}.jpg`);
        try {
            const response1 = await promisify(require('child_process').exec)(`ffmpeg --help`);
            console.log('--response1 ', response1);
            const response = await promisify(require('child_process').exec)(`ffmpeg -ss 00:03:05 -i "${file.path}/${file.name}" -frames:v 1 -q:v 2 "${SCREENSHOT_ROOT_DIR}/${screenshotFileName}.jpg"`);

            console.log('--ok', response.stdout);
            console.log('--err', response.stderr);

            process.stdout.write(response.stdout);
            process.stderr.write(response.stderr);



            return new ScreenshotFile(screenshotFileName, screenshotFilePath, uuid(screenshotFileName, uuid.DNS));
        } catch(err) {
            console.log('-- take screenshot catch error', err)
            throw err;
        }
    }
}
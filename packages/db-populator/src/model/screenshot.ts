
import { File } from "./file";

export class ScreenshotFile extends File {
    public resolution: string

    constructor(name: string, path: string, id?: string) {
        super(name, path, id);
        this.resolution = '';
    }
}


import { File } from "./file";

export class ScreenshotFile extends File {
  public resolution: string;
  public parentId: string;

  constructor(name: string, path: string, parentId: string, id?: string) {
    super(name, path, id);
    this.parentId = parentId;
    this.resolution = "";
  }
}

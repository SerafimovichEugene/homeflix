import { File } from "./file";

export class ScreenshotFile extends File {
  public resolution: string;
  public parentId: string;

  constructor(name: string, path: string, createdAt: string, parentId: string,  id?: string) {
    super(name, path, createdAt, id);
    this.parentId = parentId;
    this.resolution = "";
  }
}

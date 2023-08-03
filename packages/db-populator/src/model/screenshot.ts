import { File } from './File'

export class ScreenshotFile extends File {
  public resolution: string
  public parentId: string

  constructor(name: string, path: string, createdAt: string, parentId: string, size: number, id?: string) {
    super(name, path, createdAt, size, id)
    this.parentId = parentId
    this.resolution = ''
  }
}

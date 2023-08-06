import { VideoFile } from './VideoFile'

export class VideoFileModel extends VideoFile {
  private _isExistent: boolean

  constructor(id: string, name: string, path: string, isExistent: boolean, createdAt: string, size: number) {
    super(name, path, createdAt, size, '', id)
    this._isExistent = isExistent
  }

  public set isExistent(value: boolean) {
    this._isExistent = value
  }

  public get isExistent() {
    return this._isExistent
  }
}

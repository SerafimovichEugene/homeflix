import { v5 as uuid } from 'uuid';

export class File {
  id: string
  path: string
  name: string

  constructor(name: string, path: string, id?: string) {
    this.id = id || uuid(name, uuid.DNS);
    this.name = name;
    this.path = path;
  }
}

export class VideoFile extends File {
  public length: number
  constructor(name: string, path: string, length: number = 0, id?: string) {
    super(name, path, id);
    this.length = length;
  }
}
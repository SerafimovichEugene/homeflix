import { v5 as uuid } from 'uuid';

export class File {
  id: string
  path: string
  name: string
  birhTime: string

  constructor(name: string, path: string, birhTime: string, id?: string) {
    this.id = id || uuid(name, uuid.DNS);
    this.name = name;
    this.path = path;
    this.birhTime = birhTime;
  }
}

export class VideoFile extends File {
  public length: number
  constructor(name: string, path: string, birhTime: string, length: number, id?: string) {
    super(name, path, birhTime, id);
    this.length = length;
  }
}
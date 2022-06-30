import fs from 'fs';
import path from 'path';
import { v5 as uuid } from 'uuid';

export class FileSystemProvider {

  public inProgress: boolean;

  constructor() {
    this.inProgress = true;
  }

  public getFiles(dir: string = '/files_test'): FileEntity[] {
    this.inProgress = true;
    const result = FileSystemProvider.readFiles(dir, []).filter((item) => {
      const arr = item.name.split('.');
      return arr[arr.length - 1] === 'mp4';
    });
    this.inProgress = false;
    return result;
  }

  private static readFiles(dir: string, fileList: FileEntity[]): FileEntity[] {
    fileList = fileList || [];
    const files = fs.readdirSync(dir);
    files.forEach(fileName => {
      if (fs.statSync(path.join(dir, fileName)).isDirectory()) {
        fileList = this.readFiles(path.join(dir, fileName), fileList);
      } else {
        fileList.push(new FileEntityLoc(fileName, dir));
      }
    });
    return fileList;
  }
}

export interface FileEntity {
  id: string
  path: string
  name: string
}

export class FileEntityLoc implements FileEntity {
  id: string
  path: string
  name: string
  private namespace = '6ba7b812-9dad-11d1-80b4-00c04fd430c8'

  constructor(name: string, path: string) {
    this.id = uuid(name, this.namespace);
    this.name = name;
    this.path = path;
  }
}

export class FileEntityDb implements FileEntity {
  id: string
  path: string
  name: string

  constructor(id: string, name: string, path: string) {
    this.id = id;
    this.name = name;
    this.path = path;
  }
}

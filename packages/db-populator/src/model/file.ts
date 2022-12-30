import fs from 'fs';
import path from 'path';
import { v5 as uuid } from 'uuid';

export interface FileEntity {
  id: string
  path: string
  name: string
}

export interface FileEntityRaw {
  file_id: string
  file_path: string
  file_name: string
  file_is_existent: boolean
  file_is_new: boolean
}

export class FileSystemProvider {

  public inProgress: boolean;

  constructor() {
    this.inProgress = true;
  }

  public getFiles(): FileEntity[] {
    this.inProgress = true;
    const { FILE_ROOT_DIR } = process.env;

    if (!FILE_ROOT_DIR) {
      throw new Error('directory variable is absent');
    }

    const result = FileSystemProvider.readFiles(FILE_ROOT_DIR, []).filter((item) => {
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

export class FileEntityLoc implements FileEntity {
  id: string
  path: string
  name: string

  constructor(name: string, path: string) {
    this.id = uuid(name, uuid.DNS);
    this.name = name;
    this.path = path;
  }
}
import fs from 'fs'
import path from 'path'
import { File } from '../model/File'

export enum FileExtension {
  'mp4' = 'mp4',
  'webm' = 'webm',
  'avi' = 'avi',
  'mkv' = 'mkv',
  'jpg' = 'jpg',
}

export class FileService {
  private getPath() {
    const { FILE_ROOT_DIR } = process.env
    if (!FILE_ROOT_DIR) {
      throw new Error('directory variable is absent')
    }
    return FILE_ROOT_DIR
  }

  public getFiles(extensions: FileExtension[]): File[] {
    const dir = this.getPath()
    return FileService.readFiles(dir, []).filter((item) => {
      const arr = item.name.split('.')
      return extensions.some((ex) => arr[arr.length - 1] === ex)
    })
  }

  private static readFiles(dir: string, fileList: File[]): File[] {
    fileList = fileList || []
    const files = fs.readdirSync(dir)
    files.forEach((fileName) => {
      const stat = fs.statSync(path.join(dir, fileName))
      if (stat.isDirectory()) {
        fileList = this.readFiles(path.join(dir, fileName), fileList)
      } else {
        const birthTime = stat.birthtime.toISOString()
        const size = stat.size
        fileList.push(new File(fileName, dir, birthTime, size))
      }
    })
    return fileList
  }
}

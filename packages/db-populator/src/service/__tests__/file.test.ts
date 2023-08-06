import path from 'path'
import { FileService, FileExtension } from '../file-service'
import { VideoFile } from '../../model/VideoFile'

describe('FileService class', () => {
  it('should find files in directory', () => {
    const inst = new FileService()
    const absolutePath = path.resolve('src/model/__tests__/__mocks__')
    process.env.FILE_ROOT_DIR = absolutePath
    expect(inst.getFiles([FileExtension.mp4])).toEqual([
      new VideoFile('test3.mp4', path.resolve(absolutePath, 'files/files'), '', 0, '01:02:43.312'),
      new VideoFile('test2.mp4', path.resolve(absolutePath, 'files'), '', 0, '00:23:43.123'),
      new VideoFile('test1.mp4', absolutePath, '', 0, '00:23:43.123'),
    ])
  })
})

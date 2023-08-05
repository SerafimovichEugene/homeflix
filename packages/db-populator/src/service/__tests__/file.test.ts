import path from 'path'
import { FileService, VideoFileExtension } from '../file-service'
import { VideoFile } from '../../model/File'

describe('FileService class', () => {
  it('should find files in directory', () => {
    const inst = new FileService()
    const absolutePath = path.resolve('src/model/__tests__/__mocks__')
    process.env.FILE_ROOT_DIR = absolutePath
    expect(inst.getFiles([VideoFileExtension.mp4])).toEqual([
      new VideoFile('test3.mp4', path.resolve(absolutePath, 'files/files'), '', 0, 0),
      new VideoFile('test2.mp4', path.resolve(absolutePath, 'files'), '', 0, 0),
      new VideoFile('test1.mp4', absolutePath, '', 0, 0),
    ])
  })
})

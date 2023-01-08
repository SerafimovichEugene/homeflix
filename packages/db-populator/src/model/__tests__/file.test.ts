import path  from 'path';
import { FileService } from '../../service/file-service';
import { VideoFile } from '../file';

describe('FileProvider class', () => {
  it('should find files in directory', () => {
    const inst = new FileService();
    const absolutePath = path.resolve('src_migrate/model/__tests__/__mocks__');
    process.env.FILE_ROOT_DIR = absolutePath;
    expect(inst.getFiles(['mp4']))
      .toEqual([
        new VideoFile('test3.mp4', path.resolve(absolutePath,'files/files')),
        new VideoFile('test2.mp4', path.resolve(absolutePath,'files')),
        new VideoFile('test1.mp4', absolutePath),
      ])
  })
})

import path  from 'path';
import { FileEntityLoc, FileSystemProvider } from '../file';

describe('FileProvider class', () => {
  it('should find files in directory', () => {
    const inst = new FileSystemProvider();
    const absolutePath = path.resolve('src_migrate/model/__tests__/__mocks__');
    process.env.FILE_ROOT_DIR = absolutePath;
    expect(inst.getFiles())
      .toEqual([
        new FileEntityLoc('test3.mp4', path.resolve(absolutePath,'files/files')),
        new FileEntityLoc('test2.mp4', path.resolve(absolutePath,'files')),
        new FileEntityLoc('test1.mp4', absolutePath),
      ])
  })
})

import path  from 'path';
import {File, FileProvider} from '../file';

describe('FileProvider class', () => {
  it('should find files in directory', () => {
    const inst = new FileProvider();
    const absolutePath = path.resolve('src/model/__tests__/__mocks__');
    expect(inst.getFiles(absolutePath))
      .toEqual([
        new File('test3.mp4', path.resolve(absolutePath,'files/files')),
        new File('test2.mp4', path.resolve(absolutePath,'files')),
        new File('test1.mp4', absolutePath),
      ])
  })
})

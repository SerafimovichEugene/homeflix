import { v5 as uuid } from 'uuid';
import { VideoFileModel } from '../../model/db';
import { VideoFile } from '../../model/file';
import { getDiff } from '../diff';

describe('getDiff function', () => {
  it('should find new', () => {
    const name1 = 'testName1';
    const name2 = 'testName2';
    const name3 = 'testName3';

    const file1 = new VideoFile(name1, 'test/path', '',0);
    const file2 = new VideoFile(name2, 'test/path', '',0);
    const file3 = new VideoFile(name3, 'test/path', '',0);

    const sourceFiles = [
      file1,
      file2,
      file3,
    ];

    const populatingFiles: VideoFileModel[] = [];

    expect(getDiff(sourceFiles, populatingFiles)).toEqual([
      [
        new VideoFileModel(uuid(name1, uuid.DNS), name1, 'test/path', true, true, ''),
        new VideoFileModel(uuid(name2, uuid.DNS), name2, 'test/path', true, true, '' ),
        new VideoFileModel(uuid(name3, uuid.DNS), name3, 'test/path', true, true, '')
      ],
      [],
      [],
    ])
  });

  it('should find new, deleted and restored files', () => {
    const name1 = 'testName1';
    const name2 = 'testName2';
    const name3 = 'testName3';
    const name4 = 'testName4';

    const fileLoc1 = new VideoFile(name1, 'test/path', '',0);
    const fileLoc2 = new VideoFile(name2, 'test/path', '',0);
    const fileLoc4 = new VideoFile(name4, 'test/path', '',0);

    const sourceFiles = [
      fileLoc1,
      fileLoc2,
      fileLoc4,
    ];

    const fileDb2 = new VideoFileModel(uuid(name2, uuid.DNS), name2, 'test/path', true, true, '');
    const fileDb3 = new VideoFileModel(uuid(name3, uuid.DNS), name3, 'test/path', true, true, '');
    const fileDb4 = new VideoFileModel(uuid(name4, uuid.DNS), name4, 'test/path', false, false, '');

    const populatingFiles: VideoFileModel[] = [
      fileDb2,
      fileDb3,
      fileDb4,
    ];

    const fileRes1 = new VideoFileModel(uuid(name1, uuid.DNS), name1, 'test/path', true, true, '');
    const fileRes3 = new VideoFileModel(uuid(name3, uuid.DNS), name3, 'test/path', false, false, '');
    const fileRes4 = new VideoFileModel(uuid(name4, uuid.DNS), name4, 'test/path', false, true, '');

    expect(getDiff(sourceFiles, populatingFiles)).toEqual([
      [fileRes1],
      [fileRes3],
      [fileRes4]
    ])
  });
});

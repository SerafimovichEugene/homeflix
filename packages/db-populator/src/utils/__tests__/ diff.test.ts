import { v5 as uuid } from 'uuid';
import { FileEntityDb, FileEntityLoc } from '../../model/file';
import { getDiff } from '../diff';

describe('getDiff function', () => {
  it('should find new', () => {
    const name1 = 'testName1';
    const name2 = 'testName2';
    const name3 = 'testName3';

    const file1 = new FileEntityLoc(name1, 'test/path');
    const file2 = new FileEntityLoc(name2, 'test/path');
    const file3 = new FileEntityLoc(name3, 'test/path');

    const sourceFiles = [
      file1,
      file2,
      file3,
    ];

    const populatingFiles: FileEntityDb[] = [];

    expect(getDiff(sourceFiles, populatingFiles)).toEqual([
      [
        new FileEntityDb(uuid(name1, uuid.DNS), name1, 'test/path', true, true ),
        new FileEntityDb(uuid(name2, uuid.DNS), name2, 'test/path', true, true ),
        new FileEntityDb(uuid(name3, uuid.DNS), name3, 'test/path', true, true)
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

    const fileLoc1 = new FileEntityLoc(name1, 'test/path');
    const fileLoc2 = new FileEntityLoc(name2, 'test/path');
    const fileLoc4 = new FileEntityLoc(name4, 'test/path');

    const sourceFiles = [
      fileLoc1,
      fileLoc2,
      fileLoc4,
    ];

    const fileDb2 = new FileEntityDb(uuid(name2, uuid.DNS), name2, 'test/path', true, true);
    const fileDb3 = new FileEntityDb(uuid(name3, uuid.DNS), name3, 'test/path', true, true);
    const fileDb4 = new FileEntityDb(uuid(name4, uuid.DNS), name4, 'test/path', false, false);

    const populatingFiles: FileEntityDb[] = [
      fileDb2,
      fileDb3,
      fileDb4,
    ];

    const fileRes1 = new FileEntityDb(uuid(name1, uuid.DNS), name1, 'test/path', true, true );
    const fileRes3 = new FileEntityDb(uuid(name3, uuid.DNS), name3, 'test/path', false, false);
    const fileRes4 = new FileEntityDb(uuid(name4, uuid.DNS), name4, 'test/path', false, true);

    expect(getDiff(sourceFiles, populatingFiles)).toEqual([
      [fileRes1],
      [fileRes3],
      [fileRes4]
    ])
  });
});

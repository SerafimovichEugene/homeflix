import { v5 as uuid } from 'uuid';
import {FileEntity, FileEntityDb, FileEntityLoc, FileEntityResult} from '../../model/file';
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

    const populatingFiles: FileEntity[] = [];

    expect(getDiff(sourceFiles, populatingFiles)).toEqual([
      [
        new FileEntityResult(uuid(name1, uuid.DNS), name1, 'test/path' ),
        new FileEntityResult(uuid(name2, uuid.DNS), name2, 'test/path' ),
        new FileEntityResult(uuid(name3, uuid.DNS), name3, 'test/path' )
      ],
      [],
    ])
  });

  it('should find new and deleted', () => {
    const name1 = 'testName1';
    const name2 = 'testName2';
    const name3 = 'testName3';

    const fileLoc1 = new FileEntityLoc(name1, 'test/path');
    const fileLoc2 = new FileEntityLoc(name2, 'test/path');

    const sourceFiles = [
      fileLoc1,
      fileLoc2,
    ];

    const fileDb2 = new FileEntityDb(uuid(name2, uuid.DNS), name2, 'test/path');
    const fileDb3 = new FileEntityDb(uuid(name3, uuid.DNS), name3, 'test/path');

    const populatingFiles: FileEntity[] = [
      fileDb2,
      fileDb3,
    ];

    const fileRes1 = new FileEntityResult(uuid(name1, uuid.DNS), name1, 'test/path' );
    const fileRes3 = new FileEntityResult(uuid(name3, uuid.DNS), name3, 'test/path' );
    fileRes3.isExistent = false;

    expect(getDiff(sourceFiles, populatingFiles)).toEqual([
      [fileRes1],
      [fileRes3],
    ])
  });
});

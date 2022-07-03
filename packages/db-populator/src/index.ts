import dotenv from 'dotenv';
import path from 'path';
import { FileSystemProvider } from './model/file';
import { PGProvider } from './model/db';
import { getDiff } from './utils/diff';

dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

const fileSystemProvider = new FileSystemProvider();
const pgProvider = new PGProvider();

const populate = async () => {
  // we always add, not remove
  console.log('start populating--');

  await pgProvider.initConnection();
  console.log('--connected');

  const dbFiles = await pgProvider.getFiles();
  const sourceFiles = fileSystemProvider.getFiles();

  console.log('--sourceFiles', sourceFiles.length);
  console.log('--dbFiles', dbFiles.length);

  const [newFiles, deletedFiles, restoredFiles] = getDiff(sourceFiles, dbFiles);
  console.log('--new', newFiles.length);
  console.log('--deleted', deletedFiles.length);
  console.log('--restored', restoredFiles.length);

  if (newFiles.length > 0) {
    await pgProvider.insertNewFiles(newFiles);
  }
  if (deletedFiles.length > 0) {
    await pgProvider.markNonexistentFiles(deletedFiles);
  }
  if (restoredFiles.length > 0) {
    await pgProvider.markRestoredFiles(restoredFiles);
  }
}

populate()
  .then(() => {
    console.log('--Finished');
    process.exit(0);
  })
  .catch(async (error) => {
    console.log('--Error');
    console.log(error);
    process.exit(1);
  })
  .finally(async () => {
    await pgProvider.client.end();
  });


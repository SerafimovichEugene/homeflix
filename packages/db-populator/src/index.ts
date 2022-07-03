import { FileSystemProvider } from './model/file';
import { PGProvider } from './model/db';
import { getDiff } from './utils/diff';

const populate = async () => {
  // we always add, not remove
  console.log('start populating--');

  const fileSystemProvider = new FileSystemProvider();
  const pgProvider = new PGProvider();
  await pgProvider.initConnection();

  const dbFiles = await pgProvider.getFiles();
  const sourceFiles = fileSystemProvider.getFiles();

  const [newFiles, deletedFiles] = getDiff(sourceFiles, dbFiles);

  await pgProvider.insertNewFiles(newFiles);
  await pgProvider.markNonexistentFiles(deletedFiles);
}

populate()
  .then(() => {
    console.log('Finished');
    process.exit(0);
  })
  .catch((error) => {
    console.log('Error--');
    console.log(error);
    process.exit(1);
  });


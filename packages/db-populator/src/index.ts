import {FileEntity, FileSystemProvider} from "./model/file";
import {PGProvider} from "./model/db";

const getDiff = (sourceFiles: FileEntity[], populatingFiles: FileEntity[]) => {
  
}


const populate = async () => {
  // we always add, not remove
  console.log('--start populating');


  /*
    1. get new state from file system
    2. get previous state from db
    3. calc diff
    4. update db state based on diff
  */


  const fileSystemProvider = new FileSystemProvider();
  const pgProvider = new PGProvider();

  const dbFiles = await pgProvider.getFiles();
  const sourceFiles = fileSystemProvider.getFiles();

  // difference
}

populate()
  .then(() => {
    console.log('Finished');
    process.exit(0);
  })
  .catch((error) => {
    console.log('Error');
    console.log(error);
    process.exit(1);
  });


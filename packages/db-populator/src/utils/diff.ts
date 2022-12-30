import { FileEntityDb } from '../model/db';
import { FileEntity } from '../model/file';

export const getDiff = (sourceFiles: FileEntity[], populatingFiles: FileEntityDb[]): [FileEntityDb[], FileEntityDb[], FileEntityDb[]] => {
  const sourceFilesMap = new Set(sourceFiles.map(f => f.id));
  const populatingFilesMap = new Set(populatingFiles.map(f => f.id));

  const newFiles = sourceFiles.reduce<FileEntityDb[]>((acc, f) => {
    if (!populatingFilesMap.has(f.id)) {
      const newFile = new FileEntityDb(f.id, f.name, f.path, true, true)
      newFile.isNew = true;
      newFile.isExistent = true;
      acc.push(newFile)
    }
    return acc;
  }, []);

  const deletedFiles = populatingFiles.reduce<FileEntityDb[]>((acc, f) => {
    if (!sourceFilesMap.has(f.id)) {
      f.isExistent = false;
      acc.push(f)
    }
    return acc;
  }, [])

  const restoredFiles = populatingFiles.reduce<FileEntityDb[]>((acc, f) => {
    if (sourceFilesMap.has(f.id) && !f.isExistent) {
      f.isNew = false;
      f.isExistent = true;
      acc.push(f);
    }
    return acc;
  }, [])
  return [newFiles, deletedFiles, restoredFiles];
}

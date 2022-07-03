import { FileEntity, FileEntityResult } from '../model/file';

export const getDiff = (sourceFiles: FileEntity[], populatingFiles: FileEntity[]): [FileEntityResult[], FileEntityResult[]] => {
  const sourceFilesMap = new Set(sourceFiles.map(f => f.id));
  const populatingFilesMap = new Set(populatingFiles.map(f => f.id));

  const newFiles = sourceFiles.reduce<FileEntityResult[]>((acc, f) => {
    if (!populatingFilesMap.has(f.id)) {
      const newFile = new FileEntityResult(f.id, f.name, f.path)
      newFile.isNew = true;
      newFile.isExistent = true;
      acc.push(newFile)
    }
    return acc;
  }, []);

  const deletedFiles = populatingFiles.reduce<FileEntityResult[]>((acc, f) => {
    if (!sourceFilesMap.has(f.id)) {
      const newFile = new FileEntityResult(f.id, f.name, f.path)
      newFile.isNew = false;
      newFile.isExistent = false;
      acc.push(newFile)
    }
    return acc;
  }, [])
  return [newFiles, deletedFiles];
}

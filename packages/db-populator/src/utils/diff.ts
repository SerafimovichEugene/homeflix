import { VideoFileModel } from '../model/db';
import { VideoFile } from '../model/file';

export const getDiff = (sourceFiles: VideoFile[], populatingFiles: VideoFileModel[]): [VideoFileModel[], VideoFileModel[], VideoFileModel[]] => {
  const sourceFilesMap = new Set(sourceFiles.map(f => f.id));
  const populatingFilesMap = new Set(populatingFiles.map(f => f.id));

  const newFiles = sourceFiles.reduce<VideoFileModel[]>((acc, f) => {
    if (!populatingFilesMap.has(f.id)) {
      const newFile = new VideoFileModel(f.id, f.name, f.path, true, true)
      newFile.isNew = true;
      newFile.isExistent = true;
      acc.push(newFile)
    }
    return acc;
  }, []);

  const deletedFiles = populatingFiles.reduce<VideoFileModel[]>((acc, f) => {
    if (!sourceFilesMap.has(f.id)) {
      f.isExistent = false;
      acc.push(f)
    }
    return acc;
  }, [])

  const restoredFiles = populatingFiles.reduce<VideoFileModel[]>((acc, f) => {
    if (sourceFilesMap.has(f.id) && !f.isExistent) {
      f.isNew = false;
      f.isExistent = true;
      acc.push(f);
    }
    return acc;
  }, [])
  return [newFiles, deletedFiles, restoredFiles];
}

import { FileEntity, FileEntityProvider } from '../../../domain';

export class JestDataService implements FileEntityProvider {

  public files = [
    { id: 'id1', name: 'name1', path: 'path1' },
    { id: 'id2', name: 'name24', path: 'path1' },
    { id: 'id3', name: 'name3', path: 'path1' },
    { id: 'id4', name: 'name4', path: 'path1' },
    { id: 'id5', name: 'name54', path: 'path1' },
    { id: 'id6', name: 'name6', path: 'path1' },
    { id: 'id7', name: 'name7', path: 'path1' },
    { id: 'id8', name: 'name87', path: 'path1' },
    { id: 'id9', name: 'name94', path: 'path1' },
    { id: 'id10', name: 'name10', path: 'path1' },
    { id: 'id11', name: 'name12', path: 'path1' },
    { id: 'id12', name: 'name134', path: 'path1' },
  ] as FileEntity[];

  getFileEntities(_page: number, _limit: number): Promise<FileEntity[]> {
    return Promise.resolve(this.files);
  }

  getFileEntity(id: string): Promise<FileEntity> {
    throw new Error('not implemented');
  }
}

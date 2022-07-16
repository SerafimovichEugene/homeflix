import { FileEntity, FileEntityProvider } from "../../domain";

export class MemoryDataService implements FileEntityProvider{
  private files: FileEntity[]
  private fileMap: Map<string, FileEntity>
  private fileEntityProvider: FileEntityProvider

  constructor(fileEntityProvider: FileEntityProvider) {
    this.files = [];
    this.fileMap = new Map();
    this.fileEntityProvider = fileEntityProvider;
  }

  public async refreshFiles() {
    this.files = await this.fileEntityProvider.getFileEntities(1, 10000);
    this.fileMap = new Map();
    this.files.forEach(f => {
      this.fileMap.set(f.id, f);
    })
    console.log('--refresh result: ', '\n', 'files: ', this.files.length);
  }

  public getFileEntities(page: number, limit: number): Promise<FileEntity[]> {
    const start = limit * (page - 1);
    return Promise.resolve(this.files.slice(start, limit));
  }

  public getFileEntity(id: string): Promise<FileEntity> {
    const file = this.fileMap.get(id);
    if (!file) {
      throw new Error('not found');
    }
    return Promise.resolve(file);
  }
}

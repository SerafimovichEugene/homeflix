import { FileEntity, FileEntityProvider } from '../../domain';
import getLimitOffset from '../../routes/common/get-limit-ofsset';

export class MemoryDataService implements FileEntityProvider {
  private files: FileEntity[]
  private fileMap: Map<string, FileEntity>
  private fileEntityProvider: FileEntityProvider

  constructor(fileEntityProvider: FileEntityProvider) {
    this.files = [];
    this.fileMap = new Map();
    this.fileEntityProvider = fileEntityProvider;
  }

  public async refreshFiles() {
    this.files = await this.fileEntityProvider.getFileEntities(1, 1000000);
    this.fileMap = new Map();
    this.files.forEach(f => {
      this.fileMap.set(f.id, f);
    });
    this.files = this.files.sort((a, b) => {
      if (a.name > b.name) {
        return 1;
      } else {
        return -1;
      }
    });
    console.log('--refresh result: ', '\n', 'files: ', this.files.length);
  }

  public getFileEntities(page: number, limit: number, search?: string): Promise<FileEntity[]> {
    const files = search
      ? this.files.filter(f => {
        const re = new RegExp(`${search}`, 'i');
        return re.test(f.name);
      })
      : this.files;
    const { offset: start, limit: validLimit } = getLimitOffset({ page, limit }, files.length);
    const end = start + validLimit;
    return Promise.resolve(files.length > 0 ? files.slice(start, end) : []);
  }

  public getFileEntity(id: string): Promise<FileEntity> {
    const file = this.fileMap.get(id);
    if (!file) {
      throw new Error('not found');
    }
    return Promise.resolve(file);
  }
}

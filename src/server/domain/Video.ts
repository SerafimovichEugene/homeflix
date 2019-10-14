export class Video {
  public id: string;
  public path: string;
  public fileName: string;
  public fileStatus: string;

  constructor(path: string, file?: string) {
    this.id =  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    this.path = path;
    const parts = path.split('/');
    this.fileName = parts[parts.length - 1];
    this.fileStatus = file || 'empty file status';
  }
}

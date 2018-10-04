enum fileStatusEnums {
  new = 1,
  common,
  deleted,
}

export class Video {
  public id: string;
  public path: string;
  public fileName: string;
  public fileStatus: fileStatusEnums;

  constructor(path: string, fileStatus?: fileStatusEnums) {
    this.id =  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    this.path = path;
    const parts = path.split('/');
    this.fileName = parts[parts.length - 1];
    this.fileStatus = fileStatus;
  }
}

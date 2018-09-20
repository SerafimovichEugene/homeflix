enum fileStatusEnums {
  new = 1,
  common,
  deleted,
}

export class Video {
  public path: string;
  public fileName: string;
  public fileStatus: fileStatusEnums;

  constructor(path: string, name: string, fileStatus?: fileStatusEnums) {
    this.path = path;
    this.fileName = name;
    this.fileStatus = fileStatus;
  }
}

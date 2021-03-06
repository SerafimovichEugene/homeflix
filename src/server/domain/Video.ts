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

  constructor(path: string, name: string, fileStatus?: fileStatusEnums) {
    this.id =  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    this.path = path;
    this.fileName = name;
    this.fileStatus = fileStatus;
  }
}

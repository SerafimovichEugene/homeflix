export interface FileEntity {
  id: string
  path: string
  name: string
}

export interface FileEntityRaw {
  file_id: string
  file_path: string
  file_name: string
  file_is_existent: boolean
  file_is_new: boolean
}

export abstract class FileEntityProvider {
  public abstract getFileEntities(page: number, limit: number): Promise<FileEntity[]>
  public abstract getFileEntity(id: string): Promise<FileEntity>
}

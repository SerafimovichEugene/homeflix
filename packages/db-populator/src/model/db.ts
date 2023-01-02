import { Client } from 'pg';
import format from 'pg-format';
import { VideoFile } from './file';

export interface VideoFileRaw {
  file_id: string
  file_path: string
  file_name: string
  file_is_existent: boolean
  file_is_new: boolean
}

export class VideoFileModel extends VideoFile {

  private _isExistent: boolean
  private _isNew: boolean

  constructor(id: string, name: string, path: string, isNew: boolean, isExistent: boolean) {
    super(name, path, 0, id);
    this._isNew = isNew;
    this._isExistent = isExistent;
  }

  public set isNew(value: boolean) {
    this._isNew = value;
  }

  public get isNew() {
    return this._isNew;
  }

  public set isExistent(value: boolean) {
    if (!value) {
      this._isNew = value;
    }
    this._isExistent = value;
  }

  public get isExistent() {
    return this._isExistent;
  }
}

export class PGProvider {
  public client: Client;
  constructor () {
    const {
      POSTGRES_USER,
      POSTGRES_PASSWORD,
      POSTGRES_DATABASE,
      POSTGRES_HOST,
      POSTGRES_PORT,
    } = process.env;

    if (!POSTGRES_USER || !POSTGRES_PASSWORD || !POSTGRES_DATABASE || !POSTGRES_HOST || !POSTGRES_PORT) {
      throw new Error('Some env db variables are absent');
    }

    this.client = new Client({
      host: POSTGRES_HOST,
      port: Number(POSTGRES_PORT),
      user: POSTGRES_USER,
      password: POSTGRES_PASSWORD,
      database: POSTGRES_DATABASE,
    });
  }

  public async initConnection() {
    await this.client.connect();
  }

  async getFiles(): Promise<VideoFileModel[]> {
    try {
      const { rows } = await this.client.query<VideoFileRaw>(PGProvider.getAllFilesSql());
      return rows.map<VideoFileModel>((
        {
          file_id,
          file_name,
          file_path,
          file_is_new,
          file_is_existent
        }) => (new VideoFileModel(file_id, file_name, file_path, file_is_new, file_is_existent))
      );
    } catch (error) {
      console.log('db_level', error);
      throw error;
    }
  }

  async insertNewFiles(files: VideoFileModel[]) {
    try {
      const sql = PGProvider.getInsertingNewFilesSql(files);
      await this.client.query(sql);
      console.log('--inserted');
    } catch (error) {
      console.log('db_level', error);
      throw error;
    }
  }

  async markNonexistentFiles(files: VideoFileModel[]) {
    try {
      await this.client.query(PGProvider.getMarkNonexistentFilesSql(files));
      console.log('nonexistent marked--');
    } catch (error) {
      console.log('db_level', error);
      throw error;
    }
  }

  async markRestoredFiles(files: VideoFileModel[]) {
    try {
      await this.client.query(PGProvider.getMarkRestoredFilesSql(files));
      console.log('restored marked--');
    } catch (error) {
      console.log('db_level', error);
      throw error;
    }
  }

  private static getInsertingNewFilesSql(files: VideoFileModel[]): string {
    const values = files.map((f) => [f.id, f.name, f.path, f.isExistent, f.isNew])
    return format(`
      INSERT INTO file (file_id, file_name, file_path, file_is_existent, file_is_new)
      VALUES %L
      ON CONFLICT (file_id) DO NOTHING;
    `, values);
  }

  private static getMarkNonexistentFilesSql(files: VideoFile[]): string {
    const values = files.map((f) => [f.id])
    return format(`
      UPDATE file SET file_is_existent = false, file_is_new = false
      WHERE file.file_id IN %L;
    `, values);
  }

  private static getMarkRestoredFilesSql(files: VideoFile[]): string {
    const values = files.map((f) => [f.id])
    return format(`
      UPDATE file SET file_is_existent = true, file_is_new = false
      WHERE file.file_id IN %L;
    `, values);
  }

  private static getAllFilesSql(): string {
    return format(`
      SELECT f.*
      FROM file f
      ORDER BY f.file_name ASC;
    `)
  }
}

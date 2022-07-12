import { Client } from 'pg';
import format from 'pg-format';
import { FileEntity, FileEntityDb, FileEntityRaw } from './file';

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

  async getFiles(): Promise<FileEntityDb[]> {
    try {
      const { rows } = await this.client.query<FileEntityRaw>(PGProvider.getAllFilesSql());
      return rows.map<FileEntityDb>((
        {
          file_id,
          file_name,
          file_path,
          file_is_new,
          file_is_existent
        }) => (new FileEntityDb(file_id, file_name, file_path, file_is_new, file_is_existent))
      );
    } catch (error) {
      console.log('db_level', error);
      throw error;
    }
  }

  async insertNewFiles(files: FileEntityDb[]) {
    try {
      const sql = PGProvider.getInsertingNewFilesSql(files);
      await this.client.query<FileEntity>(sql);
      console.log('--inserted');
    } catch (error) {
      console.log('db_level', error);
      throw error;
    }
  }

  async markNonexistentFiles(files: FileEntityDb[]) {
    try {
      await this.client.query<FileEntity>(PGProvider.getMarkNonexistentFilesSql(files));
      console.log('nonexistent marked--');
    } catch (error) {
      console.log('db_level', error);
      throw error;
    }
  }

  async markRestoredFiles(files: FileEntityDb[]) {
    try {
      await this.client.query<FileEntity>(PGProvider.getMarkRestoredFilesSql(files));
      console.log('restored marked--');
    } catch (error) {
      console.log('db_level', error);
      throw error;
    }
  }

  private static getInsertingNewFilesSql(files: FileEntityDb[]): string {
    const values = files.map((f) => [f.id, f.name, f.path, f.isExistent, f.isNew])
    return format(`
      INSERT INTO file (file_id, file_name, file_path, file_is_existent, file_is_new)
      VALUES %L
      ON CONFLICT (file_id) DO NOTHING;
    `, values);
  }

  private static getMarkNonexistentFilesSql(files: FileEntity[]): string {
    const values = files.map((f) => [f.id])
    return format(`
      UPDATE file SET file_is_existent = false, file_is_new = false
      WHERE file.file_id IN %L;
    `, values);
  }

  private static getMarkRestoredFilesSql(files: FileEntity[]): string {
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

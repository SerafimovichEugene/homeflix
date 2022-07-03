import { Client } from 'pg';
import format from 'pg-format';
import { FileEntity, FileEntityDb, FileEntityResult } from './file';

export class PGProvider {
  public client: Client;
  constructor () {
    this.client = new Client();
  }

  public async initConnection() {
    await this.client.connect();
  }

  async getFiles(): Promise<FileEntity[]> {
    try {
      const { rows } = await this.client.query<FileEntity>(PGProvider.getAllFilesSql());
      return rows.map<FileEntity>(({id, name, path}) => (new FileEntityDb(id, name, path)));
    } catch (error) {
      console.log('db_level', error);
      throw error;
    }
  }

  async insertNewFiles(files: FileEntityResult[]) {
    try {
      await this.client.query<FileEntity>(PGProvider.getInsertingNewFilesSql(files));
      console.log('inserted--');
    } catch (error) {
      console.log('db_level', error);
      throw error;
    }
  }

  async markNonexistentFiles(files: FileEntityResult[]) {
    try {
      await this.client.query<FileEntity>(PGProvider.getMarkNonexistentFilesSql(files));
      console.log('nonexistent marked--');
    } catch (error) {
      console.log('db_level', error);
      throw error;
    }
  }

  private static getInsertingNewFilesSql(files: FileEntityResult[]): string {
    const values = files.map((f) => [f.id, f.name, f.path, f.isExistent, f.isNew])
    return format(`
      INSERT INTO file (file_id, file_name, file_path, file_is_existent, file_is_new)
      VALUES %L
      ON CONFLICT (id) DO NOTHING;
    `, values);
  }

  private static getMarkNonexistentFilesSql(files: FileEntity[]): string {
    const values = files.map((f) => [f.id])
    return format(`
      UPDATE file SET file_is_existent = false
      WHERE file.id IN %L
    `, values);
  }

  private static getAllFilesSql(): string {
    return format(`
      SELECT fe.id, fe.name, fe.path
      FROM file_entity fe
      ORDER BY fe.name ASC;
    `)
  }
}

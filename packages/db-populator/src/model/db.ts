import { Client } from 'pg';
import format from 'pg-format';
import { FileEntity, FileEntityDb } from './file';

export class PGProvider {
  public client: Client;
  constructor() {
    this.client = new Client();
  }

  async getFiles(): Promise<FileEntity[]> {
    try {
      await this.client.connect();
      const { rows } = await this.client.query<FileEntity>(PGProvider.getAllFilesSql());
      return rows.map<FileEntity>(({id, name, path}) => (new FileEntityDb(id, name, path)));
    } catch (error) {
      console.log('db_level', error);
      throw error;
    }
  }

  private static getAllFilesSql(): string {
    return format(`
      SELECT fe.id, fe.name, fe.path
      FROM file_entity fe
      ORDER BY fe.name ASC;
    `)
  }
}

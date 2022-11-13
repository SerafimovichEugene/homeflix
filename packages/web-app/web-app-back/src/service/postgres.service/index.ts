import { Pool } from 'pg';
import format from 'pg-format';
import { FileEntity, FileEntityProvider, FileEntityRaw } from '../../domain';
import getLimitOffset from '../../routes/common/get-limit-ofsset';

export class PostgresDataService implements FileEntityProvider {

  private pool: Pool

  constructor() {
    this.pool = PostgresDataService.initPool();
    this.pool.on('error', (err) => {
      console.error('--error on pool', err);
      process.exit(-1);
    })
  }

  static initPool() {
    const {
      POSTGRES_USER,
      POSTGRES_PASSWORD,
      POSTGRES_DATABASE,
      POSTGRES_HOST,
      POSTGRES_PORT,
    } = process.env;

    console.log('POSTGRES_USER ', POSTGRES_USER);
    console.log('POSTGRES_DATABASE ', POSTGRES_DATABASE);
    console.log('POSTGRES_HOST ', POSTGRES_HOST);
    console.log('POSTGRES_PORT ', POSTGRES_PORT);

    if (!POSTGRES_USER || !POSTGRES_PASSWORD || !POSTGRES_DATABASE || !POSTGRES_HOST || !POSTGRES_PORT) {
      throw new Error('--Some env db variables are absent');
    }

    return new Pool({
      host: POSTGRES_HOST,
      port: Number(POSTGRES_PORT),
      user: POSTGRES_USER,
      password: POSTGRES_PASSWORD,
      database: POSTGRES_DATABASE,
    });
  }

  async getFileEntities(page: number, limit: number): Promise<FileEntity[]> {
    const client = await this.pool.connect();
    try {
      const countResult = await client.query(PostgresDataService.getCountSql());
      const { count } = countResult.rows[0];
      const { limit: validLimit, offset: validOffset } = getLimitOffset({ limit, page }, Number(count));
      const { rows } = await client.query<FileEntityRaw>(PostgresDataService.getListFileSql(validOffset, validLimit));
      return rows.map<FileEntity>(r => ({ id: r.file_id, name: r.file_name, path: r.file_path }));
    } catch (error) {
      console.log('--postgres data service, getFileEntities', error);
      throw error;
    } finally {
      client.release();
    }
  }

  async getFileEntity(): Promise<FileEntity> {
    throw new Error('not implemented');
  }

  private static getListFileSql(offset: number, limit: number): string {
    return format(`
      SELECT *
      FROM file f
      ORDER BY f.file_name LIMIT %s OFFSET %s;
    `, limit, offset);
  }

  private static getCountSql(): string {
    return format(`
      SELECT count(*)
      FROM file;
    `);
  }
}

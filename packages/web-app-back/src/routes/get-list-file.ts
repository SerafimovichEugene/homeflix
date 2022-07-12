import format from 'pg-format';
import { getPgClient } from '../service/postgres.service';
import { FileEntity, FileEntityRaw } from '../domain';
import { Pageable } from './types';
import getLimitOffset from "./common/get-limit-ofsset";

export const getListFile = async (page = 1, limit = 10): Promise<Pageable<FileEntity>> => {
  const client = await getPgClient();
  try {
    const pgCountSqlResult = await client.query(getCountSql());
    const { count } = pgCountSqlResult.rows[0];
    const { limit: validLimit, offset: validOffset } = getLimitOffset({ limit, page }, Number(count));
    const { rows } = await client.query<FileEntityRaw>(getListFileSql(validOffset, validLimit));
    const items = rows.map(r => ({ id: r.file_id, name: r.file_name, path: r.file_path }));

    return {
      items,
      page,
      limit,
    }
  } catch (error) {
    console.log('--service level error stack', error.stack);
    console.log(error);
    throw error;
  } finally {
    client.release();
  }
}

const getListFileSql = (offset: number, limit: number) => format(`
    SELECT *
    FROM file f
    ORDER BY f.file_name LIMIT %s OFFSET %s;
   `, limit, offset);

const getCountSql = () => format(`
    SELECT count(*)
    FROM file;
   `);

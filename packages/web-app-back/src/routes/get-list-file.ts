import format from 'pg-format';
import { getPgClient } from '../service/postgres.service';
import { FileEntity, FileEntityRaw } from "../../../common";

export const getListFile = async (page = 0, limit = 10): Promise<FileEntity[]> => {
  const client = await getPgClient();
  try {
    const { rows } = await client.query<FileEntityRaw>(getListFileSql(page, limit));
    return rows.map(r => ({ id: r.file_id, name: r.file_name, path: r.file_path }));
  } catch (error) {
    console.log('--service level error', error.stack);
    console.log(error);
    throw error;
  } finally {
    client.release();
  }

}

const getListFileSql = (page: number, limit: number) => format(`
    SELECT *
    FROM file f
    ORDER BY f.file_name LIMIT %s OFFSET %s;
   `, limit, page);

import { Pool, PoolClient } from 'pg';

const initPool = () => {
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

  return new Pool({
    host: POSTGRES_HOST,
    port: Number(POSTGRES_PORT),
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DATABASE,
  });
}

const pool = initPool();

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
})

export const getPgClient = async (): Promise<PoolClient> => {
  return await pool.connect();
}

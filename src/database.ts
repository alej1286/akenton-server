import { Pool } from 'pg';

export const pool = new Pool({
    connectionString : process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
      }
    //user: 'postgres',
    //host: 'localhost',
    //password: 'master32',
    //database: 'akenton',
    //port: 5432
});
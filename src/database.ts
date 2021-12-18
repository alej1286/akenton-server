import { Pool } from 'pg';

export const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: 'master32',
    database: 'akenton',
    port: 5432
});
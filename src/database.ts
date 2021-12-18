//import { Pool } from 'pg';
const { Pool } = require('pg');

export const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});


/* export const pool = new Pool({
    connectionString : process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
      }
    //user: 'postgres',
    //host: 'localhost',
    //password: 'master32',
    //database: 'akenton',
    //port: 5432
}); */
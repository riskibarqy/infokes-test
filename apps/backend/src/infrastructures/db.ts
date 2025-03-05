import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { config } from './config';

const pool = new Pool({
    host: config.DB_HOST,
    user: config.DB_USER,
    password: config.DB_PASS,
    database: config.DB_NAME,
    port: config.DB_PORT,
});

export const db = drizzle(pool);

import 'dotenv/config';
import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL?.trim();

if (!connectionString) {
  throw new Error('DATABASE_URL is required to initialize Better Auth');
}

export const authDatabasePool = new Pool({ connectionString });

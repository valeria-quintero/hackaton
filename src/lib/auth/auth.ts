import 'dotenv/config';
import { betterAuth } from 'better-auth';
import { z } from 'zod';
import { authDatabasePool } from './auth.database';

const secret = process.env.BETTER_AUTH_SECRET;
if (!secret || secret.length < 32) {
  throw new Error('BETTER_AUTH_SECRET must be at least 32 characters long');
}

if (!process.env.BETTER_AUTH_URL) {
  throw new Error('BETTER_AUTH_URL is required to initialize Better Auth');
}

const userRole = z.enum(['PARTICIPANT', 'ADMIN']);

export const auth = betterAuth({
  database: authDatabasePool,
  emailAndPassword: { enabled: true },
  user: {
    additionalFields: {
      role: {
        type: 'string',
        required: true,
        defaultValue: 'PARTICIPANT',
        input: false,
        validator: { input: userRole, output: userRole },
      },
    },
  },
});

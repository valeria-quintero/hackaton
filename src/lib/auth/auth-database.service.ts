import { Inject, Injectable, type OnModuleDestroy } from '@nestjs/common';
import type { Pool } from 'pg';
import { AUTH_DATABASE_POOL } from './auth.constants';

@Injectable()
export class AuthDatabaseService implements OnModuleDestroy {
  constructor(
    @Inject(AUTH_DATABASE_POOL)
    private readonly pool: Pool,
  ) {}

  async onModuleDestroy(): Promise<void> {
    await this.pool.end();
  }
}

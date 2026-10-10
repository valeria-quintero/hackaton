import { Global, Module } from '@nestjs/common';
import type { PostgresClient } from '@prisma/orm-postgres/runtime';
import type { Contract } from '../../prisma/contract.d';
import contractJson from '../../prisma/contract.json';
import { PRISMA_CLIENT } from './prisma.constants';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  providers: [
    {
      provide: PRISMA_CLIENT,
      useFactory: async (): Promise<PostgresClient<Contract>> => {
        const connectionString = process.env.DATABASE_URL?.trim();
        if (!connectionString) {
          throw new Error('DATABASE_URL is required to initialize Prisma');
        }

        let url: URL;
        try {
          url = new URL(connectionString);
        } catch {
          throw new Error('DATABASE_URL must be a valid PostgreSQL URL');
        }
        if (
          !['postgres:', 'postgresql:'].includes(url.protocol) ||
          !url.hostname ||
          url.pathname.length <= 1
        ) {
          throw new Error(
            'DATABASE_URL must include a PostgreSQL host and database',
          );
        }

        const { default: postgres } =
          await import('@prisma/orm-postgres/runtime');
        return postgres<Contract>({ contractJson, url: connectionString });
      },
    },
    PrismaService,
  ],
  exports: [PrismaService],
})
export class PrismaModule {}
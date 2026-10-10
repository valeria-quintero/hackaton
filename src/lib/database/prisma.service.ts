import { Inject, Injectable } from '@nestjs/common';
import type { OnModuleDestroy } from '@nestjs/common';
import type { PostgresClient } from '@prisma/orm-postgres/runtime';
import type { Contract } from '../../prisma/contract.d';
import { PRISMA_CLIENT } from './prisma.constants';

@Injectable()
export class PrismaService implements OnModuleDestroy {
  constructor(
    @Inject(PRISMA_CLIENT)
    private readonly client: PostgresClient<Contract>,
  ) {}

  get orm(): PostgresClient<Contract>['orm'] {
    return this.client.orm;
  }

  async onModuleDestroy(): Promise<void> {
    await this.client.close();
  }
}
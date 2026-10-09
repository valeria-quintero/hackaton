import { Global, Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import type { ArcjetNode } from '@arcjet/node';
import { ArcjetGuard } from '../../common/guards/arcjet.guard';
import { ARCJET_CLIENT } from './arcjet.constants';
import { ArcjetService } from './arcjet.service';

@Global()
@Module({
  providers: [
    {
      provide: ARCJET_CLIENT,
      useFactory: async (): Promise<ArcjetNode<{}>> => {
        const key = process.env.ARCJET_KEY;
        if (!key) {
          throw new Error('ARCJET_KEY is required to initialize Arcjet');
        }

        const { default: arcjet, fixedWindow, shield } = await import(
          '@arcjet/node'
        );

        return arcjet({
          key,
          rules: [
            shield({ mode: 'LIVE' }),
            fixedWindow({ mode: 'LIVE', window: '60s', max: 10 }),
          ],
        });
      },
    },
    ArcjetService,
    {
      provide: APP_GUARD,
      useClass: ArcjetGuard,
    },
  ],
  exports: [ArcjetService],
})
export class ArcjetModule {}

import { Module } from '@nestjs/common';
import { ArcjetModule } from './lib/arcjet/arcjet.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './lib/database/prisma.module';

@Module({
  imports: [ArcjetModule, PrismaModule ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

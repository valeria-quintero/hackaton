import { Module } from '@nestjs/common';
import { ArcjetModule } from './lib/arcjet/arcjet.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ArcjetModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { ArcjetModule } from './lib/arcjet/arcjet.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './lib/database/prisma.module';
import { auth } from './lib/auth/auth';
import { AuthDatabaseModule } from './lib/auth/auth-database.module';
import { AuthModule as BetterAuthModule } from '@thallesp/nestjs-better-auth';

@Module({
  imports: [
    ArcjetModule,
    PrismaModule,
    AuthDatabaseModule,
    BetterAuthModule.forRoot({ auth }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

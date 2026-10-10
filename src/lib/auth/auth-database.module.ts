import { Global, Module } from '@nestjs/common';
import { AUTH_DATABASE_POOL } from './auth.constants';
import { authDatabasePool } from './auth.database';
import { AuthDatabaseService } from './auth-database.service';

@Global()
@Module({
  providers: [
    { provide: AUTH_DATABASE_POOL, useValue: authDatabasePool },
    AuthDatabaseService,
  ],
  exports: [AuthDatabaseService],
})
export class AuthDatabaseModule {}

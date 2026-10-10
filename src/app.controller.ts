import { Controller, Get } from '@nestjs/common';
import {
  AllowAnonymous,
  Session,
} from '@thallesp/nestjs-better-auth';
import type { UserSession } from '@thallesp/nestjs-better-auth';
import { AppService } from './app.service';
import { auth } from './lib/auth/auth';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @AllowAnonymous()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('users/me')
  getProfile(@Session() session: UserSession<typeof auth>) {
    return { user: session.user };
  }
}
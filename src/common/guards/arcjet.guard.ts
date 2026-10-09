import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import type { Request } from 'express';
import { ArcjetService } from '../../lib/arcjet/arcjet.service';

@Injectable()
export class ArcjetGuard implements CanActivate {
  constructor(private readonly arcjet: ArcjetService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const decision = await this.arcjet.protect(request);

    if (decision.isDenied()) {
      const isRateLimited = decision.reason.isRateLimit();
      throw new HttpException(
        isRateLimited ? 'Too many requests' : 'Forbidden',
        isRateLimited ? HttpStatus.TOO_MANY_REQUESTS : HttpStatus.FORBIDDEN,
      );
    }

    return true;
  }
}

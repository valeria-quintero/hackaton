import { Inject, Injectable } from '@nestjs/common';
import type { ArcjetNode, ArcjetNodeRequest } from '@arcjet/node';
import { ARCJET_CLIENT } from './arcjet.constants';

@Injectable()
export class ArcjetService {
  constructor(
    @Inject(ARCJET_CLIENT)
    private readonly client: ArcjetNode<{}>,
  ) {}

  protect(request: ArcjetNodeRequest) {
    return this.client.protect(request);
  }
}

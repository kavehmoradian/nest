import { Injectable, Req } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class UserService {
  constructor() {}
  me(req) {
    return req.user;
  }
}

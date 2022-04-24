import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Response } from 'express';

export const GetReq = createParamDecorator(
  (_data, context: ExecutionContext): Response => {
    return context.switchToHttp().getRequest();
  },
);

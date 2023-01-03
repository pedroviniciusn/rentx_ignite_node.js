import { NextFunction, Request, Response } from 'express';

import { verify } from 'jsonwebtoken';

import { AppError } from '@shared/errors/AppError';

import {
  UserTokensRepository,
} from '@modules/accounts/infra/typeorm/repositories/UserTokensRepository';

import auth from '@config/auth';

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError('Token missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub: userId } = verify(
      token,
      auth.secret_token
    ) as IPayload;

    req.user = {
      id: userId,
    };

    next();
  } catch {
    throw new AppError('Invalid Token', 401);
  }
}

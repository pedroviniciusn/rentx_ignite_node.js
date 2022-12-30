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

  const userTokensRepository = new UserTokensRepository();

  if (!authHeader) {
    throw new AppError('Token missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub: userId } = verify(
      token,
      auth.secret_refresh_token
    ) as IPayload;

    const user = await userTokensRepository.findByUserIdAndRefreshToken(
      userId,
      token
    );

    if (!user) {
      throw new AppError('User does not exists', 401);
    }

    req.user = {
      id: userId,
    };

    next();
  } catch {
    throw new AppError('Invalid Token', 401);
  }
}

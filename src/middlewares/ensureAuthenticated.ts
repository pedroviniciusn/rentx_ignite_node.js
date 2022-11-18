import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { AppError } from '../errors/AppError';
import { UserRepository } from '../modules/accounts/repositories/implementations/UserRepository';

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
    const { sub: userId } = verify(token, '56ebb4604b372d83bb869862c65c9fbd') as IPayload;

    const userRepository = new UserRepository();

    const user = await userRepository.findById(userId);

    if (!user) {
      throw new AppError('User does not exists', 401);
    }

    next();
  } catch {
    throw new AppError('Invalid Token', 401);
  }
}

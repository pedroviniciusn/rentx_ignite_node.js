import { inject, injectable } from 'tsyringe';

import { compare } from 'bcryptjs';

import { sign } from 'jsonwebtoken';

import {
  IUsersRepository,
} from '@modules/accounts/repositories/IUsersRepository';

import {
  IUserTokensRepository,
} from '@modules/accounts/repositories/IUserTokensRepository';

import {
  IDateProvider,
} from '@shared/container/providers/DateProviders/IDateProvider';

import { AppError } from '@shared/errors/AppError';

import auth from '@config/auth';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
  refresh_token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,

    @inject('DayjsDateProvider')
    private dayJsDateProvider: IDateProvider,
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Email or password incorrect');
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError('Email or password incorrect');
    }

    const token = sign({}, auth.secret_token, {
      subject: user.id,
      expiresIn: auth.expires_in_token,
    });

    const refresh_token = sign({ email }, auth.secret_refresh_token,{
      subject: user.id,
      expiresIn: auth.expires_in_refresh_token,
    });

    const refresh_token_expires_date = this.dayJsDateProvider.addDays(
      auth.expires_refresh_token_days,
    )

    await this.userTokensRepository.create({
      user_id: user.id,
      refresh_token,
      expires_date: refresh_token_expires_date,
    });

    const tokenReturn: IResponse = {
      token,
      refresh_token,
      user: {
        name: user.name,
        email: user.email,
      },
    };

    return tokenReturn;
  }
}

export { AuthenticateUserUseCase };

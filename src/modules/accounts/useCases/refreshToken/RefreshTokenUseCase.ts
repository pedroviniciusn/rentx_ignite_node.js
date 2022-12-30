import auth from '@config/auth';

import {
  inject,
  injectable,
} from 'tsyringe';

import {
  sign,
  verify,
} from 'jsonwebtoken';

import {
  IUserTokensRepository,
} from '@modules/accounts/repositories/IUserTokensRepository';

import {
  IDateProvider,
} from '@shared/container/providers/DateProvider/IDateProvider';

import {
  AppError,
} from '@shared/errors/AppError';

interface IPayLoad {
  sub: string;
  email: string;
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,

    @inject('DayjsDateProvider')
    private dayJsDateProvider: IDateProvider,
  ) {

  }
  async execute(token: string): Promise<string> {
    const { email, sub } = verify(token, auth.secret_refresh_token) as IPayLoad;

    const user_id = sub;

    const userToken = await this.userTokensRepository.findByUserIdAndRefreshToken(
      user_id,
      token,
    );

    if (!userToken) {
      throw new AppError('Refresh token does not exists!');
    }

    await this.userTokensRepository.deleteById(userToken.id);

    const refresh_token = sign({ email }, auth.secret_refresh_token, {
      subject: sub,
      expiresIn: auth.expires_in_refresh_token
    });

    
    const refresh_token_expires_date = this.dayJsDateProvider.addDays(
      auth.expires_refresh_token_days,
    );

    await this.userTokensRepository.create({
      user_id: sub,
      refresh_token,
      expires_date: refresh_token_expires_date,
    });

    return refresh_token;
  }
}

export { RefreshTokenUseCase };

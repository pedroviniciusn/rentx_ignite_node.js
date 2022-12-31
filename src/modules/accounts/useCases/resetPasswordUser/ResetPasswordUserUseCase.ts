import { hash } from 'bcryptjs';

import {
  inject,
  injectable,
} from 'tsyringe';

import {
  IUsersRepository,
} from '@modules/accounts/repositories/IUsersRepository';

import {
  IUserTokensRepository,
} from '@modules/accounts/repositories/IUserTokensRepository';

import {
  IDateProvider,
} from '@shared/container/providers/DateProvider/IDateProvider';

import {
  AppError,
} from '@shared/errors/AppError';


interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordUserUseCase {
  constructor(
    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,

    @inject('DayjsDateProvider')
    private dayJsDateProvider: IDateProvider,

    @inject('UserRepository')
    private userRepository: IUsersRepository,
  ) {}
  async execute({
  token,
  password
  }: IRequest): Promise<void> {
    const dateNow = this.dayJsDateProvider.dateNow();

    const userToken = await this.userTokensRepository.findByRefreshToken(
      token,
    );

    if (!userToken) {
      throw new AppError('Token invalid!');
    }

    if (await this.dayJsDateProvider.compareIfBefore(
      userToken.expires_date,
      dateNow,
    )) {
      throw new AppError('Token expired!');
    }
    
    const user = await this.userRepository.findById(userToken.user_id);

    user.password = await hash(password, 8);

    await this.userRepository.create(user);

    await this.userTokensRepository.deleteById(userToken.id);
  }
}

export { ResetPasswordUserUseCase };

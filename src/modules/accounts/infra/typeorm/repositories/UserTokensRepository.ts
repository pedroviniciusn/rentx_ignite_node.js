import { getRepository, Repository } from 'typeorm';

import { UserTokens } from '../entities/UserTokens';

import {
  ICreateUserTokenDTO,
} from '@modules/accounts/dtos/ICreateUserTokenDTO';

import {
  IUserTokensRepository,
} from '@modules/accounts/repositories/IUserTokensRepository';


class UserTokensRepository implements IUserTokensRepository {
  private repository: Repository<UserTokens>;

  constructor() {
    this.repository = getRepository(UserTokens);
  }

  async create({
    user_id,
    expires_date,
    refresh_token, 
  }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = this.repository.create({
      expires_date,
      user_id,
      refresh_token,
    });

    await this.repository.save(userToken);

    return userToken;
  }
}

export { UserTokensRepository };

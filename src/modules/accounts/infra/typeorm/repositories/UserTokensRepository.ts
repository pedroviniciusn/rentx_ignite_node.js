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

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
    ): Promise<UserTokens> {
    const usersTokens = await this.repository.findOne({
      user_id,
      refresh_token,
    });

    return usersTokens;
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export { UserTokensRepository };

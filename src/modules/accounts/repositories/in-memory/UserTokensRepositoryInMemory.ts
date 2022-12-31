import {
  UserTokens,
} from '@modules/accounts/infra/typeorm/entities/UserTokens';

import {
  IUserTokensRepository,
} from '../IUserTokensRepository';

import {
  ICreateUserTokenDTO,
} from '@modules/accounts/dtos/ICreateUserTokenDTO';

class UserTokensRepositoryInMemory implements IUserTokensRepository {
  usersTokens: UserTokens[] = [];

  async create({ user_id, expires_date, refresh_token, }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = new UserTokens();

    Object.assign(userToken, {
      user_id, 
      expires_date,
      refresh_token,
    });

    this.usersTokens.push(userToken);

    return userToken;
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
    ): Promise<UserTokens> {
    return this.usersTokens.find(
      (userToken) => userToken.user_id === user_id 
      && userToken.refresh_token === refresh_token
    );
  }

  async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
    return this.usersTokens.find(
      (userToken) => userToken.refresh_token === refresh_token
    )
  }
  
  async deleteById(id: string): Promise<void> {
    const userTokenIndex = this.usersTokens.findIndex(
      (userToken) => userToken.id === id
    );

    if (userTokenIndex > -1) {
      this.usersTokens.splice(userTokenIndex);
    }
  }
}

export { UserTokensRepositoryInMemory };

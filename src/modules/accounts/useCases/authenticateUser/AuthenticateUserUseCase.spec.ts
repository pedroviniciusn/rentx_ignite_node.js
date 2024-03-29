import { AppError } from '@shared/errors/AppError';

import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';

import {
  UserRepositoryInMemory,
} from '@modules/accounts/repositories/in-memory/UserRepositoryInMemory';

import {
  CreateUserUseCase,
} from '@modules/accounts/useCases/createUser/CreateUserUseCase';

import {
  AuthenticateUserUseCase,
} from '@modules/accounts/useCases/authenticateUser/AuthenticateUserUseCase';
import { UserTokensRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UserTokensRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';

let userRepositoryInMemory: UserRepositoryInMemory;
let userTokensRepositoryInMemory: UserTokensRepositoryInMemory;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;
let dateProvider: DayjsDateProvider;

describe('Authenticate User', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    userTokensRepositoryInMemory = new UserTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      userRepositoryInMemory,
      userTokensRepositoryInMemory,
      dateProvider,
    );
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
  });

  it('shoul be able to authenticate an user', async () => {
    const user: ICreateUserDTO = {
      name: 'User test',
      email: 'email@test.com',
      password: '123456',
      driverLicense: '001212',
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty('token');
  });

  it('shoul not be able to authenticate an nonexistent user', async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: 'teste@teste.com',
        password: '123456',
      })
    ).rejects.toEqual(new AppError('Email or password incorrect'));
  });

  it('should not be able to authenticate with incorrect password', async () => {
    const user: ICreateUserDTO = {
      name: 'User test',
      email: 'test@test.com',
      password: '123456',
      driverLicense: '001002',
    };

    await createUserUseCase.execute(user);

    await expect(
      authenticateUserUseCase.execute({
        email: user.email,
        password: '010101',
      })
    ).rejects.toEqual(new AppError('Email or password incorrect'));
  });
});

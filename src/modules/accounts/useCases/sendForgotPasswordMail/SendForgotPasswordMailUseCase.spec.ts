import { 
  UserRepositoryInMemory,
} from '@modules/accounts/repositories/in-memory/UserRepositoryInMemory';

import { 
  UserTokensRepositoryInMemory,
} from '@modules/accounts/repositories/in-memory/UserTokensRepositoryInMemory';

import { 
  MailProviderInMemory,
} from '@shared/container/providers/MailProvider/in-memory/MailProviderInMemory';

import { 
  DayjsDateProvider,
} from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';

import { 
  SendForgotPasswordMailUseCase,
} from './SendForgotPasswordMailUseCase';

import { AppError } from '@shared/errors/AppError';

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;
let userTokensRepositoryInMemory: UserTokensRepositoryInMemory;
let mailProviderInMemory: MailProviderInMemory;
let dateProvider: DayjsDateProvider;

describe('Send Forgot Mail', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    userTokensRepositoryInMemory = new UserTokensRepositoryInMemory();
    mailProviderInMemory = new MailProviderInMemory();
    dateProvider = new DayjsDateProvider();
    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      userRepositoryInMemory,
      userTokensRepositoryInMemory,
      dateProvider,
      mailProviderInMemory,
    );
  })

  it('Should be able to send a forgot password mail to user', async () => {
    const sendMail = jest.spyOn(mailProviderInMemory, 'sendMail');

    await userRepositoryInMemory.create({
      driverLicense: '202020',
      email: 'user@testemail.com',
      name: 'user test',
      password: 'sendmail'
    });

    await sendForgotPasswordMailUseCase.execute('user@testemail.com');

    expect(sendMail).toHaveBeenCalled();
  });

  it('Should not be able to send an email if user does not exists', async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute('email@error.com')
    ).rejects.toEqual(new AppError('User does not exists!'));
  });

  it('Should be able to create an users token', async () => {
    const generateTokenMail = jest.spyOn(userTokensRepositoryInMemory, 'create');

    await userRepositoryInMemory.create({
      driverLicense: '124567',
      email: 'user@token.com',
      name: 'user token',
      password: 'createtoken'
    });

    await sendForgotPasswordMailUseCase.execute('user@token.com');

    expect(generateTokenMail).toHaveBeenCalled();
  });
});

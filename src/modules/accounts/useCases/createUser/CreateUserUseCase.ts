import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';
import { AppError } from '@shared/errors/AppError';
import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUsersRepository,
  ) {}

  async execute({
    name,
    email,
    driverLicense,
    password,
  }: ICreateUserDTO) : Promise<void> {
    const userAlreadyExists = await this.userRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError('User already exists');
    }

    const passwordHash = await hash(password, 8);

    await this.userRepository.create({
      name,
      email,
      driverLicense,
      password: passwordHash,
    });
  }
}

export { CreateUserUseCase };

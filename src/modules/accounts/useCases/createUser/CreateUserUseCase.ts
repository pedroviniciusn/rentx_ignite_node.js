import { inject } from 'tsyringe';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { IUsersRepository } from '../../repositories/IUsersRepository';

class CreateUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUsersRepository,
  ) {}

  async execute({
    name,
    username,
    email,
    driverLicense,
    password,
  }: ICreateUserDTO) : Promise<void> {
    await this.userRepository.create({
      name,
      username,
      email,
      driverLicense,
      password,
    });
  }
}

export { CreateUserUseCase };

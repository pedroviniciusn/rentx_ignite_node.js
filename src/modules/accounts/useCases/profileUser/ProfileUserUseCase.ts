import { injectable, inject } from 'tsyringe';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IUserResponseDTO } from '@modules/accounts/dtos/IUserResponseDTO';
import { UserMap } from '@modules/accounts/mapper/UserMap';

@injectable()
class ProfileUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUsersRepository,
  ) {}
  async execute(id: string): Promise<IUserResponseDTO> {
    const user = await this.userRepository.findById(id);

    return UserMap.toDTO(user);
  }
}

export { ProfileUserUseCase };

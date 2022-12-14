import { inject, injectable } from 'tsyringe';

import { deleteFile } from '@utils/file';

import {
  IUsersRepository,
} from '@modules/accounts/repositories/IUsersRepository';

interface IRequest {
  userId: string;
  avatarFile: string;
}

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUsersRepository,
  ) {}

  async execute({ userId, avatarFile }: IRequest): Promise<void> {
    const user = await this.userRepository.findById(userId);
    console.log(user)
    console.log(avatarFile)

    if (user.avatar) {
      await deleteFile(`./tmp/avatar/${user.avatar}`);
    }

    user.avatar = avatarFile;

    await this.userRepository.create(user);
  }
}

export { UpdateUserAvatarUseCase };

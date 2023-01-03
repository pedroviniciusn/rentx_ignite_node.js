import { Request, Response } from 'express';

import { container } from 'tsyringe';

import { UpdateUserAvatarUseCase } from './UpdateUserAvatarUseCase';

class UpdateUserAvatarCrontroller {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;

    const avatar = req.file.filename;

    const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase);

    await updateUserAvatarUseCase.execute({ userId: id, avatarFile: avatar });

    return res.status(204).send();
  }
}

export { UpdateUserAvatarCrontroller };

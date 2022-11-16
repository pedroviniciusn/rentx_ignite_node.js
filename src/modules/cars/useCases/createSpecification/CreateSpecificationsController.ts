import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateSpecificationUseCase } from './CreateSpecificationUseCase';

class CreateSpecificationController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, description } = req.body;

    const createSpecificationsUseCase = container.resolve(CreateSpecificationUseCase);

    await createSpecificationsUseCase.execute({ name, description });

    return res.status(201).json({ message: 'Especificação criada com sucesso' });
  }
}

export { CreateSpecificationController };

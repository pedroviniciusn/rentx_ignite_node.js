import { Request, Response } from 'express';
import { CreateSpecificationUseCase } from './CreateSpecificationUseCase';

class CreateSpecificationController {
  constructor(private createSpecificationsUseCase: CreateSpecificationUseCase) {}

  handle(req: Request, res: Response): Response {
    const { name, description } = req.body;

    this.createSpecificationsUseCase.execute({ name, description });

    return res.status(201).json({ message: 'Especificação criada com sucesso' });
  }
}

export { CreateSpecificationController };

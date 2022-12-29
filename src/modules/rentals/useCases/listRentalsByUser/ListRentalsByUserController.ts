import {
  Request,
  Response,
} from 'express';

import {
  container,
} from 'tsyringe';

import {
  ListRentalsByUserUSeCase,
} from './ListRentalsByUserUseCase';

class ListRentalsByUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;

    const listRentalsByUserUSeCase = container.resolve(ListRentalsByUserUSeCase);

    const rentals = await listRentalsByUserUSeCase.execute(id);

    return res.json(rentals);
  }
}

export { ListRentalsByUserController };

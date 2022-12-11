/* eslint-disable camelcase */
import { Request, Response } from 'express';

import { container } from 'tsyringe';

import {
  ListAvailablesCarsUseCase,
} from './ListAvailablesCarsUseCase';

class ListAvailablesCarsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const {
      name,
      brand,
      category_id,
    } = req.query;

    const listAvailablesCarsUseCase = container.resolve(ListAvailablesCarsUseCase);

    const allCars = await listAvailablesCarsUseCase.execute({
      name: name as string,
      brand: brand as string,
      category_id: category_id as string,
    });

    return res.json(allCars);
  }
}

export { ListAvailablesCarsController };

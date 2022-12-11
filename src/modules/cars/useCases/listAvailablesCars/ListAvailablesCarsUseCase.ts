/* eslint-disable camelcase */
import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  name?: string,
  category_id?: string,
  brand?: string,
}

@injectable()
class ListAvailablesCarsUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
  ) {}

  async execute({ name, category_id, brand }: IRequest): Promise<Car[]> {
    const cars = this.carsRepository.findAllAvailables(
      name,
      category_id,
      brand,
    );

    return cars;
  }
}

export { ListAvailablesCarsUseCase };

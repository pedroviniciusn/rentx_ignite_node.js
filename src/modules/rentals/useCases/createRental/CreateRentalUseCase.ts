import {
  Rental,
} from '@modules/rentals/infra/typeorm/entities/Rental';

import {
  IRentalRepository,
} from '@modules/rentals/repositories/IRentalRepository';

import {
  AppError,
} from '@shared/errors/AppError';


interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}
class CreateRentalUseCase {

  constructor(
    private rentalRepository: IRentalRepository,
  ) {}

  async execute({
    user_id,
    car_id,
    expected_return_date,
  }: IRequest): Promise<Rental> {
    const carUnavailable = await this.rentalRepository.findOpenRentalByCar(
      car_id,
    );

    if (carUnavailable) {
      throw new AppError('Car is unavailable');
    }
    
    const rentalOpenToUser = await this.rentalRepository.findOpenRentalByUser(
      user_id
    );

    if (rentalOpenToUser) {
      throw new AppError('There is a rental in progress for user!');
    }

    const rental = await this.rentalRepository.create({
      user_id,
      car_id,
      expected_return_date,
    });

    return rental;
  }
}

export { CreateRentalUseCase };

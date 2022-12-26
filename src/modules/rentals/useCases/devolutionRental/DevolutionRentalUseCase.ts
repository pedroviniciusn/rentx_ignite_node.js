import { inject, injectable } from 'tsyringe';

import {
  IRentalRepository,
} from '@modules/rentals/repositories/IRentalRepository';

import {
  ICarsRepository,
} from '@modules/cars/repositories/ICarsRepository';

import {
  IDateProvider,
} from '@shared/container/providers/DateProviders/IDateProvider';

import {
  AppError,
} from '@shared/errors/AppError';

import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';

interface IRequest {
  id: string;
  user_id: string;
}

@injectable()
class DevolutionRentalUseCase {
  constructor(
    @inject('RentalRepository')
    private rentalRepository: IRentalRepository,

    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,

    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
  ) {}

  async execute({
    id,
    user_id,
  }: IRequest): Promise<Rental> {
    const rental = await this.rentalRepository.findById(id);

    const car = await this.carsRepository.findById(rental.car_id);

    const minimumDaily = 1;

    let total = 0;

    if (!rental) {
      throw new AppError('Rental does not exists!')
    }

    const dateNow = this.dateProvider.dateNow();

    let daily = this.dateProvider.compareInDays(
      rental.start_date,
      dateNow,
    );

    if (daily <= 0) {
      daily = minimumDaily;
    }

    const delay = this.dateProvider.compareInDays(
      dateNow, rental.expected_return_date
    );

    if (delay > 0) {
      const calculateFine = delay * car.fine_amount;
      total = calculateFine;
    }

    total += daily * car.daily_rate;

    rental.end_date = dateNow;

    rental.total = total;

    await this.rentalRepository.create(rental);

    await this.carsRepository.updateAvailable(car.id, true);

    return rental;
  }
}

export { DevolutionRentalUseCase };

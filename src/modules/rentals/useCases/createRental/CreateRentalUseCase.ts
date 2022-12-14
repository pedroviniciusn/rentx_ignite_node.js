import { IRentalRepository } from '@modules/rentals/repositories/IRentalRepository';
import { AppError } from '@shared/errors/AppError';


interface IRequest {
  user_id: string;
  car_id: string;
  expect_return_date: Date;
}
class CreateRentalUseCase {

  constructor(
    private rentalRepository: IRentalRepository,
  ) {}

  async execute({
    user_id,
    car_id,
    expect_return_date,
  }: IRequest): Promise<void> {
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
      throw new AppError('There is a rental in progress for user!')
    }
  }
}

export { CreateRentalUseCase };

import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalRepository } from '../IRentalRepository';


class RentalRepositoryInMemory implements IRentalRepository {
  rentals: Rental[] = []

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    return this.rentals.find(
    (rental) => rental.car_id === car_id
    && rental.expected_return_Date === null);
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    return this.rentals.find(
    (rental) => rental.user_id === user_id
    && rental.expected_return_Date === null);
  }
}

export { RentalRepositoryInMemory };
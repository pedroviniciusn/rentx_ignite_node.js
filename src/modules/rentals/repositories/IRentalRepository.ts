import { Rental } from '../infra/typeorm/entities/Rental';

import { ICreateRentalDTO } from '../dtos/ICreateRentalDTO';

interface IRentalRepository {
  create(data: ICreateRentalDTO): Promise<Rental>;
  findById(id: string): Promise<Rental>;
  findOpenRentalByCar(car_id: string): Promise<Rental>;
  findOpenRentalByUser(user_id: string): Promise<Rental>;
}

export { IRentalRepository };
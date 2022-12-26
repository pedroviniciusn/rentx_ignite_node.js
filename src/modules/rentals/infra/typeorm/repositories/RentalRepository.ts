import { getRepository, Repository } from 'typeorm';

import { Rental } from '../entities/Rental';

import {
  ICreateRentalDTO,
} from '@modules/rentals/dtos/ICreateRentalDTO';

import {
  IRentalRepository,
} from '@modules/rentals/repositories/IRentalRepository';


class RentalRepository implements IRentalRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }
  
  async create({
    user_id,
    car_id,
    expected_return_date,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      user_id,
      car_id,
      expected_return_date,
    })

    await this.repository.save(rental);

    return rental;
  }

  async findById(id: string): Promise<Rental> {
    const rental = await this.repository.findOne(id);

    return rental;
  }
  
  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    const openByCar = await this.repository.findOne({ car_id });
    
    return openByCar;
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    const openByUser = await this.repository.findOne({ user_id });
    
    return openByUser;
  }
}

export { RentalRepository };

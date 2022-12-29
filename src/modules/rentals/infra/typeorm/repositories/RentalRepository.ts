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
    id,
    user_id,
    car_id,
    expected_return_date,
    end_date,
    total,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      id,
      user_id,
      car_id,
      expected_return_date,
      end_date,
      total,
    });

    await this.repository.save(rental);

    return rental;
  }

  async findById(id: string): Promise<Rental> {
    const rental = await this.repository.findOne(id);

    return rental;
  }

  async findByUserId(user_id: string): Promise<Rental[]> {
    const rentals = await this.repository.find({
      where: {
        user_id,
      },

      relations: ['car'],
    });

    return rentals;
  }
  
  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    const openByCar = await this.repository.findOne({ 
      where: {
        car_id,
        end_date: null,
      },
     });
    
    return openByCar;
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    const openByUser = await this.repository.findOne({ 
      where: {
        user_id,
        end_date: null,
      },
     });
    
    return openByUser;
  }
}

export { RentalRepository };

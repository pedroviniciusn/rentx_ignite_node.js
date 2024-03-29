/* eslint-disable camelcase */
import {
  ICreateCarDTO,
} from '@modules/cars/dtos/ICreateCarDTO';

import { Car } from '@modules/cars/infra/typeorm/entities/Car';

import {
  ICarsRepository,
} from '../ICarsRepository';

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];

  async create({
    id,
    name,
    description,
    daily_rate,
    license_plate,
    brand,
    fine_amount,
    category_id,
    specifications,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      name,
      description,
      daily_rate,
      license_plate,
      brand,
      fine_amount,
      category_id,
      specifications,
    });

    this.cars.push(car);

    return car;
  }

  async findById(car_id: string): Promise<Car> {
    return this.cars.find((car) => car.id === car_id);
  }

  async findAllAvailables(
    name?: string,
    category_id?: string,
    brand?: string,
  ): Promise<Car[]> {
    const all = this.cars.filter((car) => {
      if (
        car.available === true
        || ((name && car.name === name)
        || (category_id && car.category_id === category_id)
        || (brand && car.brand === brand))
      ) {
        return car;
      }
      return null;
    });
    return all;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find((car) => car.license_plate === license_plate);
  }

  async updateAvailable(id: string, available: boolean): Promise<void> {
    const findIndex = this.cars.findIndex((car) => car.id === id);
    
    this.cars[findIndex].available = available;
  }
}

export { CarsRepositoryInMemory };

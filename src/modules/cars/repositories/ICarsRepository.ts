/* eslint-disable camelcase */
import { ICreateCarDTO } from '../dtos/ICreateCarDTO';
import { Car } from '../infra/typeorm/entities/Car';

interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>;
  findById(car_id: string): Promise<Car>;
  findAllAvailables(
    name?: string,
    category_id?: string,
    brand?: string,
  ): Promise<Car[]>;
  findByLicensePlate(license_plate: string): Promise<Car>;
  updateAvailable(id: string, available: boolean): Promise<void>;
}

export { ICarsRepository };

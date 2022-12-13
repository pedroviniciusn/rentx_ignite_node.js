import {
  getRepository,
  Repository,
} from 'typeorm';

import {
  CarImage,
} from '../entities/CarImage';

import {
  ICarsImagesRepository,
} from '@modules/cars/repositories/ICarsImagesRepository';

class CarsImagesRepository implements ICarsImagesRepository {
  private repository: Repository<CarImage>;

  constructor() {
    this.repository = getRepository(CarImage);
  }

  async create(car_id: string, car_image: string): Promise<CarImage> {
    const carImages = this.repository.create({
      car_id,
      image_name: car_image,
    });

    await this.repository.save(carImages);

    return carImages;
  }
}

export { CarsImagesRepository };

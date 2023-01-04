import { inject, injectable } from 'tsyringe';

import {
  ICarsImagesRepository,
} from '@modules/cars/repositories/ICarsImagesRepository';

import { deleteFile } from '@utils/file';

import { IStorageProvider } from '@shared/container/providers/StorageProvider/IStorageProvider';
import { CarImage } from '@modules/cars/infra/typeorm/entities/CarImage';

interface IRequest {
  car_id: string;
  images_name: string[];
}

@injectable()
class UploadCarImagesUseCase {
  constructor(
    @inject('CarsImagesRepository')
    private carsImageRepository: ICarsImagesRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  async execute({car_id, images_name}: IRequest): Promise<void> {
    const carImage = await this.carsImageRepository.findByCarId(car_id);
    
    if (!carImage) {
      images_name.map(async (image) => {
        await this.carsImageRepository.create(car_id, image);
        await this.storageProvider.save(image, 'carsImages');
      });
    } else if (carImage) {
      carImage.map(async (car) => {
        await this.storageProvider.delete(car.image_name, 'carsImages');
      });

      images_name.map(async (image) => {
        await this.carsImageRepository.create(car_id, image);
        await this.storageProvider.save(image, 'carsImages');
      });
    }
  }
}

export { UploadCarImagesUseCase };

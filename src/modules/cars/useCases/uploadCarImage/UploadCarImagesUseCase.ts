import { inject, injectable } from 'tsyringe';

import {
  ICarsImagesRepository,
} from '@modules/cars/repositories/ICarsImagesRepository';

import { deleteFile } from '@utils/file';

interface IRequest {
  car_id: string;
  images_name: string[];
}

@injectable()
class UploadCarImagesUseCase {
  constructor(
    @inject('CarsImagesRepository')
    private carsImageRepository: ICarsImagesRepository,
  ) {}

  async execute({car_id, images_name}: IRequest): Promise<void> {
    const carImage = await this.carsImageRepository.findByCarId(car_id);
    
    if (!carImage) {
      images_name.map(async (image) => {
        await this.carsImageRepository.create(car_id, image);
      });
    } else if (carImage) {
      carImage.map(async (car) => {
        await deleteFile(`./tmp/carsImages/${car.image_name}`);
      });
  
      images_name.map(async (image) => {
        await this.carsImageRepository.create(car_id, image);
      });
    }
  }
}

export { UploadCarImagesUseCase };

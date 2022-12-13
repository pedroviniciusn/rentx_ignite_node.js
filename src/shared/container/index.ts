import { container } from 'tsyringe';

import {
  IUsersRepository,
} from '@modules/accounts/repositories/IUsersRepository';

import {
  UserRepository,
} from '@modules/accounts/infra/typeorm/repositories/UserRepository';

import {
  ICategoriesRepository,
} from '@modules/cars/repositories/ICategoriesRepository';

import {
  CategoriesRepository,
} from '@modules/cars/infra/typeorm/repositories/CategoriesRepository';

import {
  SpecificationsRepository,
} from '@modules/cars/infra/typeorm/repositories/SpecificationsRepository';

import {
  ISpecificationsRepository,
} from '@modules/cars/repositories/ISpecificationsRepository';

import {
  ICarsRepository,
} from '@modules/cars/repositories/ICarsRepository';

import {
  CarsRepository,
} from '@modules/cars/infra/typeorm/repositories/CarsRepository';
import { ICarsImagesRepository } from '@modules/cars/repositories/ICarsImagesRepository';
import { CarsImagesRepository } from '@modules/cars/infra/typeorm/repositories/CarsImageRepository';

container.registerSingleton<ICategoriesRepository>(
  'CategoryRepository',
  CategoriesRepository,
);

container.registerSingleton<ISpecificationsRepository>(
  'SpecificationsRepository',
  SpecificationsRepository,
);

container.registerSingleton<IUsersRepository>(
  'UserRepository',
  UserRepository,
);

container.registerSingleton<ICarsRepository>(
  'CarsRepository',
  CarsRepository,
);

container.registerSingleton<ICarsImagesRepository>(
  'CarsImagesRepository',
  CarsImagesRepository,
);

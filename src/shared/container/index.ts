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

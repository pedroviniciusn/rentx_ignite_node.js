import { container } from 'tsyringe';

import {
  IDateProvider,
} from './DateProviders/IDateProvider';

import {
  DayjsDateProvider,
} from './DateProviders/implementations/DayjsDateProvider';

container.registerSingleton<IDateProvider>(
  'DayjsDateProvider',
  DayjsDateProvider,
);
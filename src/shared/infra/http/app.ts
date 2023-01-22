import 'reflect-metadata';

import 'dotenv/config';

import cors from 'cors';

import express, {
  NextFunction,
  Request,
  Response,
} from 'express';

import 'express-async-errors';

import swaggerUi from 'swagger-ui-express';

import { router } from './routes';

import createConnection from '@shared/infra/typeorm/index';

import rateLimiter from './middlewares/rateLimiter';

import swaggerFile from '../../../swagger.json';

import * as Sentry from "@sentry/node";

import * as Tracing from "@sentry/tracing";

import '@shared/container';

import { AppError } from '@shared/errors/AppError';

import upload from '@config/upload';

createConnection();

const app = express();

app.use(rateLimiter);

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [  
    new Sentry.Integrations.Http({ tracing: true }),
    new Tracing.Integrations.Express({ app }),
  ],

  tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());

app.use(Sentry.Handlers.tracingHandler());

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use('/avatar', express.static(`${upload.tmpFolder}/avatar`));
app.use('/carsImages', express.static(`${upload.tmpFolder}/carsImages`));

app.use(cors());
app.use(router);

app.use(Sentry.Handlers.errorHandler());

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  return res.status(500).json({
    status: 'error',
    message: `Internal server error ${err.message}`,
  });
});

export { app };

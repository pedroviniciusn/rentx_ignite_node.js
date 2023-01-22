import { NextFunction, Request, Response } from 'express';
import * as redis from "redis";
import { RateLimiterRedis } from 'rate-limiter-flexible';
import { AppError } from '@shared/errors/AppError';

const redisClient = redis.createClient({
  legacyMode: true,
  socket: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    sessionTimeout: 20,
  } 
});

const limiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'rateLimiter',
  points: 10, // 10 requests
  duration: 5, // per 1 second by IP
});

export default async function rateLimiter(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    await redisClient.connect();

    await limiter.consume(req.ip);
    
    return next();
  } catch (error) {
    throw new AppError("Too many reqeusts", 429);
  } finally {
    await redisClient.disconnect();
  }
};
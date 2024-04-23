import dotenv from 'dotenv';
import type { RouteHandlerContext } from './router';
import { StatusCode, createError } from '.';

export const env: Nixle.Env = {};

export const getEnv = (): RouteHandlerContext['env'] => ({
  ...env,
  get: (key) => env[key],
  getOrThrow(key) {
    const value = env[key];

    if (value === undefined) {
      throw createError(`Env variable "${key}" is required`, StatusCode.INTERNAL_SERVER_ERROR);
    }

    return value;
  },
});

export const buildEnv = (config?: dotenv.DotenvConfigOptions) => {
  dotenv.config(config);

  Object.keys(process.env).forEach((key) => {
    env[key] = process.env[key];
  });
};

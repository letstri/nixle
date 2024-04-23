import dotenv from 'dotenv';
import type { RouteHandlerContext } from './router';

export const env: Nixle.Env = {};

export const getEnv = (): RouteHandlerContext['env'] => ({
  get: (key) => env[key],
  getOrThrow(key) {
    const value = env[key];

    if (value === undefined) {
      throw new Error(`Env variable "${key}" is required`);
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

import dotenv from 'dotenv';

export const env: Record<string, string | undefined> = {};

export const buildEnv = (config?: dotenv.DotenvConfigOptions) => {
  dotenv.config(config);

  Object.keys(process.env).forEach((key) => {
    env[key] = process.env[key];
  });
};

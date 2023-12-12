import dotenv from 'dotenv';

export const env: Nixle.Env = {} as Nixle.Env;

export const buildEnv = (config?: dotenv.DotenvConfigOptions) => {
  dotenv.config(config);

  Object.keys(process.env).forEach((key) => {
    env[key] = process.env[key];
  });
};

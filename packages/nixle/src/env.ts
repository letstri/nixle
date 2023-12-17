import dotenv from 'dotenv';

export const buildEnv = (config?: dotenv.DotenvConfigOptions) => {
  dotenv.config(config);

  if (!__NIXLE.env) {
    __NIXLE.env = {};
  }

  Object.keys(process.env).forEach((key) => {
    __NIXLE.env![key] = process.env[key];
  });
};

import { contextLog, type log } from '../logger';

const serviceOptions: Nixle.ServiceOptions = {};

export const extendServiceOptions = (options: Record<string, unknown>) => {
  Object.assign(serviceOptions, options);
};

export const createService = <Methods extends any = any>(
  name: string,
  service: (
    options: {
      log: typeof log;
      env: Nixle.Env;
    } & Nixle.ServiceOptions,
  ) => Methods,
) => service({ log: contextLog(name), env: __NIXLE.env || {}, ...serviceOptions });

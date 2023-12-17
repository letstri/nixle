import { contextLog, type log } from '../logger';

export const extendServiceOptions = (options: Record<string, unknown>) => {
  __NIXLE.serviceOptions = {
    ...__NIXLE.serviceOptions,
    ...options,
  };
};

export const createService = <Methods extends any = any>(
  name: string,
  service: (
    options: {
      log: typeof log;
      env: Nixle.Env;
    } & Nixle.ServiceOptions,
  ) => Methods,
) => service({ log: contextLog(name), env: __NIXLE.env || {}, ...__NIXLE.serviceOptions });

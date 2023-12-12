import { contextLog, type log } from '../logger';
import { env } from '~/env';

type ServiceMethods = Record<string, (name: string, ...args: any) => any>;

const serviceOptions: Nixle.ServiceOptions = {};

export const extendServiceOptions = (options: Record<string, unknown>) => {
  Object.assign(serviceOptions, options);
};

export const createService = <Methods extends ServiceMethods>(
  name: string,
  service: (
    options: {
      log: typeof log;
      env: Nixle.Env;
    } & Nixle.ServiceOptions,
  ) => Methods,
) => service({ log: contextLog(name), env, ...serviceOptions });

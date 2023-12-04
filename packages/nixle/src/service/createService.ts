import { contextLog, type log } from '../logger';

interface ServiceOptions {
  log: typeof log;
}

type ServiceMethods = Record<string, (name: string, ...args: any) => any>;

const serviceOptions: Nixle.ServiceOptions = {};

export const extendServiceOptions = (options: Record<string, unknown>) => {
  Object.assign(serviceOptions, options);
};

export const createService = <Methods extends ServiceMethods>(
  name: string,
  service: (options: ServiceOptions & Nixle.ServiceOptions) => Methods,
) => service({ log: contextLog(name), ...serviceOptions });

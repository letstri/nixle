import { contextLog, type log } from '../logger';

export const extendServiceOptions = (options: Record<string, unknown>) => {
  __NIXLE.serviceOptions = {
    ...__NIXLE.serviceOptions,
    ...options,
  };
};

interface ServiceOptions {
  log: typeof log;
  env: Nixle.Env;
}

export interface Service<M extends unknown = unknown> {
  (name: string): M;
}

export const createService =
  <M extends unknown = unknown>(
    service: (options: ServiceOptions & Nixle.ServiceOptions) => M,
  ): Service<M> =>
  (name: string): M =>
    service({ log: contextLog(name, 'bgCyan'), env: __NIXLE.env || {}, ...__NIXLE.serviceOptions });

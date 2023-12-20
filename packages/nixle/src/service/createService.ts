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
  (context: string): M;
}

export const createService =
  <M extends unknown = unknown>(
    service: (options: ServiceOptions & Nixle.ServiceOptions) => M,
  ): Service<M> =>
  (context: string): M =>
    service({
      log: contextLog(context, 'bgCyan'),
      env: __NIXLE.env || {},
      ...__NIXLE.serviceOptions,
    });

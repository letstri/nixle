import { contextLog, type log } from '../logger';
import { env } from '~/env';

let serviceContext: Nixle.ServiceContext = {};

export const extendServiceContext = <T extends unknown>(options: T) => {
  Object.assign(serviceContext, options);
};

interface ServiceContext extends Nixle.ServiceContext {
  log: typeof log;
  env: Nixle.Env;
}

interface ServiceMethodsHandler<M extends unknown> {
  (context: ServiceContext): M;
}

export interface Service<
  M extends Record<string, (...args: any) => any> = Record<string, (...args: any) => any>,
> {
  (): M;
}

export function createService<
  M extends Record<string, (...args: any) => any> = Record<string, (...args: any) => any>,
>(name: string, methods: ServiceMethodsHandler<M>): Service<M> {
  function service() {
    return methods({
      log: contextLog(name, 'bgCyan'),
      env,
      ...serviceContext,
    });
  }

  return service;
}

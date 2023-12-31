import { contextLog, type log } from '../logger';
import { env } from '~/env';

let serviceContext: Nixle.ServiceContext = {};

export const extendServiceContext = (options: Record<string, unknown>) => {
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
  $inferMethods: M;
  $inferReturns: { [K in keyof M]: Awaited<ReturnType<M[K]>> };
  (): M;
}

export function createService<
  N extends string,
  M extends Record<string, (...args: any) => any> = Record<string, (...args: any) => any>,
>(name: N, methods: ServiceMethodsHandler<M>): Service<M> {
  function service() {
    return methods({
      log: contextLog(name, 'bgCyan'),
      env,
      ...serviceContext,
    });
  }

  service.$inferMethods = {} as any;
  service.$inferReturns = {} as any;

  return service;
}

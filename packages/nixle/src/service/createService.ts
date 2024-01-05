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
  N extends string,
  M extends Record<string, () => any> = Record<string, () => any>,
> {
  $inferMethods: M;
  $inferReturns: { [K in keyof M]: ReturnType<M[K]> };
  name: N;
  (): M;
}

export function createService<
  N extends string,
  M extends Record<string, () => any> = Record<string, () => any>,
>(name: N, methods: ServiceMethodsHandler<M>): Service<N, M> {
  const service = () => {
    return methods({
      log: contextLog(name, 'bgCyan'),
      env,
      ...serviceContext,
    });
  };

  service.$inferMethods = {} as any;
  service.$inferReturns = {} as any;
  service.name = name;

  return service;
}

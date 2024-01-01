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

export interface Service<M extends unknown = unknown> {
  (): M;
}

export function createService<M extends unknown = unknown>(
  name: string,
  methods: ServiceMethodsHandler<M>,
): Service<M> {
  return () =>
    methods({
      log: contextLog(name, 'bgCyan'),
      env,
      ...serviceContext,
    });
}

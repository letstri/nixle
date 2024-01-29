import { StatusCode, createError } from '.';
import { contextLog, type log } from './logger';
import { env } from '~/env';

let serviceContext: Nixle.ServiceContext = {};

export const extendServiceContext = <T extends unknown>(options: T) => {
  Object.assign(serviceContext, options);
};

interface ServiceContext extends Nixle.ServiceContext {
  log: typeof log;
  env: Nixle.Env;
}

interface ServiceFunction<M extends unknown> {
  (context: ServiceContext): M;
}

export interface Service<
  M extends Record<string, (...args: any) => any> = Record<string, (...args: any) => any>,
> {
  (): M;
}

export function createService<
  N extends string,
  M extends Record<string, (...args: any) => any> = Record<string, (...args: any) => any>,
>(name: Lowercase<N>, methods: ServiceFunction<M>): Service<M> {
  return () => {
    try {
      return methods({
        log: contextLog(name.toLowerCase(), 'bgCyan'),
        env,
        ...serviceContext,
      });
    } catch (e) {
      throw createError({
        message: `Oops, service "${name.toLowerCase()}" was failed`,
        statusCode: StatusCode.INTERNAL_SERVER_ERROR,
        details: e,
      });
    }
  };
}
